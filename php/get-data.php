<?php

include('connect.php');

$sql = "SELECT * FROM test";
$result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($conn));
$emparray = array();

while($row =mysqli_fetch_assoc($result))
{
    $emparray[] = $row;
}
echo json_encode($emparray);

$conn->close();

?>