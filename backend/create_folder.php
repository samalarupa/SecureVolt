<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';
$key = $_POST['key'];
$stmt = $conn->prepare("INSERT INTO folders (user_key) VALUES (?)");
$stmt->bind_param("s", $key);
$stmt->execute();
echo "created";
