import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginForm from './Components/LoginForm/LoginForm';
import SignUpForm from './Components/SignUpForm/SignUpForm';
import Dashboard from './Components/DashboardForm/Dashboard';
import DoctorAppointmentsCalendar from './Components/DoctorAppointmentsCalendar';

function App() {
  return (
    <div className="h-[100vh]">
      <Router>
        <Routes>
         
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointmentsCalendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
