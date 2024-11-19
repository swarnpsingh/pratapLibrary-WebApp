import React from "react";
import { useNavigate } from "react-router-dom"; // To navigate to a new page
import { v4 as uuidv4 } from "uuid"; // To add random characters in the url
import { useState } from "react";

function Credentials() {
  const navigate = useNavigate();

  // Handling the state of the variables
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");

  function handleButtonClick(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const userData = { // Saving the states in a single-variable
      name,
      address,
      phone,
      aadhar,
    };

    const uniqueId = uuidv4(); // Generate a unique identifier
    navigate(`/seats/${uniqueId}`, { state: { userData } }); // Pass user data to Seat Selection page
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-md shadow-lg w-3/5">
        <h2 className="text-2xl font-bold mb-4">Enter Credentials</h2>
        <hr className="mb-4 border-gray-600" />
        <form className="space-y-4">
          <div>
            <label className="block text-lg mb-1" htmlFor="fullName">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg mb-1" htmlFor="address">
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg mb-1" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
              required
              maxLength={10}
            />
          </div>
          <div>
            <label className="block text-lg mb-1" htmlFor="aadharNumber">
              Aadhar Card No.:
            </label>
            <input
              type="text"
              id="aadharNumber"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md mb-3"
              required
              maxLength={12}
            />
          </div>
          <button
            type="submit"
            onClick={handleButtonClick}
            className="px-6 py-2 bg-green-500 font-semibold border border-gray-600 rounded-md hover:bg-green-600"
          >
            Proceed to booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default Credentials;
