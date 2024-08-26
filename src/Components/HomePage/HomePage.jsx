// src/App.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to My Vite App</h1>
        {/* Your content goes here */}
      </main>
    </div>
  );
}

export default App;
