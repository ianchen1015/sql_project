<?php

include('connect.php');

$_id = $_POST["id"];

// sql to delete a record
$sql = "DELETE FROM test WHERE id='$_id' ";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>