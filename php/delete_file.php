<?php

$dir = $_POST["dir"];

if (file_exists($dir)) {
    unlink($dir);
    echo "File deleted.";
} else {
    echo "File not found.";
}

?>