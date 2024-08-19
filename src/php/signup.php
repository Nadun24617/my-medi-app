<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first_name'];
    $lastName = $_POST['last_name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $gender = $_POST['gender'];
    $password = $_POST['password'];
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (first_name, last_name, email, number, gender, password) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $firstName, $lastName, $email, $number, $gender, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully."]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
