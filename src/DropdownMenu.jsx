import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component
import Dummy from './Dummy';
import { useNavigate } from 'react-router-dom';



export default function DropdownMenu({ options, show, onClose }) {
  // const [selectedOption, setSelectedOption] = useState(null);
  const navigate=useNavigate();
  const handleOptionClick = (option) => {
    console.log(option);
    navigate(`/modal?option=${encodeURIComponent(option)}`);
  };

  if (!show) return null;

  return (
    <div className="absolute left-full text-black ml-9 mt-0 w-64 bg-gray-200 border border-gray-300 shadow-lg rounded-lg z-10">
    <button
      onClick={onClose}
      className="absolute top-0 right-0 text-black hover:text-red-600 text-3xl"
    >
      &times;
    </button>
    <div className="flex flex-col p-5">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option)}
          className="bg-orange-400 text-black py-2 px-16 rounded-lg mb-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 w-full text-left"
        >
          {option}
        </button>
      ))}
    </div>
  </div>  
  );
}






