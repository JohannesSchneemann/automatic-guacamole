<?php
function OpenCon() {
	$dbhost = "localhost:8889";
 	$dbuser = "root";
 	$dbpass = "root";
 	$db = "cs3320";
	
 	$conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 	return $conn;
 }
 
function CloseCon($conn){
 	$conn -> close();
 }
   
?>