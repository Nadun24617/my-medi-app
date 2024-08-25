<?php

// Database connect
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

// Handle incoming requests
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        addAppointment($pdo, $data);
        break;
    case 'PUT':
        updateAppointment($pdo, $data);
        break;
    case 'DELETE':
        deleteAppointment($pdo, $_GET['id']);
        break;
    case 'GET':
        getAppointments($pdo);
        break;
    default:
        echo json_encode(['error' => 'Unsupported request method']);
        break;
}

function addAppointment($pdo, $data) {
    $sql = "INSERT INTO appointments (name, time, date, location, image) VALUES (:name, :time, :date, :location, :image)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $data['name'],
        ':time' => $data['time'],
        ':date' => $data['date'],
        ':location' => $data['location'],
        ':image' => $data['image'],
    ]);
    $data['id'] = $pdo->lastInsertId();
    echo json_encode($data);
}

function updateAppointment($pdo, $data) {
    $sql = "UPDATE appointments SET name = :name, time = :time, date = :date, location = :location, image = :image WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $data['name'],
        ':time' => $data['time'],
        ':date' => $data['date'],
        ':location' => $data['location'],
        ':image' => $data['image'],
        ':id' => $data['id'],
    ]);
    echo json_encode($data);
}

function deleteAppointment($pdo, $id) {
    $sql = "DELETE FROM appointments WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id]);
    echo json_encode(['success' => true]);
}

function getAppointments($pdo) {
    $sql = "SELECT * FROM appointments";
    $stmt = $pdo->query($sql);
    $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($appointments);
}
?>