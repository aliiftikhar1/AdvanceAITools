import React, { useState, useEffect } from "react";
import axios from "axios";

const Section = ({ text, setText, convertTextToSpeech, availableCharacters, uid, setnewtotalcharacters }) => {

  // Handle text change and update parent state for total characters
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText); // Update the text in the parent state
    setnewtotalcharacters(newText.length); // Send the new character length to the parent
  };

  return (
    <div className="px-8 bg-white/80 pt-6 rounded-3xl w-full mx-auto backdrop-filter backdrop-blur-md">
      <textarea
        className="text-area w-full h-32 p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-all duration-300"
        value={text}
        placeholder="Write your text to be converted. After that click the play button below to play."
        onChange={handleTextChange}
        maxLength={availableCharacters} // Limit based on available characters
      ></textarea>

      {/* Display character count and available characters below the textarea */}
      <div className="text-right mt-2 text-gray-500 font-medium">
        {availableCharacters && availableCharacters > 3600 ? (
          <>
            {text.length} / {availableCharacters} characters available
          </>
        ) : (
          <>
            {text.length} / 3600 characters available
          </>
        )}
      </div>

    </div>
  );
};

export default Section;
