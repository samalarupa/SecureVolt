<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Enable error logging
error_log("delete_note.php: Script started");

include 'db.php';

try {
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        error_log("delete_note.php: Invalid request method: " . $_SERVER["REQUEST_METHOD"]);
        echo json_encode(["status" => "error", "message" => "Invalid request method"]);
        exit;
    }

    // Log database schema
    $tables = $conn->query("SHOW TABLES");
    $table_list = [];
    while ($row = $tables->fetch_array()) {
        $table_list[] = $row[0];
    }
    error_log("delete_note.php: Tables in database: " . implode(", ", $table_list));

    foreach (['folders', 'notes'] as $table) {
        if (in_array($table, $table_list)) {
            $columns = $conn->query("SHOW COLUMNS FROM `$table`");
            $column_list = [];
            while ($row = $columns->fetch_assoc()) {
                $column_list[] = $row['Field'];
            }
            error_log("delete_note.php: Columns in '$table': " . implode(", ", $column_list));
        } else {
            error_log("delete_note.php: Table '$table' not found");
            echo json_encode(["status" => "error", "message" => "Table '$table' not found"]);
            exit;
        }
    }

    $key = $_POST['key'] ?? '';
    $content = $_POST['content'] ?? '';

    // Log received inputs
    error_log("delete_note.php: Received key=$key, content=" . (empty($content) ? "EMPTY" : substr($content, 0, 50)));

    // Validate inputs
    if (empty($key)) {
        error_log("delete_note.php: Missing key");
        echo json_encode(["status" => "error", "message" => "Missing key"]);
        exit;
    }

    if (empty(trim($content))) {
        error_log("delete_note.php: Missing or empty content");
        echo json_encode(["status" => "error", "message" => "Missing note content"]);
        exit;
    }

    // Get folder_id from folders table
    $stmt = $conn->prepare("SELECT id FROM folders WHERE user_key = ?");
    if (!$stmt) {
        error_log("delete_note.php: Prepare failed for SELECT: " . $conn->error);
        echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
        exit;
    }
    $stmt->bind_param("s", $key);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    if (!$row) {
        error_log("delete_note.php: No folder found for user_key=$key");
        echo json_encode(["status" => "error", "message" => "Invalid key"]);
        exit;
    }

    $folder_id = $row['id'];
    error_log("delete_note.php: Found folder_id=$folder_id for user_key=$key");

    // Delete note from notes table
    $stmt = $conn->prepare("DELETE FROM notes WHERE folder_id = ? AND content = ? LIMIT 1");
    if (!$stmt) {
        error_log("delete_note.php: Prepare failed for DELETE: " . $conn->error);
        echo json_encode(["status" => "error", "message" => "Database error: " . $conn->error]);
        exit;
    }
    $stmt->bind_param("is", $folder_id, $content);
    $stmt->execute();
    $affected_rows = $stmt->affected_rows;
    $stmt->close();

    if ($affected_rows > 0) {
        error_log("delete_note.php: Note deleted for folder_id=$folder_id, content=" . substr($content, 0, 50));
        echo json_encode(["status" => "success", "message" => "Note deleted"]);
    } else {
        error_log("delete_note.php: No note found for folder_id=$folder_id, content=" . substr($content, 0, 50));
        echo json_encode(["status" => "error", "message" => "Note not found"]);
    }

} catch (Exception $e) {
    error_log("delete_note.php: Exception: " . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "Server error: " . $e->getMessage()]);
}

$conn->close();
error_log("delete_note.php: Script ended");
?>