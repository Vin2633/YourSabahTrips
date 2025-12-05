/**
 * Packages Service
 * Handles all API calls to fetch package data
 */

import { fetchAPI } from './authService';

export interface Schedule {
  ScheduleId: number;
  PackageId: number;
  TravelDate: string;
  StartTime: string;
  EndTime: string;
  BookedSlots: number;
  AvailableSlots: number;
}

export interface Package {
  PackageId: number;
  PackageName: string;
  Description: string;
  Price: number;
  Location: string;
  Max_Pax: number;
  ActivityType: string;
  ImageURL: string | null;
  Schedules: Schedule[];
}

export interface PackagesResponse {
  success: boolean;
  message: string;
  data: Package[];
}

/**
 * Fetch all packages with their schedules from the database
 */
export async function getAllPackages(): Promise<Package[]> {
  try {
    console.log('getAllPackages called');
    const response = await fetchAPI('/packages/get-all.php', {
      method: 'GET',
    });
    
    console.log('API Response:', response);
    
    if (response && typeof response === 'object' && 'success' in response) {
      const typedResponse = response as PackagesResponse;
      if (typedResponse.success && Array.isArray(typedResponse.data)) {
        // Normalize numeric fields from database strings to numbers
        const normalizedData = typedResponse.data.map((pkg: any) => ({
          ...pkg,
          Price: typeof pkg.Price === 'string' ? parseFloat(pkg.Price) : pkg.Price,
          Max_Pax: typeof pkg.Max_Pax === 'string' ? parseInt(pkg.Max_Pax, 10) : pkg.Max_Pax,
          Schedules: Array.isArray(pkg.Schedules) ? pkg.Schedules.map((schedule: any) => ({
            ...schedule,
            ScheduleId: typeof schedule.ScheduleId === 'string' ? parseInt(schedule.ScheduleId, 10) : schedule.ScheduleId,
            PackageId: typeof schedule.PackageId === 'string' ? parseInt(schedule.PackageId, 10) : schedule.PackageId,
            BookedSlots: typeof schedule.BookedSlots === 'string' ? parseInt(schedule.BookedSlots, 10) : schedule.BookedSlots,
            AvailableSlots: typeof schedule.AvailableSlots === 'string' ? parseInt(schedule.AvailableSlots, 10) : schedule.AvailableSlots,
          })) : [],
        })) as Package[];
        console.log('Packages fetched successfully:', normalizedData);
        return normalizedData;
      }
      console.warn('Failed to fetch packages:', typedResponse.message);
    } else {
      console.warn('Unexpected response format:', response);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

/**
 * Get a single package by ID
 */
export async function getPackageById(packageId: number): Promise<Package | null> {
  try {
    const packages = await getAllPackages();
    return packages.find(pkg => pkg.PackageId === packageId) || null;
  } catch (error) {
    console.error('Error fetching package:', error);
    return null;
  }
}
