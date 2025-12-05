<?php
/**
 * Get All Packages with Available Schedules
 * GET: /api/packages/get-all.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/Database.php';
require_once '../config/Auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    Auth::sendResponse(false, 'Invalid request method. GET required.');
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Get all packages
    $packages = $db->query("
        SELECT 
            PackageId,
            PackageName,
            Description,
            Price,
            Location,
            Max_Pax,
            ActivityType,
            ImageURL
        FROM PACKAGE
        ORDER BY PackageId
    ");

    if (empty($packages)) {
        Auth::sendResponse(true, 'No packages found', []);
    }

    // For each package, get all available schedules
    $packagesWithSchedules = [];

    foreach ($packages as $package) {
        $schedules = $db->query("
            SELECT 
                ScheduleId,
                PackageId,
                TravelDate,
                StartTime,
                EndTime
            FROM SCHEDULE
            WHERE PackageId = ?
            ORDER BY TravelDate ASC
        ", [$package['PackageId']]);

        // For each schedule, get booking count
        $schedulesWithBookings = [];
        foreach ($schedules as $schedule) {
            $bookingCount = $db->queryOne("
                SELECT COUNT(*) as BookedSlots
                FROM BOOKING
                WHERE ScheduleId = ?
            ", [$schedule['ScheduleId']]);

            $booked = (int) ($bookingCount['BookedSlots'] ?? 0);
            $available = (int) $package['Max_Pax'] - $booked;

            $schedule['BookedSlots'] = $booked;
            $schedule['AvailableSlots'] = max(0, $available);
            $schedulesWithBookings[] = $schedule;
        }

        $package['Schedules'] = $schedulesWithBookings;
        $packagesWithSchedules[] = $package;
    }

    Auth::sendResponse(true, 'Packages retrieved successfully', $packagesWithSchedules);

} catch (Exception $e) {
    Auth::sendResponse(false, 'Failed to fetch packages: ' . $e->getMessage());
}
?>