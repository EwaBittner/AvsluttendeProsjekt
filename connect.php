<?php
    $host="localhost";
    $user="root";
    $pass="";
    $db="test_results";
    $conn=new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error){
        die("Failed to connect to DB" . $conn->connect_error);
    } else {
        echo "Connected to database!";
    }
?>