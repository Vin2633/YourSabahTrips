<?php
/**
 * Admin Registration Endpoint
 * POST: /api/auth/register-admin.php
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
$username = $input['username'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$roleLevel = $input['roleLevel'] ?? 'standard';

// Validation
if (empty($username) || empty($email) || empty($password)) {
    Auth::sendResponse(false, 'Username, email, and password are required.');
}

if (!Auth::isValidEmail($email)) {
    Auth::sendResponse(false, 'Invalid email format.');
}

if (!Auth::isValidPassword($password)) {
    Auth::sendResponse(false, 'Password must be at least 6 characters long.');
}

// Validate role level
$validRoles = ['standard', 'manager', 'superadmin'];
if (!in_array(strtolower($roleLevel), $validRoles)) {
    $roleLevel = 'standard';
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Check if username already exists
    $checkUsername = $db->queryOne(
        "SELECT Username FROM ADMIN WHERE Username = ?",
        [$username]
    );

    if ($checkUsername) {
        Auth::sendResponse(false, 'Username already taken. Please choose a different username.');
    }

    // Check if email already exists
    $checkEmail = $db->queryOne(
        "SELECT Email FROM ADMIN WHERE Email = ?",
        [$email]
    );

    if ($checkEmail) {
        Auth::sendResponse(false, 'Email already registered as admin.');
    }

    // Hash password
    $passwordHash = Auth::hashPassword($password);

    // Insert new admin
    $db->execute(
        "INSERT INTO ADMIN (Username, Email, PasswordHash, RoleLevel) VALUES (?, ?, ?, ?)",
        [$username, $email, $passwordHash, $roleLevel]
    );

    $adminId = $db->lastInsertId();

    // Create user session
    $userData = [
        'adminId' => $adminId,
        'username' => $username,
        'email' => $email,
        'roleLevel' => $roleLevel,
        'role' => 'admin'
    ];

    Auth::setSessionUser($userData);

    Auth::sendResponse(true, 'Admin registration successful!', $userData);

} catch (Exception $e) {
    Auth::sendResponse(false, 'Registration failed: ' . $e->getMessage());
}
?>