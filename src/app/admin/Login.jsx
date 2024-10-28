import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../Redux/authAction';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate(); // React Router's navigation hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  
  const userfullname = useSelector((state) => state.authReducer.displayName);
  const useremail = useSelector((state) => state.authReducer.username);
  const userrole = useSelector((state) => state.authReducer.role);
  console.log("userfullname",userfullname,"User Email",useremail,"User role",userrole);

  const dispatch = useDispatch();

  // Redirect to admin page if already logged in as admin
  useEffect(() => {
    if (userrole && (userrole.toLowerCase() === "admin")) {
      navigate('/admin/Users');
    }
  }, [userrole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      if (email && password) {
        console.log("Logging in with", email, password);

        const logindata = new FormData();
        logindata.append('username', email);
        logindata.append('password', password);

        // API request for login
        const response = await axios.post(
          "https://aitools.pkstockhelper.info/api/login.php",
          logindata
        );
        console.log("API response:", response.data);

        // Check if login was successful
        if (response.data && response.data.data) {
          const { fullname, username, role } = response.data.data; 

          console.log("fullname", fullname, "Username", username, "Role", role);
          dispatch(loginUser({ displayName: fullname, username: username, role }));
          console.log("User logged in and details stored in Redux:", fullname, username);
          navigate('/admin/Users'); // Redirect to admin page

        } else {
          console.error("Login failed:", response.data.message);
          setStatus(response.data.message || "Login failed");
        }
      } else {
        console.error("Please enter both email and password");
        setStatus("Please enter both email and password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setStatus(error.response.data.message);
      } else {
        setStatus("An error occurred during login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-500 to-yellow-500">
      <div className="bg-gradient-to-r from-white via-gray-100 to-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-center flex-col items-center mb-6">
          <h1 className='text-5xl text-center font-bold'>Advance AI Tools</h1>
          <h2 className="text-2xl font-bold mt-4">Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {status && <p className="mb-4 text-center text-red-500">{status}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
