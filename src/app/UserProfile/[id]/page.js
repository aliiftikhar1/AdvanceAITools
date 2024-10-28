'use client'
import { useParams } from "next/navigation";
import { useGlobalContext } from "../../Context/store";
import { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../../UserLayout";
import { FiUser, FiMail, FiCheckCircle, FiFileText } from "react-icons/fi";

export default function UserProfile() {
    const { 
        isAuthenticated, setisAuthenticated, isLang, logout, 
        setisLang, userId, setUserId, data, setData, DisplayName, 
        setDisplayName, UserName, setUserName, Role, setRole, 
        PackageId, setPackageId 
    } = useGlobalContext();

    const [useravailablecharacters, setuseravailablecharacters] = useState(3600);

    // Function to fetch subscription details based on userid (uid)
    const fetchSubscription = async () => {
        const formdata = new FormData();
        formdata.append('uid', userId);
        try {
            const response = await axios.post(
                "https://aitools.pkstockhelper.info/api/get_subscriptionbyuserid(tts).php", formdata
            );
      
            if (response.data.status === "success") {
                const characters = response.data.data[0]?.characters || 3600;
                setuseravailablecharacters(parseInt(characters, 10));
                console.log("New available characters are:", useravailablecharacters);
            } else {
                console.error("Subscription fetch failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching subscription:", error);
        }
    };
  
    useEffect(() => {
        fetchSubscription();
    }, [userId]);
  
    const params = useParams();
    const email = decodeURIComponent(params.id); // Decode the email

    return (
        <UserLayout>
            <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                    {/* Profile Picture Placeholder */}
                    <div className="flex justify-center mb-6">
                        <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiUser className="h-16 w-16 text-blue-500" />
                        </div>
                    </div>
                    
                    {/* Welcome Message */}
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
                        Welcome, {DisplayName || 'User'}
                    </h2>
                    
                    {/* Email Display */}
                    <div className="text-center mb-8">
                        <FiMail className="h-5 w-5 text-gray-500 inline-block mr-1" />
                        <span className="text-gray-600 text-sm">User Email:</span>
                        <p className="text-lg text-gray-800 font-medium">{email}</p>
                    </div>
                    
                    {/* User Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <FiCheckCircle className="h-6 w-6 text-blue-500 mr-2" />
                            <p className="text-gray-600">Username:</p>
                            <p className="ml-auto text-gray-800 font-semibold">{UserName || 'N/A'}</p>
                        </div>
                        <div className="flex items-center">
                            <FiFileText className="h-6 w-6 text-blue-500 mr-2" />
                            <p className="text-gray-600">Role:</p>
                            <p className="ml-auto text-gray-800 font-semibold">{Role || 'User'}</p>
                        </div>
                        <div className="flex items-center">
                            <FiFileText className="h-6 w-6 text-blue-500 mr-2" />
                            <p className="text-gray-600">Package ID:</p>
                            <p className="ml-auto text-gray-800 font-semibold">{PackageId || 'N/A'}</p>
                        </div>
                        <div className="flex items-center">
                            <FiFileText className="h-6 w-6 text-blue-500 mr-2" />
                            <p className="text-gray-600">Available Characters:</p>
                            <p className="ml-auto text-gray-800 font-semibold">{useravailablecharacters}</p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button 
                        onClick={logout} 
                        className="mt-8 w-full py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </UserLayout>
    );
}
