<?php
include 'database_connect.php';
$conn = OpenCon();

$sql = "SELECT * FROM userCredentials";

$result = mysqli_query($conn, $sql);

while($row = mysqli_fetch_array($result)){
    $id = $row['userID'];
    $usrname = $row['username'];
    $pword = $row['pass'];
    
    $return_arr[] = array("id" => $id,
                          "usrname" => $usrname,
                          "pword" => $pword);
}

$myJSON = json_encode($return_arr);

echo $myJSON;

CloseCon($conn);
?>
