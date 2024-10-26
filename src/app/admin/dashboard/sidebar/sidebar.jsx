import React, { useState, useEffect } from 'react';
import {
  FaSignOutAlt,
  FaChevronDown,
  FaUsers,
  FaUserShield,
  FaListAlt,
  FaBlog,
  FaGift,
  FaQuestion,
  FaComments,
  FaStar,
  FaBell,
  FaTrophy,
} from 'react-icons/fa'; // Use relevant icons for the items
// import Cookies from 'js-cookie';
// import {jwtDecode} from 'jwt-decode'; // Correctly import jwt-decode
import { useNavigate, Link } from 'react-router-dom'; // React Router for navigation and linking
// import { logoutUser } from '../../../Redux/authAction';
// import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  // const navigate = useNavigate(); // React Router hook for navigation
// const dispatch = useDispatch();
  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    // navigate('/admin'); // Navigate using React Router
  };

  useEffect(() => {
    console.log("userName has been updated:", userName);
  }, [userName]);

  // Define menu items with roles and appropriate icons
  const menuItems = [
    {
      title: "Users",
      path: "/admin/Users",
      icon: <FaUsers className="h-5 w-5" />,
      
    },
    // {
    //   title: "Admin Users",
    //   path: "/admin/AdminUser",
    //   icon: <FaUserShield className="h-5 w-5" />,
      
    // },
    {
      title: "Text to Speech Packages",
      path: "/admin/TextToSpeechPackages",
      icon: <FaListAlt className="h-5 w-5" />,
      
    },
    {
      title: "Video to Cartoon Packages",
      path: "/admin/VideoToCartoonPackages",
      icon: <FaListAlt className="h-5 w-5" />,
      
    },
    {
      title: "Subscriptions",
      path: "/admin/Subscriptions",
      icon: <FaBlog className="h-5 w-5" />,
      
    },
    
  ];

  return (
    <div className="bg-gray-700 text-white w-full min-h-screen flex flex-col">
      {/* Profile Section */}
      <div className="p-6 text-center">
        <h1 className='text-3xl font-extrabold'>
          AdvanceAiTools
        </h1>
        <h2 className="text-xl font-semibold">{userName}</h2>
        <p className="text-green-400 mt-1">● Online</p>
      </div>

      {/* Menu Section */}
      <div className="flex-1 p-4 border-t border-gray-600">
        <ul className="mt-6 space-y-3">
          {/* Dynamic Menu Items */}
          {menuItems.map(
            (item) =>
              item && (
                <li key={item.title}>
                  <a href={item.path}>
                    <button
                      className="flex items-center p-3 hover:bg-blue-700 rounded-md w-full text-left"
                      aria-label={item.title}
                    >
                      {item.icon}
                      <span className="ml-3 text-sm font-medium">
                        {item.title}
                      </span>
                    </button>
                  </a>
                </li>
              )
              // item.roles.includes(userRole) && (
              //   <li key={item.title}>
              //     <Link to={item.path}>
              //       <button
              //         className="flex items-center p-3 hover:bg-blue-700 rounded-md w-full text-left"
              //         aria-label={item.title}
              //       >
              //         {item.icon}
              //         <span className="ml-3 text-sm font-medium">
              //           {item.title}
              //         </span>
              //       </button>
              //     </Link>
              //   </li>
              // )
          )}

          {/* Logout Button */}
          <li className="mt-6">
            <button
              className="flex items-center w-full p-3 hover:bg-blue-700 rounded-md focus:outline-none text-left"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
