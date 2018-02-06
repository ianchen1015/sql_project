<?php

$_id = $_POST["id"];

$emparray = array();

$_dir = "../data/".$_id."/";

if ($handle = opendir($_dir)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            //echo "$entry\n";
            array_push($emparray, $entry);
        }
    }
    closedir($handle);
}
echo json_encode($emparray);

?>