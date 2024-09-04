import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Medi App</h1>
        <p className="text-lg text-gray-700 mb-6">
          Manage your healthcare tasks with ease and stay on top of your health.
        </p>
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default HomePage;
