<?php

include('connect.php');

$_id = $_POST["id"];
$_name = $_POST["name"];
$_value = $_POST["value"];
$_text = $_POST["text"];

$sql = "UPDATE test 
SET name='$_name',
    value='$_value',
    text='$_text'
WHERE id='$_id'  ";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

?>