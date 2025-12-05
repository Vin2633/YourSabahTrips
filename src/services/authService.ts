/**
 * Authentication Service
 * Handles all API calls to the PHP backend for authentication
 */

// XAMPP: http://localhost/YourSabahTrips/api
// Direct PHP server: http://localhost:8000/api
const API_BASE_URL = 'http://localhost/YourSabahTrips/api';

// Helper function to make fetch requests with proper CORS handling
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Don't use credentials since we're cross-origin with XAMPP
    // credentials: 'include', 
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error, 'URL:', url);
    throw error;
  }
}

export interface TouristUser {
  touristId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  role: 'tourist';
}

export interface AdminUser {
  adminId: number;
  username: string;
  roleLevel: string;
  role: 'admin';
}

export type User = TouristUser | AdminUser;

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User;
}

/**
 * Register a new tourist
 */
export async function registerTourist(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNo: string
): Promise<AuthResponse> {
  try {
    const data = await fetchAPI('/auth/register-tourist.php', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phoneNo,
      }),
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error: ' + (error instanceof Error ? error.message : 'Unknown error'),
    };
  }
}

/**
 * Register a new admin
 */
export async function registerAdmin(
  username: string,
  password: string,
  roleLevel: string = 'standard',
  currentAdminRoleLevel?: string
): Promise<AuthResponse> {
  try {
    const data = await fetchAPI('/auth/register-admin.php', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        roleLevel,
        currentAdminRoleLevel,
      }),
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error: ' + (error instanceof Error ? error.message : 'Unknown error'),
    };
  }
}

/**
 * Login as tourist
 */
export async function loginTourist(email: string, password: string): Promise<AuthResponse> {
  try {
    const data = await fetchAPI('/auth/login-tourist.php', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error: ' + (error instanceof Error ? error.message : 'Unknown error'),
    };
  }
}

/**
 * Login as admin
 */
export async function loginAdmin(username: string, password: string): Promise<AuthResponse> {
  try {
    const data = await fetchAPI('/auth/login-admin.php', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error: ' + (error instanceof Error ? error.message : 'Unknown error'),
    };
  }
}

/**
 * Get current user session
 */
export async function getSession(): Promise<AuthResponse> {
  try {
    const data = await fetchAPI('/auth/session.php', {
      method: 'GET',
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error: ' + (error instanceof Error ? error.message : 'Unknown error'),
    };
  }
}

/**
 * Run diagnostics to check system setup
 */
export async function runDiagnostics(): Promise<any> {
  try {
    const data = await fetchAPI('/auth/diagnose.php', {
      method: 'GET',
    });
    return data;
  } catch (error) {
    return {
      error: 'Network error or PHP server not running',
      details: error instanceof Error ? error.message : 'Unknown error',
      api_url: API_BASE_URL,
    };
  }
}
/**
 * Logout the current user
 */
export async function logout(): Promise<AuthResponse> {
  try {
    const data = await fetchAPI('/auth/logout.php', {
      method: 'POST',
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error: ' + (error instanceof Error ? error.message : 'Unknown error'),
    };
  }
}
