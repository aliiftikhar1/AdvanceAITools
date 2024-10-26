'use client'
import { useEffect } from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import Header from '../components/Header';
import SidebarHeader from '../components/sidebarHeader';
import PricingCardVTC from '../components/PricingCardVTC';
import PricingCardTTS from '../components/PricingCardTTS';
import Faq from "../components/Faq";
import Footer from '../components/Footer';
import pricing from "../assets/home/pricing.jpg";
import '../components/styless.css';
import UserLayout from '../UserLayout';

const Price = () => {
  const [menu, setMenu] = useState("");
  const [pack, setPack] = useState(false); // pack: false -> Text to Speech, true -> Video to Cartoon

  const [ttsPackages, setTtsPackages] = useState([]); // Text-to-Speech packages
  const [vtcPackages, setVtcPackages] = useState([]); // Video-to-Cartoon packages
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [error, setError] = useState(null);

  // Fetch text-to-speech packages
  const fetchTtsPackages = async () => {
    try {
      const response = await axios.get("https://advanceaitool.com/api/get_packages(tts).php");
      setTtsPackages(response.data);
      setLoadingPackages(false);
    } catch (err) {
      console.error("Error fetching text-to-speech packages:", err);
      setError("Failed to load text-to-speech packages.");
      setLoadingPackages(false);
    }
  };

  // Fetch video-to-cartoon packages
  const fetchVtcPackages = async () => {
    try {
      const response = await axios.get("https://advanceaitool.com/api/get_packages(vtc).php");
      setVtcPackages(response.data);
      setLoadingPackages(false);
    } catch (err) {
      console.error("Error fetching video-to-cartoon packages:", err);
      setError("Failed to load video-to-cartoon packages.");
      setLoadingPackages(false);
    }
  };

  useEffect(() => {
    fetchTtsPackages(); // Load text-to-speech packages initially
  }, []);

  useEffect(() => {
    if (pack) {
      fetchVtcPackages(); // Load video-to-cartoon packages when toggled
    }
  }, [pack]);

  const handleMouseOver = (type) => {
    setMenu(type);
  };

  return (
    <>
      <UserLayout>
        <div onMouseOver={() => handleMouseOver("")} className='text-black bg-gray-50'>
          
          {/* Hero Section */}
          <section className='py-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white'>
            <div className='max-w-7xl mx-auto px-6'>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left Content */}
                <div className='lg:w-1/2 space-y-6'>
                  <h2 className='font-bold text-4xl'>Why Upgrade to AI Advance Tools?</h2>
                  <p className='text-lg'>
                    Unlock all the tools you need to build amazing content quickly and easily with our Pro features.
                  </p>
                  <ul className='list-disc pl-5 text-base'>
                    <li>Remove photo and video backgrounds in one click</li>
                    <li>Access to unlimited stock photos, templates, and videos</li>
                    <li>Fix images fast with the Magic Eraser tool</li>
                  </ul>
                </div>
                {/* Right Image */}
                <div className='lg:w-1/2'>
                  <img src="/assets/home/pricing.jpg" alt="Pricing Benefits" className='rounded-xl shadow-xl' />
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className='py-20 bg-white'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-bold text-gray-800 mb-4'>What’s Included with Pro?</h2>
              <p className='text-lg text-gray-600 mb-4'>
                Manage your brand, streamline your workflow, and boost productivity with our Pro plans.
              </p>
              <p className='text-sm font-semibold mb-8'>
                Billing: <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>Save up to 25%</span> with Yearly Plan.
              </p>
            </div>

            {/* Monthly/Yearly Toggle */}
            <div className='flex justify-center mb-12'>
              <div className='flex items-center bg-gray-200 rounded-lg overflow-hidden shadow-lg'>
                <button
                  onClick={() => setPack(false)} // Switch to Text to Speech packages
                  className={`w-[200px] py-3 t px-3 text-lg font-semibold transition-all ${!pack ? 'bg-purple-600 text-white' : 'text-gray-700'}`}
                >
                  Text to Speech
                </button>
                <button
                  onClick={() => setPack(true)} // Switch to Video to Cartoon packages
                  className={`w-[200px] px-3 py-3 text-lg font-semibold transition-all ${pack ? 'bg-purple-600 text-white' : 'text-gray-700'}`}
                >
                  Video To Cartoon
                </button>
              </div>
            </div>

            {/* Display Pricing Cards */}
            <div className="flex justify-center gap-[15px] flex-wrap border-[rgba(57,76,96,.15)]">
              {pack === false ? (
                <>
                  {loadingPackages ? (
                    <>Loading text-to-speech packages...</>
                  ) : (
                    <>
                      {ttsPackages.map((pkg, index) => (
                        <PricingCardTTS
                          key={index}
                          color={"HSLA(0,100%,66%,1)"}
                          hoverColor={"#fc4444"}
                          text={"white"}
                          title={pkg.PackageName}
                          desc={pkg.Description}
                          price={pkg.Price} 
                          characters = {pkg.Characters}
                          features = {pkg.Features}
                          time = {pkg.Time}
                        />
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {loadingPackages ? (
                    <>Loading video-to-cartoon packages...</>
                  ) : (
                    <>
                      {vtcPackages.map((pkg, index) => (
                        <PricingCardVTC
                          key={index}
                          color={"HSLA(0,100%,66%,1)"}
                          hoverColor={"#fc4444"}
                          text={"white"}
                          title={pkg.PackageName}
                          desc={pkg.Description}
                          price={pkg.Price}  
                          credits={pkg.Credits}
                          length={pkg.Length}
                          features={pkg.Features}
                      
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          <section className=' bg-gray-100'>
            <div className=''>
              <Faq />
            </div>
          </section>
        </div>
      </UserLayout>
    </>
  );
};

export default Price;
