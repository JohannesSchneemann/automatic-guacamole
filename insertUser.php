<?php

$con = mysqli_connect("localhost","root","not","cs3320");

if (!$con){
  die('Could not connect: ' . mysql_error());
  }else echo "connected!!!<br>";

 
$sql="INSERT INTO cs3320.userInformation (fName, address1, address2, city, state, zip, email, notes)

VALUES
('$_POST[fName]', 
'$_POST[address1]',
'$_POST[address2]',
'$_POST[city]',
'$_POST[state]',
'$_POST[zip]',
'$_POST[email]')";


echo $sql;

//execute the INSERT
if (!mysqli_query($con,$sql)){
      die('Error: ' . mysqli_error($con));
  }else {
     echo "<br>1 record added";
  }
 
mysqli_close($con)

?>


