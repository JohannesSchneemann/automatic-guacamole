<?php
    extract($_POST);
    $servername = "localhost"
    $username = "root"
    $password = "root"
    $dbname = "cs3320"

    $con = new mysqli_connect($servername, $username, $password, $dbname);
        
        // Check connection
        if (mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
        mysqli_select_db($con,"cs3320");

            
        $fullname = $_POST["fullname"];
        $address1 = $_POST["addr1"];
        $address2 = $_POST["addr2"];
        $city = $_POST["city"];
        $state = $_POST["state"];
        $zip = $_POST["zip"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];

        $sql = "INSERT INTO userinformation (fullname,address1,address2,city,state,zip,phone,email) VALUES ('$fullname','$address1','$address2','$city','$state','$zip','$phone','$email')";

        mysqli_query($con,"SELECT * FROM userinformation");
        mysqli_query($con,$sql);


        mysqli_close($con);
        
?>
