<?php
/**
 * Get Current Session User Endpoint
 * GET: /api/auth/session.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/Auth.php';

Auth::startSession();

$user = Auth::getSessionUser();

if ($user) {
    Auth::sendResponse(true, 'User session found', $user);
} else {
    Auth::sendResponse(false, 'No active session');
}
?>