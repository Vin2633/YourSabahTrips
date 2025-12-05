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
$password = $input['password'] ?? '';
$roleLevel = $input['roleLevel'] ?? 'Standard';
$requestingAdminRoleLevel = $input['currentAdminRoleLevel'] ?? null;

// Verify the requesting admin is a SuperAdmin
if (!$requestingAdminRoleLevel) {
    Auth::sendResponse(false, 'Authorization info missing. Please be logged in.');
}

// Must be exactly 'SuperAdmin' with capital S and A
if ($requestingAdminRoleLevel !== 'SuperAdmin') {
    Auth::sendResponse(false, 'Only SuperAdmins can register new admins. Access denied.');
}

// Validation
if (empty($username) || empty($password)) {
    Auth::sendResponse(false, 'Username and password are required.');
}

if (!Auth::isValidPassword($password)) {
    Auth::sendResponse(false, 'Password must be at least 8 characters long.');
}

// Validate role level - must be properly capitalized
$validRoles = ['Standard', 'SuperAdmin'];
if (!in_array($roleLevel, $validRoles)) {
    Auth::sendResponse(false, 'Invalid role level. Must be Standard or SuperAdmin.');
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

    // Hash password
    $passwordHash = Auth::hashPassword($password);

    // Insert new admin
    $db->execute(
        "INSERT INTO ADMIN (Username, PasswordHash, RoleLevel) VALUES (?, ?, ?)",
        [$username, $passwordHash, $roleLevel]
    );

    $adminId = $db->lastInsertId();

    // Create user session
    $userData = [
        'adminId' => $adminId,
        'username' => $username,
        'roleLevel' => $roleLevel,
        'role' => 'admin'
    ];

    Auth::setSessionUser($userData);

    Auth::sendResponse(true, 'Admin registration successful!', $userData);

} catch (Exception $e) {
    Auth::sendResponse(false, 'Registration failed: ' . $e->getMessage());
}
