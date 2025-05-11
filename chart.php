<?php

// For debugging, to show error message
// ini_set('display_errors', 1);
// error_reporting(E_ALL);


require 'connect.php';

// Get name of the last used device
$latestDevice = "SELECT device_id FROM measurements ORDER BY id DESC LIMIT 1";
$result = $conn->query($latestDevice);

if($row = $result->fetch_assoc()) {
    $latestDevice = $row['device_id'];

    // Get results from the latest device
    $latestData = "SELECT value, date FROM measurements WHERE device_id = '$latestDevice' ORDER BY date ASC";
    $latestResult = $conn->query($latestData);

    $data = [];

    while($row = $latestResult->fetch_assoc()){
        $data[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo json_encode([]);    // in case there is no data
}
?>