<?php

$servername = "localhost:8889";
$username = "root";
$password ="root";
$dbname ="cs3320";

$uname = $_GET["username"];
$pwd = $_GET["password"];


$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
	die("connections failed:" . $conn->connect_error);
}


//check to see if username and password are in DB
$sql = "SELECT * FROM userCredentials WHERE username = '$uname' AND password = '$pwd' ";
$result = $conn->query($sql);

if ($result->num_rows > 0){

	//retrieve userID number
	while($row = $result->fetch_assoc()){
	    $user = $row['userID'];
	}

    //save userid in php session
	session_start();
	$_SESSION['login_user']= $user;  // Initializing Session with value of user
	 echo '<script>window.location.href = "CS3320Project.html";</script>';

}else {
	echo '<script>alert("Username and/or Password incorrect. Please try again.") </script>';
	echo '<script>window.location.href = "login.html";</script>';
}

mysqli_close($conn)

?>
