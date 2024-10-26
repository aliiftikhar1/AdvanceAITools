import React, { useState } from 'react';

const PricingCard = (props) => {
  const { color, hoverColor, text } = props;
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className={`relative p-10 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 bg-white border-2 ${
        isHovered ? 'border-purple-500' : 'border-transparent'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: text,
      }}
    >
      {/* Card Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-3 text-gray-900">{props.title}</h3>
        <p className="text-lg text-gray-600 mb-6">{props.desc}</p>
        <p className="text-4xl font-bold text-gray-800 mb-4">
          {`${props.price}$`}
        </p>
        {props.duration === "month"?(<>
          <p className="text-sm text-gray-500">per month</p>
        </>):(<>
          <p className="text-sm text-gray-500">per year</p>
        </>)}
      
      </div>

      {/* Feature List */}
      <ul className="text-left space-y-4 mb-8">
        <li className="flex items-center text-gray-700">
          <span className="text-green-500 mr-2">✔️</span> 6000+ Video Templates
        </li>
        <li className="flex items-center text-gray-700">
          <span className="text-green-500 mr-2">✔️</span> 3 Million+ Standard Media Library
        </li>
        <li className="flex items-center text-gray-700">
          <span className="text-green-500 mr-2">✔️</span> AI Script Generator
        </li>
        <li className="flex items-center text-gray-700">
          <span className="text-green-500 mr-2">✔️</span> Automated Text to Speech
        </li>
        <li className="flex items-center text-gray-700">
          <span className="text-green-500 mr-2">✔️</span> Collaborate with Team
        </li>
      </ul>

      {/* Button */}
      <div className="text-center">
        <button
          className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold transition-all duration-300 ease-in-out hover:from-purple-600 hover:to-pink-600"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
