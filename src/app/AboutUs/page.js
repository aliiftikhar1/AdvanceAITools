import React from 'react';
import { FaBullseye, FaEye, FaCogs, FaLightbulb } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserLayout from '../UserLayout';

function AboutUsPage() {
  return (
    <>
      <UserLayout>
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div className="relative bg-white">
          <div className="absolute inset-0">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1581091012184-7e0cdfb52a85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Advance AI Tools"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-800 to-indigo-900 opacity-80"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-32 px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold text-white md:text-6xl">
              Advance AI Tools: Innovating the Future with AI
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About Us</h2>
              <p className="text-xl text-gray-700 leading-8 mb-6">
                Welcome to <span className="font-semibold">Advance AI Tools</span>, a cutting-edge platform designed to leverage the power of artificial intelligence for businesses, developers, and enthusiasts. We offer state-of-the-art AI-powered tools that make complex tasks easier, faster, and smarter. Whether you're looking to automate processes, enhance your creativity, or dive deep into machine learning, <span className="font-semibold">Advance AI Tools</span> is here to revolutionize how you work with technology.
              </p>
              <p className="text-xl text-gray-700 leading-8">
                Our platform offers a wide range of AI-based solutions that are intuitive, scalable, and designed for real-world applications. From text generation and image recognition to predictive analytics and natural language processing, our tools empower you to achieve more with less effort.
              </p>
            </section>

            {/* Mission and Vision */}
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Our Mission */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-700 text-white">
                    <FaBullseye className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl leading-8 font-bold text-gray-900">Our Mission</h3>
                  <p className="mt-4 text-lg text-gray-700">
                    To drive innovation by making AI tools accessible to everyone, transforming the way businesses and individuals interact with technology.
                  </p>
                </div>

                {/* Our Vision */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-700 text-white">
                    <FaEye className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl leading-8 font-bold text-gray-900">Our Vision</h3>
                  <p className="mt-4 text-lg text-gray-700">
                    To be the leading platform for AI innovation, where creativity meets advanced technology, enabling individuals and organizations to unlock new possibilities.
                  </p>
                </div>
              </div>
            </section>

            {/* Core Features Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Core Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-700 text-white">
                    <FaCogs className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl leading-8 font-bold text-gray-900">AI Automation</h3>
                  <p className="mt-4 text-lg text-gray-700">
                    Streamline workflows with AI automation tools that handle repetitive tasks, saving you time and resources.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-700 text-white">
                    <FaLightbulb className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl leading-8 font-bold text-gray-900">Innovation at Scale</h3>
                  <p className="mt-4 text-lg text-gray-700">
                    Use cutting-edge AI models to drive innovation, whether you are a solo developer or part of a large enterprise.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Us</h2>
              <p className="text-lg text-gray-700 text-center">
                At <span className="font-semibold">Advance AI Tools</span>, we’re committed to providing the best AI solutions to our users. Our platform is built with cutting-edge technology, robust security, and a seamless user experience. Whether you’re a business looking to streamline processes or an individual wanting to explore the potential of AI, our tools are designed to meet your needs.
              </p>
            </section>

            {/* Call to Action */}
            <section className="mt-16 text-center">
              <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Start Innovating with AI Today
              </h2>
              <p className="mt-4 text-xl text-gray-700 leading-8">
                Join thousands of users who are transforming their projects with AI-powered solutions.
              </p>
              <div className="mt-8">
                <a
                  href="/signup"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800"
                >
                  Get Started
                </a>
              </div>
            </section>
          </div>
        </div>

        
      </div>
      </UserLayout>
    </>
  );
}

export default AboutUsPage;
