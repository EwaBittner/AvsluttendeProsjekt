<?php
    $mysql = new mysql("localhost", "root", "", "test_results");

    if($mysql->connect_error != 0) {
        die($mysql->connect_error);
    }

    $sql = "SELECT * FROM measurements";
    $results = $mysql->query($sql);
    $data = [];
    while($row = $results->fetch_assoc()){
        array_push($data, $row);
    }

    echo json_encode($data); #data needed in json for JS