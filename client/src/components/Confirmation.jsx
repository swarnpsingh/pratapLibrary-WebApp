import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const { userPayload } = location.state;
  const navigate = useNavigate();  // Initialize navigate here

  console.log(userPayload);

  async function handleSubmit() {
    const userFinal = {
      ...userPayload,
    };

    try {
      const response = await fetch("http://localhost:8000/api/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFinal),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let path = '/';

      if (data.status === "ok") {
        alert("User Registered");
        navigate(path);  
      } else {
        alert("Invalid attempt, try again");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-md shadow-lg w-4/5 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Your Selection</h2>
        <hr className="mb-4 border-gray-600" />
        <div className="flex gap-56 mt-6">
          <div className="text-xl font-bold">
            <p>Shift</p>
            <p>Room Number</p>
            <p>Seat Number</p>
          </div>
          <div className="text-lg">
            <p>: {userPayload.shift}</p>
            <p>: {userPayload.room}</p>
            <p>: {userPayload.seat}</p>
          </div>
        </div>
        <button
          className="mt-6 px-6 py-2 bg-green-500 font-semibold border border-gray-600 rounded-md hover:bg-green-600"
          onClick={handleSubmit}
        >
          Confirm Seat
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
