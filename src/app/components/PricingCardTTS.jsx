import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon from react-icons
import { SiTicktick } from 'react-icons/si';

const PricingCardTTS = (props) => {
  const { color, hoverColor, text } = props;
  const [isHovered, setHovered] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleGetStarted = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <div
        className={`relative w-[345px] p-10 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 bg-white border-2 flex flex-col justify-between ${
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
          {/* {props.duration === 'month' ? (
            <p className="text-sm text-gray-500">per month</p>
          ) : (
            <p className="text-sm text-gray-500">per year</p>
          )} */}
        </div>

        {/* Feature List */}
        <ul className="text-left space-y-4 mb-8">
          <li className="flex items-center text-gray-700">
          <span className="text-black mr-2"><SiTicktick/> </span> Total Characters: {props.characters}
          </li>
          <li className="flex items-center text-gray-700">
          <span className="text-black mr-2"><SiTicktick/> </span> Time: {props.time}
          </li>
        </ul>

        <div className="text-gray-700 mb-8 px-4" dangerouslySetInnerHTML={{ __html: props.features }}></div>

        {/* Button - Placed at the bottom */}
        <div className="mt-auto text-center">
          <button
            onClick={handleGetStarted}
            className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold transition-all duration-300 ease-in-out hover:from-purple-600 hover:to-pink-600"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Modern Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl relative flex flex-col">
            {/* Close Button (Cross Icon) */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
            >
              <AiOutlineClose className="h-6 w-6" /> {/* Using react-icons */}
            </button>

            {/* Popup Content */}
            <div className="flex w-full">
              {/* Image on the left side */}
              <div className="w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-l-lg overflow-hidden">
                <img
                  src='/material/payment1.jpg'
                  alt="Package Image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Package Details on the right */}
              <div className="w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{props.title}</h3>
                  <p className="mb-4">{props.desc}</p>
                  <ul className="mb-6 space-y-2">
                    <li className="text-gray-700">Total Characters: {props.characters}</li>
                    <li className="text-gray-700">Time: {props.time}</li>
                  </ul>
                  <p className="text-4xl font-bold text-gray-800 mb-6">
                    {`${props.price}$`}
                  </p>
                </div>

                {/* Conditionally render Pay Now button only if price > 0 */}
                {props.price > 0 ? (
                  <div className="w-full">
                    <button
                      className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold transition-all duration-300 ease-in-out hover:from-purple-600 hover:to-pink-600"
                    >
                      Pay Now
                    </button>
                  </div>
                ) : (
                  <p className="text-lg text-gray-500">Free Plan - No Payment Required</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingCardTTS;
