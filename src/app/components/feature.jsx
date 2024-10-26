import React from "react";

const Feature = (props) => {
  return (
    <section
      className="px-6 sm:px-12 py-20 bg-white"
      style={{
        // background: `${props.bg}`,
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Section - Order first on all screen sizes, stays first on small screens */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
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

          {/* Call-to-Action Button */}
          <a
            href={props.link}
            className="inline-block px-4 py-2 bg-indigo-600 text-white text-medium rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Learn More
          </a>
        </div>

        {/* Image Section - Order second on all screen sizes, moves to first on larger screens */}
        <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 order-1 lg:order-2">
          <img
            src={props.img}
            alt="feature"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Feature;
