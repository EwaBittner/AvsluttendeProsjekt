<?php
require 'connect.php';

$sql = "SELECT value, date FROM measurements ORDER BY date ASC";
$results = $conn->query($sql);
$data = [];

while($row = $results->fetch_assoc()){
    array_push($data, $row);
}
echo json_encode($data);
?>