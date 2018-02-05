<?php

$last_id = $_POST["id"];

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

?>
