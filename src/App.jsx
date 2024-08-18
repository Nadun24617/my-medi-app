import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUpForm from './Components/SignUpForm/SignUpForm';

function App() {
  return (
    <div className="text-white h-[100vh] flex items-center justify-center bg-cover" style={{ backgroundImage: "url('../src/Components/Assets/bg.jpg')" }}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<LoginForm />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
