import { useState } from 'react';

function DailyMedications() {
  const [tasks, setTasks] = useState([
    
    // Add initial tasks if needed
  ]);

  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');
  const [editingTaskTime, setEditingTaskTime] = useState('');
  const [editingTaskDate, setEditingTaskDate] = useState('');
  const [editingTaskNote, setEditingTaskNote] = useState('');

  // Add a new task
  const addTask = () => {
    if (newTask.trim() && newTime && newDate) {
      fetch('http://localhost/my-medi-app/src/php/dailymedications.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTask, time: newTime, date: newDate, note: newNote })
      })
      .then(response => response.json())
      .then(newTask => setTasks([...tasks, newTask]))
      .catch(error => console.error('Error:', error));
      
      setNewTask('');
      setNewTime('');
      setNewDate('');
      setNewNote('');
    }
  };

  // Remove a task
  const removeTask = (taskId) => {
    fetch(`http://localhost/my-medi-app/src/php/dailymedications.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId })
    })
    .then(() => setTasks(tasks.filter((task) => task.id !== taskId)))
    .catch(error => console.error('Error:', error));
  };

  // Start editing a task
  const startEditing = (taskId, currentName, currentTime, currentDate, currentNote) => {
    setEditingTaskId(taskId);
    setEditingTaskName(currentName);
    setEditingTaskTime(currentTime);
    setEditingTaskDate(currentDate);
    setEditingTaskNote(currentNote);
  };

  // Save the edited task
  const saveEdit = () => {
    fetch(`http://localhost/my-medi-app/src/php/dailymedications.php`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingTaskId,
        name: editingTaskName,
        time: editingTaskTime,
        date: editingTaskDate,
        note: editingTaskNote
      })
    })
    .then(response => response.json())
    .then(updatedTask => {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? updatedTask : task
        )
      );
    })
    .catch(error => console.error('Error:', error));

    setEditingTaskId(null);
    setEditingTaskName('');
    setEditingTaskTime('');
    setEditingTaskDate('');
    setEditingTaskNote('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Daily Medications</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border-b border-gray-200">
            {editingTaskId === task.id ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  value={editingTaskName}
                  onChange={(e) => setEditingTaskName(e.target.value)}
                  className="p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="time"
                  value={editingTaskTime}
                  onChange={(e) => setEditingTaskTime(e.target.value)}
                  className="p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="date"
                  value={editingTaskDate}
                  onChange={(e) => setEditingTaskDate(e.target.value)}
                  className="p-2 mb-2 border border-gray-300 rounded"
                />
                <textarea
                  value={editingTaskNote}
                  onChange={(e) => setEditingTaskNote(e.target.value)}
                  placeholder="Add a note"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            ) : (
              <div>
                <span>{task.name}</span>
                <div className="text-sm text-gray-500">
                  {task.time} on {task.date}
                </div>
                {task.note && <div className="text-sm text-gray-700 mt-1">Note: {task.note}</div>}
              </div>
            )}

            <div className="flex items-center">
              {editingTaskId === task.id ? (
                <button onClick={saveEdit} className="text-green-500 ml-2">
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(task.id, task.name, task.time, task.date, task.note)}
                  className="text-blue-500 ml-2"
                >
                  Edit
                </button>
              )}
              <button onClick={() => removeTask(task.id)} className="text-red-500 ml-2">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task name"
          className="p-2 mb-2 border border-gray-300 rounded w-full"
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded w-full"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="p-2 mb-2 border border-gray-300 rounded w-full"
        />
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note"
          className="p-2 mb-2 border border-gray-300 rounded w-full"
        />
        <button onClick={addTask} className="p-2 bg-blue-500 text-white rounded w-full">
          Add Task
        </button>
      </div>
    </div>
  );
}

export default DailyMedications;
