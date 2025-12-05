<?php
/**
 * Logout Endpoint
 * POST: /api/auth/logout.php
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

require_once '../config/Auth.php';

Auth::destroySession();
Auth::sendResponse(true, 'Logged out successfully!');
?>