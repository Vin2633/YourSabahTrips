<?php
/**
 * Database Connection Wrapper Class
 * Handles all database operations with PDO
 */

class Database
{
    private $host = "localhost";
    private $db_name = "your_sabah_trips";
    private $username = "root";
    private $password = "";
    private $conn;

    /**
     * Connect to the database
     */
    public function connect()
    {
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name}",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
        } catch (PDOException $e) {
            die(json_encode(['success' => false, 'message' => 'Database connection error: ' . $e->getMessage()]));
        }
    }

    /**
     * Get the connection
     */
    public function getConnection()
    {
        if (!$this->conn) {
            $this->connect();
        }
        return $this->conn;
    }

    /**
     * Execute a SELECT query
     */
    public function query($sql, $params = [])
    {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Query error: " . $e->getMessage());
        }
    }

    /**
     * Execute a SELECT query and return single row
     */
    public function queryOne($sql, $params = [])
    {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Query error: " . $e->getMessage());
        }
    }

    /**
     * Execute INSERT/UPDATE/DELETE
     */
    public function execute($sql, $params = [])
    {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return $stmt->rowCount();
        } catch (PDOException $e) {
            throw new Exception("Execute error: " . $e->getMessage());
        }
    }

    /**
     * Get last inserted ID
     */
    public function lastInsertId()
    {
        return $this->conn->lastInsertId();
    }
}
?>