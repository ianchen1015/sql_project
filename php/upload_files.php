<?php

$last_id = $_POST["id"];

if(is_dir("../data/".$last_id)){
	for($i=0;$i<count($_FILES["upfile"]["name"]);$i++){
        move_uploaded_file($_FILES['upfile']['tmp_name'][$i],"../data/".$last_id."/".$_FILES["upfile"]["name"][$i]);
        chmod("../data/".$last_id."/".$_FILES["upfile"]["name"][$i],0777);
    }
    chmod("../data/".$last_id,0777);

	
}
else{
	mkdir("../data/".$last_id,0777); //建立目錄
	for($i=0;$i<count($_FILES["upfile"]["name"]);$i++){
        move_uploaded_file($_FILES['upfile']['tmp_name'][$i],"../data/".$last_id."/".$_FILES["upfile"]["name"][$i]);
        chmod("../data/".$last_id."/".$_FILES["upfile"]["name"][$i],0777);
    }
    chmod("../data/".$last_id,0777);
}

?>
