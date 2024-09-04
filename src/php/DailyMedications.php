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
$tasks = [];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM tasks ORDER BY date, time";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $tasks[] = $row; // Store each task in the array
            }
        }
        echo json_encode($tasks); // Return the array of tasks
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['name']) || empty($data['time']) || empty($data['date'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            exit;
        }

        // Store data in the array
        $newTask = [
            'name' => $data['name'],
            'time' => $data['time'],
            'date' => $data['date'],
            'note' => $data['note'] ?? ''
        ];

        $tasks[] = $newTask;

        // Insert the new task into the database
        $stmt = $conn->prepare("INSERT INTO tasks (name, time, date, note) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $newTask['name'], $newTask['time'], $newTask['date'], $newTask['note']);
        $stmt->execute();

        $newTask['id'] = $stmt->insert_id; // Add the generated ID to the task
        echo json_encode($newTask);

        $stmt->close();
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['id']) || empty($data['name']) || empty($data['time']) || empty($data['date'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            exit;
        }

        // Update the task in the array
        foreach ($tasks as &$task) {
            if ($task['id'] == $data['id']) {
                $task['name'] = $data['name'];
                $task['time'] = $data['time'];
                $task['date'] = $data['date'];
                $task['note'] = $data['note'] ?? '';
                break;
            }
        }

        // Update the task in the database
        $stmt = $conn->prepare("UPDATE tasks SET name=?, time=?, date=?, note=? WHERE id=?");
        $stmt->bind_param("ssssi", $data['name'], $data['time'], $data['date'], $data['note'], $data['id']);
        $stmt->execute();

        echo json_encode($data);

        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || empty($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input']);
            exit;
        }

        // Remove the task from the array
        $tasks = array_filter($tasks, function($task) use ($data) {
            return $task['id'] != $data['id'];
        });

        // Delete the task from the database
        $stmt = $conn->prepare("DELETE FROM tasks WHERE id=?");
        $stmt->bind_param("i", $data['id']);
        $stmt->execute();

        echo json_encode(['id' => $data['id']]);

        $stmt->close();
        break;
}

$conn->close();
?>
