export default function Dashboard() {
  return (
    <div 
      className="text-white h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('../src/Components/Assets/bg.jpg')" }}

    >

        {/* Sidebar */}
        <aside id="sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-slate-700 text-white p-6 rounded-md shadow-md flex flex-col" aria-label="Sidebar">
            <button data-drawer-target="sidebar" data-drawer-toggle="sidebar" aria-controls="sidebar" type="button" className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"/>
            </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <ul className="flex flex-col space-y-4">
            <li>
                <a href="#dashboard" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <span className="ms-3">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#medication-management" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
                <span className="flex-1 ms-3">Medication Management</span>
                </a>
            </li>
            <li>
                <a href="#pill-verification" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7H2V2h14v5Zm0 9H2v-5h14v5Zm0-9H2V2h14v5Zm0 9H2v-5h14v5Z"/>
                </svg>
                <span className="flex-1 ms-3">Pill Verification</span>
                </a>
            </li>
            <li>
                <a href="#doctor-appointments" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 0a1 1 0 0 0-1 1v2h-1V1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2H3V1a1 1 0 0 0-1-1H1v16h2v-2h1v2h6v-2h1v2h2V1h-1v2h-1V1a1 1 0 0 0-1-1h-2Zm1 16v-2H7v2H6v-2H5v2H4v-2H3v2H2v2h16v-2h-1Z"/>
                </svg>
                <span className="flex-1 ms-3">Doctor Appointment Reminders</span>
                </a>
            </li>
            <li>
                <a href="#exercise-tracking" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2a8 8 0 0 0 0 16v-6a2 2 0 1 1 4 0v6a8 8 0 0 0 0-16z"/>
                </svg>
                <span className="flex-1 ms-3">Exercise Tracking</span>
                </a>
            </li>
            <li>
                <a href="#health-summary" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h12v12H4V4Zm0-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Z"/>
                </svg>
                <span className="flex-1 ms-3">Daily Health Summary</span>
                </a>
            </li>
            <li>
                <a href="#progress-tracking" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-600 transition-colors group">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h12v12H4V4Zm0-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Z"/>
                </svg>
                <span className="flex-1 ms-3">Progress Tracking</span>
                </a>
            </li>
            </ul>
        </aside>
        </div>
    
  );
}
