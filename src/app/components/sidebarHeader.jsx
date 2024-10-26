import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/resume/logo.png";
import { useMediaQuery } from "react-responsive";


const sidebarHeader = () => {

    // // const isMobile = useMediaQuery({
    // //     query: "(max-width: 600px)",
    // //   });
    
    // // const [state, setState] = useState(false)
    // return (
    //     <div>

    //         <div className='h-20  shadow-md flex items-center px-10  w-full bg-white text-black' style={{ zIndex: "999" }} >
    //             <div className='flex justify-between w-full items-center'>
    //                 <div className='flex gap-6 items-center'>
    //             <RxHamburgerMenu onClick={() => setState(true)} className='text-[32px] ' />
               
               
    //             <img src={`${logo}`} className="cursor-pointer w-[180px] h-[50px] bg-black" />

    //             </div>
    //             <div className='flex gap-6'>
    //                 <NavLink to="/" className={`hover:no-underline ${ isMobile ? "hidden" :"block"} `} >
    //                     <div className='bg-[#FF5454]  rounded-md w-[100px]
    //                     text-center   transition-all hover:shadow-md  '>
    //                         <p className='font-[700] text-[14px] font-serif py-2 text-white '>Sign up</p>
    //                     </div>
    //                 </NavLink>
    //                 <NavLink to="/" className="hover:no-underline">
    //                     <div className='bg-[#f0efef] rounded-md w-[100px]  text-center   transition-all hover:shadow-md  '>
    //                         <p className='font-[700] text-[14px] font-serif py-2 text-[#323232]  '>Log In</p>
    //                     </div>
    //                 </NavLink>

    //             </div>
    //             </div>
    //         </div>

    //         <div className='h-full w-[calc(100%-75px)]'>
    //             <div className={`top-0 ${state === false ? " -left-[320px]" : " left-[0px] "} bg-[#ffffff] h-full fixed transition-all w-[320px] z-30 duration-700 shadow-lg`}>


    //                 <div onClick={() => setState(false)} className='flex absolute justify-center items-center bg-[#ffffff] w-[20px] -right-2 text-[#252627]  top-[40%] cursor-pointer h-[100px] rounded-full '> <MdKeyboardArrowLeft className='text-[32px]' /> </div>


    //                 <div className="flex flex-col justify-between  h-full py-6">
    //                     <div className='flex flex-col gap-1'>

    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='   hover:bg-[#f0efef70]'>
    //                                 <p className='font-[500] text-[17px] font-serif py-2 text-[#323232] pl-4'>Home</p>
    //                             </div>
    //                         </NavLink>
    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='   hover:bg-[#f0efef70]'>
    //                                 <p className='font-[500] text-[17px] font-serif py-2 text-[#323232] pl-4'>Promotion Maker</p>
    //                             </div>
    //                         </NavLink>
    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='   hover:bg-[#f0efef70]'>
    //                                 <p className='font-[500] text-[17px] font-serif py-2 text-[#323232] pl-4'>CV Maker</p>
    //                             </div>
    //                         </NavLink>
    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='   hover:bg-[#f0efef70]'>
    //                                 <p className='font-[500] text-[17px] font-serif py-2 text-[#323232] pl-4'>Cover Letter & other</p>
    //                             </div>
    //                         </NavLink>
    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='   hover:bg-[#f0efef70]'>
    //                                 <p className='font-[500] text-[17px] font-serif py-2 text-[#323232] pl-4'>About Us</p>
    //                             </div>
    //                         </NavLink>
    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='   hover:bg-[#f0efef70]'>
    //                                 <p className='font-[500] text-[17px] font-serif py-2 text-[#323232] pl-4'>Pricing</p>
    //                             </div>
    //                         </NavLink>
    //                     </div>
    //                     <div>
    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='bg-[#FF5454] mb-6 rounded-md w-[90%] m-auto text-center   transition-all hover:shadow-md  '>
    //                                 <p className='font-[700] text-[17px] font-serif py-2 text-white '>Sign up</p>
    //                             </div>
    //                         </NavLink>
    //                         <NavLink to="/" className="hover:no-underline">
    //                             <div className='bg-[#f0efef] rounded-md w-[90%] m-auto text-center   transition-all hover:shadow-md  '>
    //                                 <p className='font-[700] text-[17px] font-serif py-2 text-[#323232] '>Log In</p>
    //                             </div>
    //                         </NavLink>
    //                     </div>






    //                 </div>







    //             </div>


    //         </div>
    //     </div>
    // )

     return (
        <>
        </>
     )
}

export default sidebarHeader