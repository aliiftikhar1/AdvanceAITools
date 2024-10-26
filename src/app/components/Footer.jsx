import React from 'react'
import { RxGlobe } from "react-icons/rx";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdCopyright } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import  facebook from "../assets/icons/facebook.png"
import  twitter from "../assets/icons/twitter.png" 
import  pinterest from "../assets/icons/pinterest.png"
import  instagram from "../assets/icons/instagram.png"
// import { useSelector } from 'react-redux';



const Footer = () => {
  const isLang = "eng"
  
  // useSelector(
  //   (state) => state.authReducer.lang
  // );
  return (
    <>
    {
      isLang=== "eng"?    <div className='grid grid-cols-2 px-4 gap-2 md:px-10 lg:px-20 sm:grid-cols-3 md:grid-cols-5 py-16 border-t-2 border-b-2 text-black '>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] font-[700]  '>Features</p>
        <p className='text-[14px] font-[500] '>Text to Speech </p>
        <p className='text-[14px] font-[500] '>Audio Video Merge </p>
        <p className='text-[14px] font-[500] '>Video to Cartooni</p>
     
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] font-[700] '>Explore </p>
        <p className='text-[14px] font-[500] '>Text to Speech </p>
        <p className='text-[14px] font-[500] '>Create Cartooni </p>
        <p className='text-[14px] font-[500] '>Image to Cartoon </p>
        <p className='text-[14px] font-[500] '>Multi Language </p>
        <p className='text-[14px] font-[500] '>Multi Models </p>
  
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] font-[700] '>Community </p>
        <p className='text-[14px] font-[500] '>Online communities </p>
        <p className='text-[14px] font-[500] '>Creators </p>
        <p className='text-[14px] font-[500] '>Developers </p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] font-[700] '>Download</p>
        <p className='text-[14px] font-[500] '>Web Dev</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[24px] font-[700] '>Company </p>
        <p className='text-[14px] font-[500] '>About </p>
        <p className='text-[14px] font-[500] '>Trust Center </p>
        <p className='text-[14px] font-[500] '>Security </p>
        <p className='text-[14px] font-[500] '>Terms and Privacy </p>
        <p className='text-[14px] font-[500] '>Contact Sales </p>
        
      </div>
  </div>: 

<div className='grid grid-cols-2 px-4 gap-2 md:px-10 lg:px-20 sm:grid-cols-3 md:grid-cols-5 py-16 border-t-2 border-b-2 text-black ' style={{direction:"rtl"}}>
<div className='flex flex-col gap-2'>
  <p className='text-[24px] font-[700]  '>سمات</p>
  <p className='text-[14px] font-[500] '>صانع الترويج </p>
  <p className='text-[14px] font-[500] '>صانع السيرة الذاتية </p>
  <p className='text-[14px] font-[500] '>صانع السيرة الذاتية</p>
  <p className='text-[14px] font-[500] '>محرر الصور</p>
  <p className='text-[14px] font-[500] '>صانع الشعار</p>
  <p className='text-[14px] font-[500] '>محرر الفيديو</p>
</div>
<div className='flex flex-col gap-2'>
  <p className='text-[24px] font-[700] '>يستكشف </p>
  <p className='text-[14px] font-[500] '>أفكار التصميم</p>
  <p className='text-[14px] font-[500] '>مطبوعات مخصصة</p>
  <p className='text-[14px] font-[500] '>إقران الخط</p>
  <p className='text-[14px] font-[500] '>الألوان </p>
  <p className='text-[14px] font-[500] '>مدونة </p>
  <p className='text-[14px] font-[500] '>دليل القالب </p>
</div>
<div className='flex flex-col gap-2'>
  <p className='text-[24px] font-[700] '>مجتمع </p>
  <p className='text-[14px] font-[500] '>مجتمعات الانترنت </p>
  <p className='text-[14px] font-[500] '>المبدعين </p>
  <p className='text-[14px] font-[500] '>المطورين </p>
</div>
<div className='flex flex-col gap-2'>
  <p className='text-[24px] font-[700] '>تحميل</p>
  <p className='text-[14px] font-[500] '>مطور ويب</p>
</div>
<div className='flex flex-col gap-2'>
  <p className='text-[24px] font-[700] '>شركة </p>
  <p className='text-[14px] font-[500] '>عن </p>
  <p className='text-[14px] font-[500] '>مركز الثقة</p>
  <p className='text-[14px] font-[500] '>حماية </p>
  <p className='text-[14px] font-[500] '>الشروط والخصوصية </p>
  <p className='text-[14px] font-[500] '>مبيعات الاتصال</p>
  
</div>
</div>
    }
 
<div className='flex justify-around items-center flex-wrap-reverse p-8 gap-6 text-black'>
<div className='flex items-center gap-1 border-2 p-2'> 
<RxGlobe className='text-[25px]' />
<p>English (United Kingdom)</p>
<MdKeyboardArrowDown className='text-[25px]' />
</div>
<div className='text-center'>
  <div className='flex items-center gap-1'>
<MdCopyright />
<p>{isLang === "eng" ?"2024 All Rights Reserves, Rapid" :"2024 جميع الحقوق محفوظة، رابيد"}</p>
</div>
<p>{isLang ? "Privacy policy | Terms":"سياسة الخصوصية | شروط"} </p>

</div>
<div className='flex gap-[6px] w-[250px]  justify-center '>
<img src={`${facebook}`} className='h-8 w-8' alt="" />
<img src={`${twitter}`} className='h-8 w-8' alt="" />
<img src={`${pinterest}`} className='h-8 w-8' alt="" />
<img src={`${instagram}`} className='h-8 w-8' alt="" />
</div>
</div>
    </>
  )
}

export default Footer