<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Enable error logging
error_log("delete_file.php: Script started");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "securevolt";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    error_log("delete_file.php: Connected to database $dbname");

    // Log all tables in the database
    $stmt = $conn->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    error_log("delete_file.php: Tables in database: " . implode(", ", $tables));

    // Check schema for each table
    $target_table = null;
    foreach ($tables as $table) {
        $stmt = $conn->query("SHOW COLUMNS FROM `$table`");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        error_log("delete_file.php: Columns in '$table': " . implode(", ", $columns));
        if (in_array('file_path', $columns)) {
            $target_table = $table;
            break;
        }
    }

    if (!$target_table) {
        error_log("delete_file.php: No table found with 'file_path' column");
        echo json_encode(["status" => "error", "message" => "No table found with 'file_path' column"]);
        exit;
    }
    error_log("delete_file.php: Using table '$target_table' with 'file_path' column");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $key = $_POST['key'] ?? '';
        $file_path = $_POST['file_path'] ?? '';

        if (empty($file_path)) {
            error_log("delete_file.php: Missing file_path");
            echo json_encode(["status" => "error", "message" => "Missing file path"]);
            exit;
        }

        error_log("delete_file.php: Key=$key, File_path=$file_path");

        // Delete file from database based on file_path
        $query = "DELETE FROM `$target_table` WHERE file_path = ?";
        error_log("delete_file.php: Executing query: $query with file_path=$file_path");
        $stmt = $conn->prepare($query);
        $stmt->execute([$file_path]);

        if ($stmt->rowCount() > 0) {
            // Delete file from filesystem
            $full_path = __DIR__ . '/' . $file_path;
            error_log("delete_file.php: Attempting to delete file: $full_path");
            if (file_exists($full_path)) {
                if (!unlink($full_path)) {
                    error_log("delete_file.php: Failed to delete file from filesystem: $full_path");
                    echo json_encode(["status" => "error", "message" => "Failed to delete file from filesystem"]);
                    exit;
                }
                error_log("delete_file.php: File deleted from filesystem: $full_path");
            } else {
                error_log("delete_file.php: File not found in filesystem: $full_path");
            }
            echo json_encode(["status" => "success"]);
        } else {
            error_log("delete_file.php: No rows affected, file not found in database for file_path=$file_path");
            echo json_encode(["status" => "error", "message" => "File not found in database"]);
        }
    } else {
        error_log("delete_file.php: Invalid request method: " . $_SERVER["REQUEST_METHOD"]);
        echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    }
} catch (PDOException $e) {
    error_log("delete_file.php: Database error: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}

$conn = null;
error_log("delete_file.php: Script ended");
?>