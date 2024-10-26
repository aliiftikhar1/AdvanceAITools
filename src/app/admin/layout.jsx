'use client'
// import { useNavigate } from 'react-router-dom'; // React Router hook
// import Cookies from 'js-cookie';
import Navbar from './dashboard/navbar/navbar';
import Sidebar from './dashboard/sidebar/sidebar';
import Footer from './dashboard/footer/footer';
import { ToastContainer } from 'react-toastify';
// import { useSelector } from 'react-redux';

const AdminLayout = ({ children }) => {
  // const navigate = useNavigate();
  // const userfullname = useSelector((state) => state.authReducer.displayName);
  // const useremail = useSelector((state) => state.authReducer.username);
  // const userrole = useSelector((state) => state.authReducer.role);


  // useEffect(() => {
  //   if (!userrole || userrole === "Customer"){
  //     // navigate('/adminlogin');
  //     console.log("User role is : ",userrole);

  //   }
  // }, [navigate]);

 
  return (
    <div className="flex w-full min-h-screen bg-white">
      <div className="flex w-[350px]">
        <ToastContainer />
        <Sidebar />
      </div>
      <div className="flex flex-col w-full flex-grow">
        <Navbar />
        <div className="flex-grow p-4">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
