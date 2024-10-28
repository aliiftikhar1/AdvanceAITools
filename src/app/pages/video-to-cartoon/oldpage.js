// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../../components/Header';
// import sidebarHeader from '../../components/sidebarHeader';
// import { useMediaQuery } from 'react-responsive';
// import Footer from '../../components/Footer';
// import UserLayout from '../../UserLayout';
// import { useGlobalContext } from '../../Context/store';

// export default function VideoToCartoon() {
//   const { isAuthenticated, setisAuthenticated, logout, userId, setUserId, data, setData, DisplayName, setDisplayName, UserName, setUserName, Role, setRole, PackageId, setPackageId } = useGlobalContext();

//   const [menu, setMenu] = useState("");
//   const [pack, setPack] = useState(false);

//   const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1150px)' });
 
//   const handleMouseOver = (type) => {
//     setMenu(type);
//   };
 

//   const [videoFile, setVideoFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);
//   const [showVideos, setShowVideos] = useState(false);

//   const handleFileChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const generateCartoonVideo = async () => {
//     if (!videoFile) {
//       alert('Please select a video file to convert.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('inputVideo', videoFile);
//     setLoading(true);

//     try {
//       const response = await axios.post('/api/video-to-cartoon', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.status === 200 && response.data.videoUrl) {
//         setGeneratedVideoUrl(`${response.data.videoUrl}?t=${new Date().getTime()}`);
//         setShowVideos(true);
//       }
//     } catch (error) {
//       console.error('Error generating cartoon video:', error);
//       alert('Error generating cartoon video');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [uservideocount, setuservideocount]=useState(0);
//   const [videolength, setvideolength] = useState(0);
//   const fetchSubscription = async () => {
//     const formdata = new FormData();
//     formdata.append('uid', userId);
//     try {
//       const response = await axios.post(
//         "https://aitools.pkstockhelper.info/api/get_subscriptionbyuserid(vtc).php", formdata
//       );

//       if (response.data.status === "success") {
//         const count = response.data.data[0]?.Credits ;
//         const length = response.data.data[0]?.Length;
//         setuservideocount(parseInt(count, 10)); 
//         setvideolength(parseInt(length,10));
//         console.log("User Video counts are : ", uservideocount);
//         console.log("User Video Length counts are : ", videolength);
//       } else {
//         console.error("Subscription fetch failed:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching subscription:", error);
//     }
//   };

//   // Call the API when the component is mounted
//   useEffect(() => {
//     fetchSubscription();
//   }, [userId]);

//   const handlevideocount = async ()=>{
//     const newcredits = uservideocount - 1;
//     const updateFormData = new FormData();
//           updateFormData.append('userid', userId);
//           updateFormData.append('Credits', newcredits); // Send the number of used characters

//           const response = await axios.post(
//             "https://aitools.pkstockhelper.info/api/updatesubscriptionsbyuserid(vtc).php",
//             updateFormData
//           );

//           if (response.data.status === "success") {
//             const newcount = uservideocount - 1;
//             setuservideocount(newcount);  // Update the available characters in the UI
//             console.log("Characters updated successfully");
//           }
//   }

//   return (
//     <>
//       <UserLayout>
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-10 flex flex-col items-center">
//       {!showVideos && (
//         <>
//           <h1 className="text-4xl font-bold text-white mb-4">Video to Cartoon Generator</h1>
//           <h1 className="text-2xl font-bold text-white mb-4">Your Remaining Credits: {uservideocount} </h1>
          
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//             <label className="block text-lg font-medium mb-2 text-gray-700" htmlFor="video-upload">
//               Upload Your Video
//             </label>
//             <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex items-center justify-center mb-4" style={{ height: '200px' }}>
//               <input id="video-upload" type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
//               <label htmlFor="video-upload" className="text-gray-500 cursor-pointer">
//                 {videoFile ? videoFile.name : 'Click to upload or drag and drop'}
//               </label>
//             </div>
//             <button
//               onClick={generateCartoonVideo}
//               disabled={loading}
//               className={`w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               {loading ? 'Processing...' : 'Generate Cartoon Video'}
//             </button>
//           </div>
//         </>
//       )}

//       {showVideos && (
//         <div className="flex justify-center gap-10 mt-10 w-full">
//           <div className="w-1/2">
//             <h2 className="text-white text-xl font-semibold mb-4">Input Video</h2>
//             <video controls width="100%" className="border-2 border-gray-300 rounded-lg shadow-lg mb-4">
//               <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
//             </video>
//           </div>
//           <div className="w-1/2">
//             <h2 className="text-white text-xl font-semibold mb-4">Cartoon Output Video</h2>
//             <video controls width="100%" className="border-2 border-gray-300 rounded-lg shadow-lg mb-4" key={generatedVideoUrl}>
//               <source src={generatedVideoUrl} type="video/mp4" />
//             </video>
//             <a href={generatedVideoUrl} onClick={handlevideocount} download="cartoon_output.mp4" className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition">
//               Download Video
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//     </UserLayout>
//     </>
//   );
// }
