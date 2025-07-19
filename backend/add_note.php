<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

// Enable error logging
error_log("add_note.php: Script started");

include 'db.php';

try {
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        error_log("add_note.php: Invalid request method: " . $_SERVER["REQUEST_METHOD"]);
        echo json_encode(["status" => "error", "message" => "Invalid request method"]);
        exit;
    }

    $key = $_POST['key'] ?? '';
    $content = $_POST['content'] ?? '';

    // Validate inputs
    if (empty($key)) {
        error_log("add_note.php: Missing key");
        echo json_encode(["status" => "error", "message" => "Missing key"]);
        exit;
    }

    if (empty(trim($content))) {
        error_log("add_note.php: Empty note content");
        echo json_encode(["status" => "error", "message" => "Note content cannot be empty"]);
        exit;
    }

    // Get folder_id from folders table
    $stmt = $conn->prepare("SELECT id FROM folders WHERE user_key = ?");
    if (!$stmt) {
        error_log("add_note.php: Prepare failed for SELECT: " . $conn->error);
        echo json_encode(["status" => "error", "message" => "Database error"]);
        exit;
    }
    $stmt->bind_param("s", $key);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    if (!$row) {
        error_log("add_note.php: No folder found for user_key=$key");
        echo json_encode(["status" => "error", "message" => "Invalid key"]);
        exit;
    }

    $folder_id = $row['id'];
    error_log("add_note.php: Found folder_id=$folder_id for user_key=$key");

    // Insert note into notes table
    $stmt = $conn->prepare("INSERT INTO notes (folder_id, content) VALUES (?, ?)");
    if (!$stmt) {
        error_log("add_note.php: Prepare failed for INSERT: " . $conn->error);
        echo json_encode(["status" => "error", "message" => "Database error"]);
        exit;
    }
    $stmt->bind_param("is", $folder_id, $content);
    $stmt->execute();
    $stmt->close();

    error_log("add_note.php: Note added for folder_id=$folder_id");
    echo json_encode(["status" => "success", "message" => "Note added"]);

} catch (Exception $e) {
    error_log("add_note.php: Exception: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Server error: " . $e->getMessage()]);
}

$conn->close();
error_log("add_note.php: Script ended");
?>