<?php
/**
 * Authentication Utilities
 * Handles password hashing, validation, and common auth operations
 */

class Auth
{
    /**
     * Hash a password using PHP's password_hash (bcrypt)
     */
    public static function hashPassword($password)
    {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    }

    /**
     * Verify a password against a hash
     */
    public static function verifyPassword($password, $hash)
    {
        return password_verify($password, $hash);
    }

    /**
     * Validate email format
     */
    public static function isValidEmail($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Validate password strength
     * Minimum 6 characters
     */
    public static function isValidPassword($password)
    {
        return strlen($password) >= 8;
    }

    /**
     * Validate phone number format (basic)
     */
    public static function isValidPhoneNo($phoneNo)
    {
        return preg_match('/^[\d\s\-\+\(\)]{10,20}$/', $phoneNo);
    }

    /**
     * Start a session
     */
    public static function startSession()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    /**
     * Destroy a session
     */
    public static function destroySession()
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_destroy();
        }
    }

    /**
     * Get current session user
     */
    public static function getSessionUser()
    {
        self::startSession();
        return isset($_SESSION['user']) ? $_SESSION['user'] : null;
    }

    /**
     * Set session user
     */
    public static function setSessionUser($user)
    {
        self::startSession();
        $_SESSION['user'] = $user;
    }

    /**
     * Check if user is logged in
     */
    public static function isLoggedIn()
    {
        self::startSession();
        return isset($_SESSION['user']);
    }

    /**
     * Send JSON response
     */
    public static function sendResponse($success, $message, $data = null)
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type');

        $response = [
            'success' => $success,
            'message' => $message
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        echo json_encode($response);
        exit;
    }
}
?>