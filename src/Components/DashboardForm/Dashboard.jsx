import { useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Take morning medication' },
    { id: 2, text: 'Doctor appointment at 3 PM' },
  ]);

  const addTask = () => {
    const newTask = { id: tasks.length + 1, text: 'New Task' };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-4">Medi App</h2>
        <nav>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-blue-300">Dashboard</a></li>
            <li className="mb-2"><a href="#" className="hover:text-blue-300">Tasks</a></li>
            <li className="mb-2"><a href="#" className="hover:text-blue-300">Profile</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Panel */}
        <header className="bg-white shadow p-4">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>

        {/* Dashboard Panel */}
        <main className="flex-1 p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Daily Tasks</h2>
          <ul className="mb-4">
            {tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-md">
                <span>{task.text}</span>
                <div>
                  <button 
                    onClick={() => editTask(task.id, prompt('Edit Task', task.text))} 
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => removeTask(task.id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button 
            onClick={addTask} 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Task
          </button>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
