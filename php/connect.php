<?php

$servername = "dbhome.cs.nctu.edu.tw";
$username = "yian1015_cs";
$password = "0000";
$dbname = "yian1015_cs";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>