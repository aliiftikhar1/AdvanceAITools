import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ContactUsPage() {
  return (
    <>
      <Header />

      {/* Main Container */}
      <div className="min-h-screen bg-gray-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-center py-16">
          <h1 className="text-5xl font-extrabold text-white">Get in Touch</h1>
          <p className="mt-4 text-xl text-indigo-100">
            We're here to help with all your AI needs!
          </p>
        </div>

        {/* Contact Information & Form Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-4 sm:px-6 lg:px-8">

            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-2 p-4 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 p-4 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-2 p-4 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                    placeholder="How can we assist you?"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Phone Card */}
              <div className="bg-white shadow-lg rounded-lg p-8 flex items-center">
                <FaPhoneAlt className="h-12 w-12 text-blue-600 mr-6" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Phone</h2>
                  <p className="mt-2 text-lg text-gray-700">+1 (800) 123-4567</p>
                </div>
              </div>
              
              {/* Email Card */}
              <div className="bg-white shadow-lg rounded-lg p-8 flex items-center">
                <FaEnvelope className="h-12 w-12 text-blue-600 mr-6" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Email</h2>
                  <p className="mt-2 text-lg text-gray-700">support@advanceaitools.com</p>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white shadow-lg rounded-lg p-8 flex items-center">
                <FaMapMarkerAlt className="h-12 w-12 text-blue-600 mr-6" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Address</h2>
                  <p className="mt-2 text-lg text-gray-700">456 AI Avenue, Innovation City, Techland</p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white shadow-lg rounded-lg p-8 flex items-center">
                <FaClock className="h-12 w-12 text-blue-600 mr-6" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Working Hours</h2>
                  <p className="mt-2 text-lg text-gray-700">Mon - Fri: 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default ContactUsPage;
