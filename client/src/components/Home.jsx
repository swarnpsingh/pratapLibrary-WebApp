import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import logo from '../assets/Icon.png'

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const uniqueId = uuidv4(); // Generate a unique identifier
    navigate(`/credentials/${uniqueId}`); // Navigate to the unique URL
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center gap-20 bg-gray-900">
      <div className='flex flex-col justify-center items-center'>
        <img src={logo} alt="" width="180px"/>
        <h1 className='text-4xl font-bold'>Welcome to Pratap Library</h1>
      </div>
      <div className="flex gap-8 text-xl">
        <button className="w-48 border-2 p-2 border-green-500 hover:border-green-300 rounded-md">General Information</button>
        <button className="w-48 border-2 p-2 border-green-500 hover:border-green-300 rounded-md" onClick={handleButtonClick}>Book Seat</button>
      </div>
    </div>
  );
}

export default Home;
