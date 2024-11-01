import React from 'react';
// import { useLocation } from 'react-router-dom'; // React Router's hook
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md';

const Navbar = () => {
  // const location = useLocation(); // This replaces Next.js usePathname
  const currentPath =  "Admin"
  // location.pathname.split("/").pop(); // Get the current path segment

  return (
    <header className="flex items-center justify-between bg-gray-700 p-3 mb-5 h-16">
      <div className="flex items-center">
        <div className="text-white text-xl font-bold capitalize ml-5">
          {currentPath === "Submittions" ? (
            <>Submissions</>
          ) : (
            <>{currentPath}</>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Optional: You can uncomment and use the following icons as needed */}
        {/* 
        <div className="flex items-center bg-white p-1 rounded-lg h-10">
          <MdSearch className="text-black" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-black ml-2"
          />
        </div>
        <div className="relative text-white">
          <MdOutlineChat size={28} />
        </div>
        <div className="relative text-white">
          <MdNotifications size={28} />
        </div>
        <div className="relative text-white mr-4">
          <MdPublic size={28} />
        </div> 
        */}
      </div>
    </header>
  );
};

export default Navbar;
