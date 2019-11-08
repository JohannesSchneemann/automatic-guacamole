<?php
include 'database_connect.php';
$conn = OpenCon();
//echo "Connected Successfully";

$sql = "SELECT * FROM states";

$result = mysqli_query($conn, $sql);

while($row = mysqli_fetch_array($result)){
    $id = $row['stateID'];
    $code = $row['stateCode'];
    $name = $row['stateName'];
    
    $return_arr[] = array("id" => $id,
                          "code" => $code,
                          "name" => $name);
}

$myJSON = json_encode($return_arr);

echo $myJSON;

CloseCon($conn);
?>