<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';
$key = $_GET['key'];
$stmt = $conn->prepare("SELECT id FROM folders WHERE user_key = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$folder_id = $stmt->get_result()->fetch_assoc()['id'];

$files = [];
$res = $conn->query("SELECT * FROM files WHERE folder_id = $folder_id ORDER BY created_at DESC");
while ($row = $res->fetch_assoc()) $files[] = $row;

$notes = [];
$res = $conn->query("SELECT * FROM notes WHERE folder_id = $folder_id ORDER BY created_at DESC");
while ($row = $res->fetch_assoc()) $notes[] = $row;

echo json_encode(["files" => $files, "notes" => $notes]);
