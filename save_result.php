<?php
    require_once "connect.php";

    // Data upload
    $username = $_POST["username"];
    $device = $_POST["device"];
    $date = $_POST["date"];
    $value = $_POST["value"];

    // Check if user is registered, if not add
    $stmt = $conn->prepare("SELECT id FROM users WHERE name = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $user_id = $row["id"];
    } else {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, '', '')");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $user_id = $stmt->insert_id;
    }

    // Check if device is registered, if not add
    $stmt = $conn->prepare("SELECT id FROM device WHERE name = ?");
    $stmt->bind_param("s", $device);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $device = $row["id"];
    } else {
        $stmt = $conn->prepare("INSERT INTO device (name, description, unit) VALUES (?, '', '')");
        $stmt->bind_param("s", $device);
        $stmt->execute();
        $device_id = $stmt->insert_id;
    }

    $stmt = $conn->prepare("INSERT INTO measurements (user_id, device_id, value, date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iids", $user_id, $device_id, $value, $date);
    $stmt->execute();

    echo "<p> Result was saved in the database.</p>";

    $conn->close();

?>