<?php
	$servername = "localhost";
	$username = "replace_root";
	$password = "replace_password";
	$dbname = "cs3320";

	$mysqli = new mysqli(servername, username, password, dbname);

	if($mysqli->connect_error) {
			exit('Could not connect');
	}

	$sql = "SELECT stateID, stateCode, stateName FROM States WHERE stateID = ?"; 
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("s", $_GET['q']);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($productID, $description, $unitPrice); $stmt->fetch();
	$stmt->close();

	echo "<table>";
	echo "<tr>";
	echo "<th>productID</th>"; echo "<td>" . $productID . "</td>";
	echo "<th>description</th>"; echo "<td>" . $description . "</td>";
	echo "<th>unitPrice</th>"; echo "<td>" . $unitPrice . "</td>"; 
	echo "</table>";
?>
 