<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include 'db.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM pill ORDER BY date, time";
        $result = $conn->query($sql);

        $tasks = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
        }
        echo json_encode($tasks);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['name']) || empty($data['time']) || empty($data['date'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            exit;
        }
        $name = $data['name'];
        $time = $data['time'];
       
        $note = $data['note'];

        $stmt = $conn->prepare("INSERT INTO pill (name, time, note) VALUES (?, ?, ?)");
        $stmt->bind_param("ssss", $name, $time, $note);
        $stmt->execute();

        $id = $stmt->insert_id;
        echo json_encode(['id' => $id, 'name' => $name, 'time' => $time, 'note' => $note]);

        $stmt->close();
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['id']) || empty($data['name']) || empty($data['time'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            exit;
        }
        $id = $data['id'];
        $name = $data['name'];
        $time = $data['time'];
    
        $note = $data['note'];
        

        $stmt = $conn->prepare("UPDATE tasks SET name=?, time=?, note=? WHERE id=?");
        $stmt->bind_param("ssssi", $name, $time, $note, $id);
        $stmt->execute();

        echo json_encode(['id' => $id, 'name' => $name, 'time' => $time, 'note' => $note]);

        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            exit;
        }
        $id = $data['id'];

        $stmt = $conn->prepare("DELETE FROM tasks WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(['id' => $id]);

        $stmt->close();
        break;
}



$conn->close();
?>
