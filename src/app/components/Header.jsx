'use client'
import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/resume/logo.png";
import { NavLink } from "react-router-dom";
import "./Styles.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import { useSelector, useDispatch } from "react-redux";
// import { loginUser, logoutUser, language } from "../Redux/authAction";
import { useGlobalContext } from "../Context/store";
import Avatar from "../components/avatar";
import axios from "axios";
import "./styless.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(750px,100%,300px)",
  height: "600px",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

const CategoryList = ({ categories, onCategoryClick }) => {
  const mainCategories = categories.slice(0, 3);
  const dropdownCategories = categories.slice(3);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleMenuItemClick = (category) => {
    onCategoryClick(category);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex gap-1 items-center cursor-pointer hover:no-underline">
      {dropdownCategories.length > 0 && (
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            className="text-[#2e2d2d] font-[500] text-[14px] pl-3 cursor-pointer focus:outline-none"
            onClick={handleDropdownClick}
          >
            Shop Now
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 space-y-2 bg-white border rounded-md shadow-lg w-[200px]">
              {dropdownCategories.map((category, index) => (
                <NavLink
                  to={`/category/${category}`}
                  className="hover:no-underline"
                  key={index}
                >
                  <p
                    onClick={() => handleMenuItemClick(category)}
                    className="block px-4 py-2 text-[#2e2d2d] font-[500] text-[14px] cursor-pointer"
                  >
                    {category}
                  </p>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  // //const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // Added username state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [google, setGoogle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setmessage] = useState('')
  const { isAuthenticated, setisAuthenticated, isLang, logout, setisLang, userId, setUserId, data, setData, DisplayName, setDisplayName, UserName, setUserName, Role, setRole, PackageId, setPackageId } = useGlobalContext();

  // useEffect(()=>{
  //   setUserId("54");
  //   setData([
  //     {firstName: "Ali Iftikhar"},
  //     {firstName: "Jawad Haider"}
  //   ]);
  //   setUserName("aj829077@gmail.com");
  //   setDisplayName("Ali Gondal");
  //   setRole("Admin");
  //   setPackageId("1");

  // },[])

  console.log("User id is : ", userId, " And the data is : ", data[0]);
  console.log("------------------------");
  console.log("User email is : ", UserName, "Display Name is ", DisplayName, "User Role is : ", Role, "Package id is : ", PackageId);

  console.log("authentication status is : ", isAuthenticated);
  // useSelector((state) => state.authReducer.lang);
  console.log("isAuthenticated ", isAuthenticated);
  const userfullname = "ALi Jan"
  // useSelector((state) => state.authReducer.displayName);
  const useremail = "aj829077@gmail.com"
  //  useSelector((state) => state.authReducer.username);
  const userrole = "admin"
  //  useSelector((state) => state.authReducer.role);

  useEffect(() => {
    if (userrole === "Admin" || userrole === "admin") {
      // navigate("/admin");
    }
    if (isAuthenticated === "true" || isAuthenticated === "false") {
      setIsLoading(false);
    }
    else {
      setIsLoading(true);
    }
  }, [userrole]); // Dependencies on userrole and navigate


  // console.log("user data fetched from redux is given as follow: ", userfullname, useremail);
  const handleOpen = () => {
    setOpenModel(false);
    setOpen(true);
    setmessage('');
  };
  const handelOpenModel = () => {
    setOpenModel(true);
    setOpen(false);
    setmessage('');
  };
  const handleClose = () => setOpen(false);
  const handleCloseModel = () => setOpenModel(false);

  const handleSignup = async () => {
    try {

      if (name && email && password) {
        console.log("Starting signup process...");

        const role = "user";
        const signupdata = new FormData();
        signupdata.append('fullname', name);
        signupdata.append('username', email);
        signupdata.append('password', password);
        signupdata.append('role', role);

        console.log("Signup data prepared:", {
          fullname: name,
          username: email,
          role: role
        });

        // API request to sign up the user
        console.log("Sending signup request...");
        const response = await axios.post(
          "https://aitools.pkstockhelper.info/api/signup.php",
          signupdata
        );

        console.log("Signup API response:", response.data);

        // Check if signup was successful
        if (response) {
          console.log("Signup successful, preparing to send verification email...");
          setmessage("User Created!")
          // Prepare email data for sending verification email
          const emailData = new FormData();
          emailData.append('to', email); // Send email to the new user
          emailData.append('subject', 'Verify your email');

          // Construct the verification URL and email HTML content
          const verificationUrl = `https://aitools.pkstockhelper.info/api/developeremailverification.php?email=${email}`;
          const message = `
            <h1>Email Verification</h1>
            <p>Please verify your email by clicking the button below:</p>
            <a href="${verificationUrl}" style="padding:10px 20px; background-color:blue; color:white; text-decoration:none;">Verify Email</a>
          `;

          emailData.append('message', message);
          console.log("Verification email data prepared:", {
            to: email,
            subject: 'Verify your email',
            message: message
          });

          // Send the verification email
          console.log("Sending verification email...");
          const emailResponse = await axios.post(
            "https://aitools.pkstockhelper.info/api/desingersendemail.php",
            emailData
          );

          console.log("Verification email API response:", emailResponse.data);

          setmessage(emailResponse.data.message);
          // Close the modal on successful signup and email sending
          handleCloseModel();
          console.log("Signup process completed and modal closed.");

        } else {
          console.error("Signup failed:", response.data.message);
          setmessage(response.data.message);
        }
      } else {
        console.error("Please fill all the fields");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setmessage(error.message);
    }
  };

  useEffect(() => {
    // Function to delete files
    const deleteFiles = async () => {
      try {
        const response = await axios.post('/api/deletevideocartoonfiles');
        console.log(response.data); // Files deleted successfully
      } catch (error) {
        console.error('Error deleting files:', error);
      }
    };

    deleteFiles();
  }, []);

  const handleLogin = async () => {
    try {
      if (logEmail && logPassword) {
        console.log("Logging in with", logEmail, logPassword);

        const logindata = new FormData();
        logindata.append('username', logEmail);
        logindata.append('password', logPassword);

        // API request for login
        const response = await axios.post(
          "https://aitools.pkstockhelper.info/api/login.php",
          logindata
        );
        const loginfetcheddata = response.data.data;
        console.log("Login fetchd data is ", loginfetcheddata);


        if (response) {
          setmessage(response.data.message);
          const { id,fullname, username, role } = response.data.data;

          console.log("id",id,"fullname", fullname, "Username", username, "Role", role);
          setUserId(id);
          setDisplayName(fullname);
          setUserName(username);
          setRole(role);
          // setisAuthenticated(`true`);
          // dispatch(loginUser({ displayName: fullname, username: username, role }));
          console.log("User logged in and details stored in Redux:", fullname, username);
          handleClose();
          handleCloseModel();

        } else {
          console.error("Login failed:", response.data.message);
          setmessage(response.data.message);
        }
      } else {
        console.error("Please enter both email and password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <>
        <div className="flex items-center gap-4 justify-between px-8 py-4 shadow-md h-20 z-50 w-full bg-gradient-to-r from-white via-white to-indigo-400">
          <div className="flex items-center text-[16px] w-full">
            <img
              src="/assets/resume/logo.png"
              className="cursor-pointer w-[160px] h-[50px] transition-transform transform hover:scale-110 duration-300 ease-in-out"
              alt="Logo"
            />

<div className="flex justify-between w-full ">
            <a
              href="/"
              className="text-black font-semibold  hover:text-blue-800 transition-colors duration-200 ease-in-out hover:underline"
            >
              Home
            </a>

            <a
              href="/"
              className="text-black font-semibold  hover:text-blue-800 transition-colors duration-200 ease-in-out hover:underline"
            >
              Text to Speech
            </a>

            <a
              href="/pages/news-anchor"
              className="text-black font-semibold  hover:text-blue-800 transition-colors duration-200 ease-in-out hover:underline"
            >
              Text to News Presentation
            </a>

            <a
              href="/pages/video-to-cartoon"
              className="text-black font-semibold  hover:text-blue-800 transition-colors duration-200 ease-in-out hover:underline"
            >
              Video to Cartoon
            </a>

            <a
              href="/Price"
              className="text-black font-semibold  hover:text-blue-800 transition-colors duration-200 ease-in-out hover:underline"
            >
              Pricing
            </a>

            <a
              href="/AboutUs"
              className="text-black font-semibold  hover:text-blue-800 transition-colors duration-200 ease-in-out hover:underline"
            >
              About Us
            </a>

            <a
              href="/ContactUs"
              className="text-black font-semibold  hover:text-blue-800 transition-colors duration-200 ease-in-out hover:underline"
            >
              Contact Us
            </a>
            </div>
          </div>

          <div style={{ flexGrow: 1 }}></div>

          <div className="flex items-center gap-4 text-white text-[16px] w-60">
            {isLoading ? (
              <CircularProgress size={24} color="inherit" /> // Show loading spinner while fetching auth status
            ) : (
              <>
                {isAuthenticated === "true" ? (
                  <Avatar />
                ) : (
                  <>
                    <button
                      onClick={handleOpen}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-[14px] px-5 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handelOpenModel}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-[14px] px-5 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal"
        aria-describedby="login-form"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex h-full">
            <div className="w-[40%] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-10 flex flex-col justify-between text-white">
              <div>
                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-lg opacity-80">
                  We're so excited to see you again!
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80">Don't have an account?</p>
                <button
                  onClick={handelOpenModel}
                  className="mt-2 px-6 py-2 bg-white text-purple-600 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
            <div className="w-[60%] p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Login to Your Account
              </h3>
              <p className="font-semibold mb-6 text-red-500 text-lg">{message}</p>
              <form className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    value={logEmail}
                    onChange={(e) => setLogEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={logPassword}
                    onChange={(e) => setLogPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  {/* <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-purple-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label> */}
                  <a
                    href="/Forgetpassword"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={handleLogin}
                  type="button"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openModel}
        onClose={handleCloseModel}
        aria-labelledby="signup-modal"
        aria-describedby="signup-form"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex h-full">
            <div className="w-[40%] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-10 flex flex-col justify-between text-white">
              <div>
                <h2 className="text-4xl font-bold mb-4">Join Us!</h2>
                <p className="text-lg opacity-80">
                  Start your journey with us today.
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80">Already have an account?</p>
                <button
                  onClick={handleOpen}
                  className="mt-2 px-6 py-2 bg-white text-purple-600 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all"
                >
                  Log In
                </button>
              </div>
            </div>
            <div className="w-[60%] p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Create Your Account
              </h3>
              <form className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 10a2 2 0 012-2h2a2 2 0 012 2v1h4v-1a2 2 0 012-2h2a2 2 0 012 2v1h-2v2h2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1H8v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1h2v-2H2v-1z" />
                  </svg>
                </div> */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {/* <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-purple-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the Terms and Privacy Policy
                  </span>
                </div> */}
                <button
                  onClick={handleSignup}
                  type="button"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
