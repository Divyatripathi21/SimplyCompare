import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md'; // Import dropdown icon
import DropdownMenu from './DropdownMenu'; // Import DropdownMenu component
import {  useNavigate } from 'react-router-dom';
export default function Home() {
  const [activeButton, setActiveButton] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const navigate=useNavigate();
  const handleButtonClick = (button) => {
    if (activeButton === button) {
      setActiveButton(null);
      setShowDropdown(null);
    } else {
      setActiveButton(button);
      setShowDropdown(button);
    }
  };

  const options = {
    Gadgets: [
      'Phones',
      'Laptops',
      'Tablets',
      'Speakers',
      'Television',
      'Cameras',
      'Watches',
      'Headphones',
      'Graphic-Cards'
    ],
    Vehicles: [
      '4-wheelers',
      '2-wheelers',
      'Commercial'
    ],
    Cloths: [
      'T-shirts',
      'Jeans',
      'Shirts',
      'Shorts',
      'Pants',
      'Undergarments'
    ],
    'Home-Appliances': [
      'Refrigerators',
      'Washing Machines',
      'Microwaves',
      'Mixers',
      'Water Purifiers'
    ],
    'Fitness and Health': [
      'Protein Powder',
      'Treadmills',
      'Bicycles',
      'Smart Watch',
      'Running Shoes',
      'Yoga Mat'
    ],
    'Personal Care': [
      'Electric Shavers',
      'Hair Dryers',
      'Electric Toothbrushes',
      'Body Groomers',
      'Face Wash',
      'Shampoos'
    ],
    'Office Supplies': [
      'Printers',
      'Desks',
      'Chairs',
      'Monitors',
      'Office Lamps'
    ],
    Other: []
  };
  
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4" style={{ backgroundImage:`url("")`}}>
      <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg max-w-sm w-full h-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
          SimplyCompare
        </h1>
        <div className="grid grid-cols-2 gap-4 font-bold relative">
          {Object.keys(options).map((label, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(label)}
              className="relative bg-gray-300 text-gray-800 py-3 px-6 rounded-lg flex items-center justify-between hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
            >
              {label}
              <MdArrowDropDown
                className={`text-gray-600 ml-2 text-2xl transform transition-transform duration-300 ${activeButton === label ? 'rotate-180' : ''}`}
              />
              {showDropdown === label && (
                <DropdownMenu
                  options={options[label]}
                  show={showDropdown === label}
                  onClose={() => setShowDropdown(null)}
                />
              )}
              {
                showDropdown==='Other' && (

                  navigate('/modal')
                )
              }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
