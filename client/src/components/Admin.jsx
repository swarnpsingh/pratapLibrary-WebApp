import React, { useState, useEffect } from 'react';

function Admin() {
    const [bookedSeatsCount, setBookedSeatsCount] = useState(0);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await fetch("http://localhost:8000/api/bookings");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const totalBookedSeats = data.reduce((acc, curr) => acc + curr.bookedSeats.length, 0);
                setBookedSeatsCount(totalBookedSeats);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }

        fetchBookings();
    }, []);

    async function handleReset() {
        try {
            const response = await fetch("http://localhost:8000/api/reset", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === "ok") {
                alert("Database reset successful");
                setBookedSeatsCount(0); // Reset the booked seats count
            } else {
                alert("Failed to reset the database");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-md shadow-lg w-4/5 flex flex-col justify-center items-center">
                <h1 className='font-bold text-2xl'>Admin Panel</h1>
                <div className='flex gap-56 mt-6'>
                    <div className='text-xl font-bold'>
                        <p>Number of Seats</p>
                        <p>Number of Booked Seats</p>
                    </div>
                    <div className='text-lg'>
                        <p>: {45}</p>
                        <p>: {bookedSeatsCount}</p>
                    </div>
                </div>
                <button onClick={handleReset} className="mt-4 px-6 py-2 bg-red-500 font-semibold border border-gray-600 rounded-md hover:bg-red-600">
                    Reset Database
                </button>
            </div>
        </div>
    )
}

export default Admin;
