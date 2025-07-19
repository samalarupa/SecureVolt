<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER[' \
REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$filePath = isset($_GET['path']) ? urldecode($_GET['path']) : null;
$isDownload = isset($_GET['download']) && $_GET['download'] === '1';

if (!$filePath) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "File path is required"]);
    exit;
}

// Sanitize file path to prevent directory traversal
$filePath = realpath(__DIR__ . '/' . $filePath);
$uploadsDir = realpath(__DIR__ . '/Uploads');

if ($filePath === false || strpos($filePath, $uploadsDir) !== 0) {
    http_response_code(403);
    echo json_encode(["success" => false, "error" => "Invalid file path"]);
    exit;
}

if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(["success" => false, "error" => "File not found"]);
    exit;
}

// Get file details
$fileName = basename($filePath);
$fileType = mime_content_type($filePath);

// Set headers
if ($isDownload) {
    header('Content-Description: File Transfer');
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
} else {
    header('Content-Disposition: inline; filename="' . $fileName . '"');
}
header('Content-Type: ' . $fileType);
header('Content-Length: ' . filesize($filePath));
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');

// Output file
readfile($filePath);
exit;
?>