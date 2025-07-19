<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "securevolt";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if (!is_dir("uploads")) {
    mkdir("uploads", 0777, true);
}
?>
