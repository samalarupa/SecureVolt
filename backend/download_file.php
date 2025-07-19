<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Enable error logging
error_log("download_file.php: Script started");

try {
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        error_log("download_file.php: Invalid request method: " . $_SERVER["REQUEST_METHOD"]);
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Invalid request method"]);
        exit;
    }

    $key = $_POST['key'] ?? '';
    $file_path = $_POST['file_path'] ?? '';
    $file_name = $_POST['file_name'] ?? '';

    // Log inputs
    error_log("download_file.php: Received key=$key, file_path=$file_path, file_name=$file_name");

    // Validate inputs
    if (empty($key)) {
        error_log("download_file.php: Missing key");
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing key"]);
        exit;
    }

    if (empty($file_path)) {
        error_log("download_file.php: Missing file_path");
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing file path"]);
        exit;
    }

    if (empty($file_name)) {
        error_log("download_file.php: Missing file_name");
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing file name"]);
        exit;
    }

    // Construct full file path
    $full_path = realpath(__DIR__ . '/' . $file_path);

    // Verify file exists and is within uploads directory
    $uploads_dir = realpath(__DIR__ . '/uploads');
    if (!$full_path || strpos($full_path, $uploads_dir) !== 0 || !file_exists($full_path)) {
        error_log("download_file.php: Invalid or non-existent file: $full_path");
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "File not found or access denied"]);
        exit;
    }

    // Set headers for download
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($file_name) . '"');
    header('Content-Length: ' . filesize($full_path));
    header('Cache-Control: no-cache');

    // Stream the file
    readfile($full_path);
    error_log("download_file.php: File sent: $file_name");
    exit;

} catch (Exception $e) {
    error_log("download_file.php: Exception: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server error: " . $e->getMessage()]);
}

error_log("download_file.php: Script ended");
?>