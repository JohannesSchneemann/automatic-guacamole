<?php
include 'database_connect.php';

$conn = OpenCon();
//echo "Connected Successfully";

$sql = "SELECT * FROM products";

$result = mysqli_query($conn, $sql);

while($row = mysqli_fetch_array($result)){
    $id = $row['productID'];
    $desc = $row['description'];
    $price = $row['unitPrice'];
    
    $return_arr[] = array("id" => $id,
                          "desc" => $desc,
                          "price" => $price);
}

$myJSON = json_encode($return_arr);

echo $myJSON;

CloseCon($conn);
?>