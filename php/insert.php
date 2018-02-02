<?php

include('connect.php');

$_name = $_POST["name"];
$_value = $_POST["value"];
$_text = $_POST["text"];
$sql = "INSERT INTO test (name,value,text)
VALUES ('$_name', '$_value', '$_text') ";
if ($conn->query($sql) === TRUE) {
	$last_id = mysqli_insert_id($conn);
	echo "個數:" . count($_FILES["upfile"]["name"]) . "<BR>";
	echo "New record created successfully. Last inserted ID is: " . $last_id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


if(is_dir("../data/".$last_id)){
	for($i=0;$i<count($_FILES["upfile"]["name"]);$i++){
        move_uploaded_file($_FILES['upfile']['tmp_name'][$i],"../data/".$last_id."/images/".$_FILES["upfile"]["name"][$i]);
        chmod("../data/".$last_id."/images/".$_FILES["upfile"]["name"][$i],0777);
    }
    chmod("../data/".$last_id,0777);
    chmod("../data/".$last_id."/images",0777);
    chmod("../data/".$last_id."/videos",0777);

	
}
else{
	mkdir("../data/".$last_id,0777); //建立目錄
	mkdir("../data/".$last_id."/images",0777);
	mkdir("../data/".$last_id."/videos",0777);
	for($i=0;$i<count($_FILES["upfile"]["name"]);$i++){
        move_uploaded_file($_FILES['upfile']['tmp_name'][$i],"../data/".$last_id."/images/".$_FILES["upfile"]["name"][$i]);
        chmod("../data/".$last_id."/images/".$_FILES["upfile"]["name"][$i],0777);
    }
    chmod("../data/".$last_id,0777);
    chmod("../data/".$last_id."/images",0777);
    chmod("../data/".$last_id."/videos",0777);
 
	
}
//echo $_name.$_value.$_text;






$conn->close();
/* for($i=0;$i<count($_FILES["upfile"]["name"]);$i++){
		move_uploaded_file($_FILES['upfile']['tmp_name'][$i], "../images/".$_FILES["upfile"]["name"][$i]);
} */
?>
