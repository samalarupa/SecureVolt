<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';
$key = $_POST['key'];
$stmt = $conn->prepare("SELECT id FROM folders WHERE user_key = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$folder_id = $stmt->get_result()->fetch_assoc()['id'];

foreach ($_FILES['files']['tmp_name'] as $i => $tmpName) {
    $name = $_FILES['files']['name'][$i];
    $type = $_FILES['files']['type'][$i];
    $path = "uploads/" . uniqid() . "_" . basename($name);
    move_uploaded_file($tmpName, $path);
    $stmt = $conn->prepare("INSERT INTO files (folder_id, file_name, file_type, file_path) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $folder_id, $name, $type, $path);
    $stmt->execute();
}
echo "uploaded";
