import React from "react";
import markersection from "../assets/home/img5.jpg";

const FeatureTwo = (props) => {
  return (
    <section
      // style={{ background: `${props.bg}` }}
      className="px-6 sm:px-12 py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image Section - Always on the left */}
        <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 order-1">
          <img
            src={props.img}
            alt="feature"
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* Text Section */}
        <div className="text-center lg:text-left order-2">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            {props.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            {props.description}
          </p>
          {props.des2 && (
            <p className="text-lg text-gray-600 mb-4">{props.des2}</p>
          )}
          {props.des3 && (
            <p className="text-lg text-gray-600 mb-6">{props.des3}</p>
          )}

          {/* Call to Action Button (optional) */}
          {props.link && (
            <a
            href={props.link}
            className="inline-block px-4 py-2 bg-indigo-600 text-white text-medium rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Learn More
          </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureTwo;
