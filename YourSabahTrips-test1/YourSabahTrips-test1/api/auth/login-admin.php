<?php
/**
 * Admin Login Endpoint
 * POST: /api/auth/login-admin.php
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

if (empty($username) || empty($password)) {
    Auth::sendResponse(false, 'Username and password are required.');
}

try {
    $db = new Database();
    $conn = $db->connect();

    // Find admin by username
    $admin = $db->queryOne(
        "SELECT AdminId, Username, Email, PasswordHash, RoleLevel FROM ADMIN WHERE Username = ?",
        [$username]
    );

    if (!$admin) {
        Auth::sendResponse(false, 'Invalid username or password.');
    }

    // Verify password
    if (!Auth::verifyPassword($password, $admin['PasswordHash'])) {
        Auth::sendResponse(false, 'Invalid username or password.');
    }

    // Create user session
    $userData = [
        'adminId' => (int) $admin['AdminId'],
        'username' => $admin['Username'],
        'email' => $admin['Email'],
        'roleLevel' => $admin['RoleLevel'],
        'role' => 'admin'
    ];

    Auth::setSessionUser($userData);

    Auth::sendResponse(true, 'Login successful!', $userData);

} catch (Exception $e) {
    Auth::sendResponse(false, 'Login failed: ' . $e->getMessage());
}
?>