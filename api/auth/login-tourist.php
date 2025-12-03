<?php
/**
 * Tourist Login Endpoint
 * POST: /api/auth/login-tourist.php
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
    Auth::sendResponse(false, 'Invalid request method. POST required.');
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    Auth::sendResponse(false, 'Email and password are required.');
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Find tourist by email
    $tourist = $db->queryOne(
        "SELECT TouristId, FirstName, LastName, Email, PasswordHash, PhoneNo FROM TOURIST WHERE Email = ?",
        [$email]
    );

    if (!$tourist) {
        Auth::sendResponse(false, 'Invalid email or password.');
    }

    // Verify password
    if (!Auth::verifyPassword($password, $tourist['PasswordHash'])) {
        Auth::sendResponse(false, 'Invalid email or password.');
    }

    // Create user session
    $userData = [
        'touristId' => (int) $tourist['TouristId'],
        'firstName' => $tourist['FirstName'],
        'lastName' => $tourist['LastName'],
        'email' => $tourist['Email'],
        'phoneNo' => $tourist['PhoneNo'],
        'role' => 'tourist'
    ];

    Auth::setSessionUser($userData);

    Auth::sendResponse(true, 'Login successful!', $userData);

} catch (Exception $e) {
    Auth::sendResponse(false, 'Login failed: ' . $e->getMessage());
}
?>