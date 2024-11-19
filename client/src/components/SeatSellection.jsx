import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation hook to retrieve data passed through navigate
import { v4 as uuidv4 } from "uuid";

function SeatSelection() {
  const mockData = {
    // Defining the rooms and seats
    rooms: {
      1: {
        seats: 13,
      },
      2: {
        seats: 4,
      },
      3: {
        seats: 15,
      },
      4: {
        seats: 13,
      },
    },
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state; // Retrieving data sent passed in state in /Credentials

  // Handling the state of the variables
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [selectedShift, setSelectedShift] = useState("7am-12pm");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookings, setBookings] = useState({});

  useEffect(() => {
    async function fetchBookings() {
      // Fetches data about the booked seats from the backend
      try {
        const response = await fetch("http://localhost:8000/api/bookings"); //Fetch list of all bookings
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort the JSON to organize bookings, format: { roomNumber: { shift: [bookedSeats] } }
        // Save the formatted data in setBookings
        setBookings(
          data.reduce((acc, curr) => {
            if (!acc[curr.room]) acc[curr.room] = {};
            acc[curr.room][curr.shift] = curr.bookedSeats;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, []);

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setSelectedSeat(null);
  };

  const handleShiftSelection = (shift) => {
    setSelectedShift(shift);
    setSelectedSeat(null);
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const bookedSeats = bookings[selectedRoom]?.[selectedShift] || []; // Checks which seats are booked
  // console.log(userData)
  async function handleSubmit() {
    if (!selectedSeat) {
      alert("Please select a seat.");
      return;
    }

    const userPayload = {
      // New variable with added information
      ...userData,
      seat: selectedSeat,
      shift: selectedShift,
      room: selectedRoom,
    };

    const uniqueId = uuidv4(); // Generate a unique identifier
    navigate(`/confirmation/${uniqueId}`, { state: { userPayload } }); // Pass user data to Seat Selection page
  }

  const { seats, shifts } = mockData.rooms[selectedRoom];

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-md shadow-lg w-4/5 flex flex-col justify-center items-center">
          <div className="grid grid-cols-12 grid-rows-5 gap-4 w-full">
            <div className="col-span-1"></div>
            <div className="col-span-3"></div>
            <div className="col-span-8 flex justify-between max-h-16 items-center">
              {["7am-12pm", "12pm-5pm", "5pm-10pm"].map((shift) => (
                <div
                  key={shift}
                  className={`border-2 border-gray-600 p-4 rounded-lg cursor-pointer hover:border-green-300 bg-gray-700 ${
                    selectedShift === shift ? "border-green-500" : ""
                  }`}
                  onClick={() => handleShiftSelection(shift)}
                >
                  {shift}
                </div>
              ))}
            </div>
            <div className="col-span-1 row-span-4 flex flex-col justify-between">
              {[1, 2, 3, 4].map((room) => (
                <div
                  key={room}
                  className={`border-2 border-gray-600 p-4 rounded-lg cursor-pointer hover:border-green-300 bg-gray-700 ${
                    selectedRoom === room ? "border-green-500" : ""
                  }`}
                  onClick={() => handleRoomSelection(room)}
                >
                  {room}
                </div>
              ))}
            </div>
            <div className="col-span-11 row-span-4 grid grid-cols-4 gap-4">
              {Array.from({ length: seats }, (_, index) => index + 1).map(
                (seat) => (
                  <div
                    key={seat}
                    className={`border-2 p-4 rounded-3xl cursor-pointer flex justify-center ${
                      bookedSeats.includes(seat)
                        ? "border-gray-600 bg-gray-700 cursor-not-allowed opacity-30"
                        : selectedSeat === seat
                        ? "border-green-500 bg-green-700"
                        : "border-gray-600 bg-gray-700 hover:border-green-300"
                    }`}
                    onClick={() =>
                      !bookedSeats.includes(seat) && handleSeatSelection(seat)
                    }
                  >
                    {seat}
                  </div>
                )
              )}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-green-500 font-semibold border border-gray-600 rounded-md hover:bg-green-600"
          >
            Confirm Seat
          </button>
        </div>
      </div>
    </>
  );
}

export default SeatSelection;
