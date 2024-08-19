<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if POST data is not empty
    if (empty($_POST['email']) || empty($_POST['password'])) {
        echo json_encode(["error" => "All fields are required."]);
        exit();
    }

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(["message" => "Login successful."]);
        } else {
            echo json_encode(["error" => "Invalid password."]);
        }
    } else {
        echo json_encode(["error" => "No user found with that email."]);
    }

    $stmt->close();
    $conn->close();
}
?>
