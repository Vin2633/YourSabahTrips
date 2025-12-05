<?php
/**
 * Tourist Registration Endpoint
 * POST: /api/auth/register-tourist.php
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
$firstName = $input['firstName'] ?? '';
$lastName = $input['lastName'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$phoneNo = $input['phoneNo'] ?? '';

// Validation
if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
    Auth::sendResponse(false, 'First name, last name, email, and password are required.');
}

if (!Auth::isValidEmail($email)) {
    Auth::sendResponse(false, 'Invalid email format.');
}

if (!Auth::isValidPassword($password)) {
    Auth::sendResponse(false, 'Password must be at least 6 characters long.');
}

if (!empty($phoneNo) && !Auth::isValidPhoneNo($phoneNo)) {
    Auth::sendResponse(false, 'Invalid phone number format.');
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Check if email already exists
    $checkEmail = $db->queryOne(
        "SELECT Email FROM TOURIST WHERE Email = ?",
        [$email]
    );

    if ($checkEmail) {
        Auth::sendResponse(false, 'Email already registered. Please use a different email or login.');
    }

    // Hash password
    $passwordHash = Auth::hashPassword($password);

    // Insert new tourist
    $db->execute(
        "INSERT INTO TOURIST (FirstName, LastName, Email, PasswordHash, PhoneNo) VALUES (?, ?, ?, ?, ?)",
        [$firstName, $lastName, $email, $passwordHash, $phoneNo]
    );

    $touristId = $db->lastInsertId();

    // Create user session
    $userData = [
        'touristId' => $touristId,
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'phoneNo' => $phoneNo,
        'role' => 'tourist'
    ];

    Auth::setSessionUser($userData);

    Auth::sendResponse(true, 'Registration successful!', $userData);

} catch (Exception $e) {
    Auth::sendResponse(false, 'Registration failed: ' . $e->getMessage());
}
?>