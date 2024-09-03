import { useState } from 'react';
import DoctorAppointmentsCalendar from '../DoctorAppointmentsCalendar';
import DailyMedications from '../DailyMedications'; // Import your Daily Medications component here
import PillReminder from '../PillReminder';


export default function Dashboard() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'doctorAppointments':
        return <DoctorAppointmentsCalendar />; // Render the calendar component
      case 'dailyMedications':
        return <DailyMedications />; // Render the Daily Medications component
      case 'pill': // Add case for the Pill Reminder component
        return <PillReminder />; // Render the Pill Reminder component
      // Add cases for other components if needed
      default:
        return <div>Welcome to your dashboard</div>;
    }
  };

  return (
    <div
      className="text-white h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('../src/Components/Assets/bg.jpg')" }}
    >
      {/* Sidebar */}
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-slate-700 text-white p-6 rounded shadow-md flex flex-col"
        aria-label="Sidebar"
      >
        <button
          data-drawer-target="sidebar"
          data-drawer-toggle="sidebar"
          aria-controls="sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-16">Medi-App</h2>
        <ul className="flex flex-col space-y-4">
          <li>
            <a
              href="#daily-medications"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group"
              onClick={() => setActiveComponent('dailyMedications')}
            >
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-yellow-300"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 22 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Daily Medications</span>
            </a>
          </li>
          <li>
            <a
              href="#pill"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group"
              onClick={() => setActiveComponent('pill')}
            >
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-yellow-300"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 7H2V2h14v5Zm0 9H2v-5h14v5Zm0-9H2V2h14v5Zm0 9H2v-5h14v5Z" />
              </svg>
              <span className="flex-1 ms-3">Pill Reminder</span>
            </a>
          </li>
          <li>
            <a
              href="#doctor-appointment-reminders"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group"
              onClick={() => setActiveComponent('doctorAppointments')}
            >
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-yellow-300"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 2v14h14V2H2Zm8 8h-2V8h2v2Z" />
              </svg>
              <span className="flex-1 ms-3">Doctor Appointment Reminders</span>
            </a>
          </li>
          <li>
            <a
              href="#exercise-tracking"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group"
              onClick={() => setActiveComponent('exerciseTracking')}
            >
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-yellow-300"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8h-2V5a1 1 0 0 0-1-1H7V3H5v1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3h2v-2h-2V8Zm-8 7V9h4v6H8Z" />
              </svg>
              <span className="flex-1 ms-3">Exercise Tracking</span>
            </a>
          </li>
          <li>
            <a
              href="#daily-health-summary"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group"
              onClick={() => setActiveComponent('dailyHealthSummary')}
            >
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-yellow-300"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8h-2V5a1 1 0 0 0-1-1H7V3H5v1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3h2v-2h-2V8Zm-8 7V9h4v6H8Z" />
              </svg>
              <span className="flex-1 ms-3">Daily Health Summary</span>
            </a>
          </li>
<<<<<<< HEAD
          <li>
            <a
              href="#progress-tracking"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group"
              onClick={() => setActiveComponent('progressTracking')}
            >
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-yellow-300"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8h-2V5a1 1 0 0 0-1-1H7V3H5v1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3h2v-2h-2V8Zm-8 7V9h4v6H8Z" />
              </svg>
              <span className="flex-1 ms-3">Progress Tracking</span>
            </a>
          </li>
           {/* Logout Button at the bottom */}
          
          <button
            className="flex items-center p-2 text-white rounded-lg hover:bg-red-600 transition-colors w-full text-left"
            onClick={() => setActiveComponent('login')}
            >
            <svg
              className="w-5 h-5 text-gray-300 group-hover:text-yellow-300"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-3a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1zM7 7a1 1 0 000 2h3a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-3">Log Out</span>
          </button>
        
       </ul>
=======
          
        </ul>
>>>>>>> d590f6e48815848a2b388cd93e4e8cf317dcd8ff
      </aside>

      {/* Main content */}
      <main className="text-black p-6 ml-72">
        {/* Render the active component */}
        {renderComponent()}
      </main>
    </div>
  );
}
