<?php

include('connect.php');
$_name =$_FILES["upfile"]["name"];
echo "<BLOCKQUOTE>";
      echo "檔案名稱：" . $_FILES["upfile"]["name"] . "<BR>";
      echo "檔案大小：" . $_FILES["upfile"]["size"] . "<BR>";
      echo "檔案類型：" . $_FILES["upfile"]["type"] . "<BR>";
      echo "暫存檔名：" . $_FILES["upfile"]["tmp_name"] . "<BR>";
echo "</BLOCKQUOTE>";

move_uploaded_file($_FILES['upfile']['tmp_name'], "../images/".$_FILES["upfile"]["name"]);
echo "$_name";
$sql = "INSERT INTO img_test (img)
VALUES ('$_name') ";
$conn->query($sql);
$conn->close();
?>