// Modal.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Result from './Result';
import abc from './abc2.jpg';

export default function Modal() {
 const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const option = queryParams.get('option');

  const [inputs, setInputs] = useState({
    option1: '',
    option2: '',
    preferences: ''
  });
  const [showResult, setShowResult] = useState(false);

  const handleClose = () => {
    navigate('/');
  };

  const handleGenerateResult = () => {
    setShowResult(true);
  };
const onClose=()=>{
  setShowResult(false);
  navigate('/');
}
  return (
    <>
      {showResult ? (
        <Result
          inputs={inputs}
          onClose={{
           onClose
          }}
        />
      ) : (
        <div className="fixed text-black inset-0 flex items-center justify-center z-50"
        style={{ backgroundImage: `url(${abc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="relative bg-white bg-opacity-60 border border-gray-300 shadow-lg rounded-lg p-6 w-96 max-w-lg text-black">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-black hover:text-red-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-4xl font-bold mb-4 text-center text-black">Comparison for {option}</h2>
            <div className="flex flex-col space-y-4 text-black">
              <input
                className="border bg-gray-800 text-white border-gray-300 p-2 rounded-lg w-full"
                type="text"
                placeholder={`${option} Option 1`}
                onChange={(e) => setInputs({...inputs, option1: e.target.value})}
              />
              <input
                type="text"
                placeholder={`${option} Option 2`}
                className="border bg-gray-800 text-white border-gray-300 p-2 rounded-lg w-full"
                onChange={(e) => setInputs({...inputs, option2: e.target.value})}
              />
              <input
                type="text"
                placeholder="Your Preferences"
                className="border bg-gray-800 text-white border-gray-300 p-2 rounded-lg w-full textarea-large"
                onChange={(e) => setInputs({...inputs, preferences: e.target.value})}
              />
              <button
                onClick={handleGenerateResult}
                className="bg-green-700  font-bold text-black py-2 px-4 rounded-lg hover:bg-orange-400 focus:outline-none"
              >
                Generate Result
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
