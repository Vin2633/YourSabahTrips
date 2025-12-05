<?php
/**
 * Create Booking Endpoint
 * POST: /api/bookings/create-booking.php
 * 
 * Records: packageId, scheduleId, travelDate, numPax, touristId
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/Database.php';
require_once '../config/Auth.php';

Auth::startSession();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request method. POST required.']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$packageId = $input['packageId'] ?? null;
$scheduleId = $input['scheduleId'] ?? null;
$travelDate = $input['travelDate'] ?? null;
$numPax = $input['numPax'] ?? null;
$touristId = isset($_SESSION['user']['touristId']) ? $_SESSION['user']['touristId'] : null;

if (!$packageId || $scheduleId === null || !$travelDate || !$numPax || !$touristId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields: packageId, scheduleId, travelDate, numPax']);
    exit;
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Begin transaction to safely check and decrement available slots
    $conn->beginTransaction();

    // Lock the schedule row for update
    $stmt = $conn->prepare('SELECT AvailableSlots, PackageId FROM SCHEDULES WHERE ScheduleId = ? FOR UPDATE');
    $stmt->execute([$scheduleId]);
    $scheduleRow = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$scheduleRow) {
        $conn->rollBack();
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Selected schedule not found']);
        exit;
    }

    // Optional: verify the schedule belongs to the packageId provided
    if ((int)$scheduleRow['PackageId'] !== (int)$packageId) {
        $conn->rollBack();
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Schedule does not belong to the selected package']);
        exit;
    }

    $available = (int)$scheduleRow['AvailableSlots'];
    $requested = (int)$numPax;

    if ($requested <= 0) {
        $conn->rollBack();
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid number of passengers']);
        exit;
    }

    if ($available < $requested) {
        $conn->rollBack();
        http_response_code(409); // Conflict - not enough slots
        echo json_encode(['success' => false, 'message' => 'Not enough available slots for the selected schedule', 'availableSlots' => $available]);
        exit;
    }

    // Decrement available slots
    $update = $conn->prepare('UPDATE SCHEDULES SET AvailableSlots = AvailableSlots - ? WHERE ScheduleId = ?');
    $update->execute([$requested, $scheduleId]);

    // Insert booking record
    $insert = $conn->prepare('INSERT INTO BOOKINGS (TouristId, PackageId, ScheduleId, TravelDate, NumPax, BookingDate, BookingStatus) VALUES (?, ?, ?, ?, ?, NOW(), ?)');
    $insert->execute([$touristId, $packageId, $scheduleId, $travelDate, $numPax, 'Confirmed']);

    $bookingId = $conn->lastInsertId();

    $conn->commit();

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Booking created successfully',
        'data' => [
            'bookingId' => $bookingId,
            'packageId' => $packageId,
            'scheduleId' => $scheduleId,
            'travelDate' => $travelDate,
            'numPax' => $numPax,
            'touristId' => $touristId,
            'remainingSlots' => $available - $requested
        ]
    ]);

} catch (Exception $e) {
    if ($conn && $conn->inTransaction()) {
        $conn->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Booking failed: ' . $e->getMessage()
    ]);
}
?>
