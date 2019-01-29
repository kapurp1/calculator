<?php

echo "<pre>";
print_r($_REQUEST);


$servername = "localhost:8889";
$username = "root";
$password = "root";
$dbname = "calci";
$port = 8889;

$expression = $_POST['expression'];
$value = $_POST['value'];
$created_at = time();


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO calci_history (expression, value, created_at)
VALUES ($expression, $value, $created_at)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
