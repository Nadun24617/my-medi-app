<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'myapp';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM tasks ORDER BY date, time";
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
        $name = $data['name'];
        $time = $data['time'];
        $date = $data['date'];
        $note = $data['note'];

        $stmt = $conn->prepare("INSERT INTO tasks (name, time, date, note) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $time, $date, $note);
        $stmt->execute();

        $id = $stmt->insert_id;
        echo json_encode(['id' => $id, 'name' => $name, 'time' => $time, 'date' => $date, 'note' => $note]);

        $stmt->close();
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $name = $data['name'];
        $time = $data['time'];
        $date = $data['date'];
        $note = $data['note'];

        $stmt = $conn->prepare("UPDATE tasks SET name=?, time=?, date=?, note=? WHERE id=?");
        $stmt->bind_param("ssssi", $name, $time, $date, $note, $id);
        $stmt->execute();

        echo json_encode(['id' => $id, 'name' => $name, 'time' => $time, 'date' => $date, 'note' => $note]);

        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
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
