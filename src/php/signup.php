<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Debug: Print out the received JSON data
    echo json_encode(["received_data" => $data]);

    // Extract and trim input values
    $firstName = isset($data['first_name']) ? trim($data['first_name']) : '';
    $lastName = isset($data['last_name']) ? trim($data['last_name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $number = isset($data['number']) ? trim($data['number']) : '';
    $gender = isset($data['gender']) ? trim($data['gender']) : '';
    $password = isset($data['password']) ? trim($data['password']) : '';

    // Check if any field is empty
    if (empty($firstName) || empty($lastName) || empty($email) || empty($number) || empty($gender) || empty($password)) {
        echo json_encode(["error" => "All fields are required."]);
        exit();
    }

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
    exit();
}
?>
