// "use client";
// import { useState } from 'react';
// import axios from 'axios';

// export default function VideoToCartoon() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);
//   const [showVideos, setShowVideos] = useState(false);  // To control whether to show videos

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
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200 && response.data.videoUrl) {
//         // Set the generated video URL from the response
//         setGeneratedVideoUrl(`${response.data.videoUrl}?t=${new Date().getTime()}`);
//         setShowVideos(true);  // Show the input and output videos
//       }
//     } catch (error) {
//       console.error('Error generating cartoon video:', error);
//       alert('Error generating cartoon video');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-10 flex flex-col items-center">
//       {/* Remove this section after video is generated */}
//       {!showVideos && (
//         <>
//           <h1 className="w-full text-4xl font-bold text-center text-white mb-4">
//             Video to Cartoon Generator
//           </h1>

//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//             {/* File Upload Section */}
//             <label
//               className="block mb-2 text-lg font-medium text-gray-700"
//               htmlFor="video-upload"
//             >
//               Upload Your Video
//             </label>
//             <div
//               className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex items-center justify-center mb-4"
//               style={{ height: '200px' }}
//             >
//               <input
//                 id="video-upload"
//                 type="file"
//                 accept="video/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <label
//                 htmlFor="video-upload"
//                 className="text-gray-500 cursor-pointer"
//               >
//                 {videoFile ? videoFile.name : 'Click to upload or drag and drop'}
//               </label>
//             </div>

//             {/* Generate Button */}
//             <button
//               onClick={generateCartoonVideo}
//               disabled={loading}
//               className={`w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition mb-4 ${
//                 loading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? 'Processing...' : 'Generate Cartoon Video'}
//             </button>

//             {/* Modal with Loading Animation */}
//             {loading && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-12 w-[400px] h-[400px] rounded-lg shadow-lg flex flex-col items-center justify-center">
//                   {/* Cube Animation */}
//                   <div className="cssload-thecube">
//                     <div className="cssload-cube cssload-c1"></div>
//                     <div className="cssload-cube cssload-c2"></div>
//                     <div className="cssload-cube cssload-c4"></div>
//                     <div className="cssload-cube cssload-c3"></div>
//                   </div>
//                   <p className="text-gray-900 mt-4 text-xl font-bold">Generating Video...</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Show videos side by side after generation */}
//       {showVideos && (
//         <div className="w-full flex justify-center gap-10 mt-10">
//           {/* Input Video on the left */}
//           <div className="w-1/2">
//             <h2 className="text-xl font-semibold mb-4 text-white">Input Video</h2>
//             <video
//               controls
//               width="100%"
//               className="border-2 border-gray-300 rounded-lg shadow-lg mb-4"
//             >
//               <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           {/* Output Cartoon Video on the right */}
//           <div className="w-1/2">
//             <h2 className="text-xl font-semibold mb-4 text-white">Cartoon Output Video</h2>
//             <video
//               key={generatedVideoUrl}
//               controls
//               width="100%"
//               className="border-2 border-gray-300 rounded-lg shadow-lg mb-4"
//             >
//               <source src={generatedVideoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <a
//               href={generatedVideoUrl}
//               download="cartoon_output.mp4"
//               className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               Download Video
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
