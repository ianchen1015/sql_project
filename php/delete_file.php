<?php

$dir = $_POST["dir"];

if (file_exists($dir)) {
    unlink($dir);
    echo " deleted.";
} else {
    echo "File not found.";
}

?>