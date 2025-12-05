<?php
/**
 * Get Available Schedules Endpoint
 * GET: /api/bookings/get-schedules.php?packageId=1
 * 
 * Returns all available schedules for a specific package
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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request method. GET required.']);
    exit;
}

// Get packageId from query parameter
$packageId = $_GET['packageId'] ?? null;

if (!$packageId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing packageId parameter']);
    exit;
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Get all available schedules for this package
    $schedules = $db->query(
        'SELECT ScheduleId, ScheduleTime, AvailableSlots FROM SCHEDULES WHERE PackageId = ? ORDER BY ScheduleTime ASC',
        [$packageId]
    );

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Schedules retrieved successfully',
        'data' => $schedules
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to retrieve schedules: ' . $e->getMessage()
    ]);
}
?>
