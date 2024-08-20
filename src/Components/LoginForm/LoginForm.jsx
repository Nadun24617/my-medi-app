import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Ensure axios is imported

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/my-medi-app/src/php/login.php', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Ensure this matches PHP expectations
        }
      });
      if (response.data.message) {
        // Redirect to the dashboard on successful login
        navigate('/dashboard');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="text-white h-[100vh] flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('../src/Components/Assets/bg.jpg')" }}
    >
      <div className="bg-slate-800 border border-slate-400 rounded-md p-9 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 relative">
        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="email"
              className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative my-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="password"
              className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm text-white focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-white">
              Are you not registered yet?{" "}
              <Link to="/signup" className="font-bold duration-300 text-white hover:text-yellow-300">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
