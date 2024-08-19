import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const signup = { firstName, lastName, email, number, gender, password };
  
    try {
      const response = await axios.post('http://localhost:8081/medi-app/signup', signup, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Sign Up Successful: ' + response.data.message);
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setError('Sign Up Failed: ' + (error.response?.data?.message || error.message));
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="text-white h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url('../src/Components/Assets/bg.jpg')" }}
    >
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-9 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-50 relative">
          <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="relative my-4">
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="firstName"
                className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
            </div>
            <div className="relative my-4">
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="lastName"
                className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
            </div>
            <div className="relative my-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="tel"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="number"
                className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>
            <div className="relative my-4">
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="" disabled hidden></option>
                <option className="text-black" value="male">Male</option>
                <option className="text-black" value="female">Female</option>
                <option className="text-black" value="other">Other</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Gender
              </label>
            </div>
            <div className="relative my-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="relative my-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                htmlFor="confirmPassword"
                className="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm text-white focus:outline-none"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link to="/" className="font-bold duration-300 text-white hover:text-yellow-300">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
