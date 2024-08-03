import { useState } from "react";
import exampleVideo from "../../src/assets/Image/abuvd.mp4";

const Reservation = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [reservations, setReservations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && date && time && guests) {
      const newReservation = { id: Date.now(), name, date, time, guests };
      setReservations([...reservations, newReservation]);
      setName("");
      setDate("");
      setTime("");
      setGuests("");
    }
  };

  return (
    <div className="relative w-10/12 h-screen overflow-hidden">
      <video
        src={exampleVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full p-4">
        {/* Reservation Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded shadow-md"
          >
            <h2 className="text-xl font-bold mb-4">Table Reservation</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="date">
                Select a date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="time">
                Select a time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="guests">
                Number of guests
              </label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Make a reservation
            </button>
          </form>
        </div>

        {/* Reserved Tables */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Reserved Tables</h2>
            <ul>
              {reservations.length === 0 ? (
                <li className="text-gray-700">
                  There are no reservations available.
                </li>
              ) : (
                reservations.map((res) => (
                  <li
                    key={res.id}
                    className="bg-gray-50 border border-gray-200 rounded p-4 mb-4 shadow"
                  >
                    <h3 className="font-bold">Name: {res.name}</h3>
                    <p>Date: {res.date} - {res.time}</p>
                    <p>Number of guests: {res.guests} Guests</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
