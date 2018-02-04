<?php

$dir = $_POST["dir"];

rrmdir($dir);

function rrmdir($dir) { 
	if (is_dir($dir)) { 
		$objects = scandir($dir); 
		foreach ($objects as $object) { 
			if ($object != "." && $object != "..") { 
				if (is_dir($dir."/".$object))
					rrmdir($dir."/".$object);
				else
					unlink($dir."/".$object); 
			} 
		}
		rmdir($dir); 
	}
	else{
		echo " Directory not exists ".$_dir;
		return;
	}
}

?>