<?php
/**
 * Diagnostic Endpoint - Check system setup
 * GET/POST: /api/auth/diagnose.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$diagnostics = [
    'php_version' => phpversion(),
    'pdo_loaded' => extension_loaded('pdo'),
    'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
    'server_time' => date('Y-m-d H:i:s'),
    'server_os' => php_uname(),
];

// Try to test database connection
try {
    require_once '../config/Database.php';
    $db = new Database();
    $conn = $db->connect();
    $diagnostics['database_connection'] = 'SUCCESS';

    // Try to query TOURIST table
    $result = $db->query("SELECT COUNT(*) as count FROM TOURIST LIMIT 1");
    $diagnostics['tourist_table_exists'] = 'YES';
    $diagnostics['tourist_count'] = $result[0]['count'] ?? 0;
} catch (Exception $e) {
    $diagnostics['database_connection'] = 'FAILED';
    $diagnostics['error'] = $e->getMessage();
}

echo json_encode($diagnostics, JSON_PRETTY_PRINT);
?>