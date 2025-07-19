<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';
$key = $_POST['key'];
$stmt = $conn->prepare("SELECT * FROM folders WHERE user_key = ?");
$stmt->bind_param("s", $key);
$stmt->execute();
$result = $stmt->get_result();
echo ($result->num_rows > 0) ? "exists" : "new";
