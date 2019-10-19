<?php
$mysqli = new mysqli("localhost", "root", "Snow_man/85cs", "cs3320"); 
if($mysqli->connect_error) {
exit('Could not connect');
}$sql = "SELECT stateID, stateCode, stateName FROM States WHERE stateID = ?"; $stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $_GET['q']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($stateID, $stateCode, $stateName); $stmt->fetch();
$stmt->close();
echo "<table>";
echo "<tr>";
echo "<th>stateID</th>"; echo "<td>" . $stateID . "</td>";
echo "<th>stateCode</th>"; echo "<td>" . $stateCode . "</td>";
echo "<th>stateName</th>"; echo "<td>" . $stateName . "</td>"; 
echo "</table>";
?>
 