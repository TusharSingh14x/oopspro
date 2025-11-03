import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookSeat = () => {
  const [busId, setBusId] = useState('');
  const [booking, setBooking] = useState({ passengerName: '', contactNumber: '' });
  const [buses, setBuses] = useState([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Fetch all buses for dropdown
    axios.get('http://localhost:8080/api/buses')
      .then(res => setBuses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => setBooking({ ...booking, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/bookings/${busId}`, booking);

      if (response.data.success) {
        setMessage(response.data.message || 'Seat booked successfully!');
        setIsSuccess(true);
        setBooking({ passengerName: '', contactNumber: '' });
        setBusId('');
        // Refresh bus list to update availability
        axios.get('http://localhost:8080/api/buses')
          .then(res => setBuses(res.data))
          .catch(err => console.error(err));
      } else {
        setMessage(response.data.message || 'Booking failed');
        setIsSuccess(false);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Booking failed. Please try again.';
      setMessage(errorMsg);
      setIsSuccess(false);
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2>Book a Seat</h2>
      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? '✅' : '❌'} {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <select value={busId} onChange={(e) => setBusId(e.target.value)} required>
          <option value="">🚌 Select a Bus</option>
          {buses.map(bus => (
            <option key={bus.id} value={bus.id}>
              🚌 {bus.busNumber} - 📍 {bus.source} → 📍 {bus.destination} ({bus.availableSeats > 0 ? '✓ ' + bus.availableSeats + ' seats' : '✗ Full'})
            </option>
          ))}
        </select>
        <input
          type="text"
          name="passengerName"
          placeholder="👤 Enter Passenger Name"
          value={booking.passengerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="📞 Enter Contact Number"
          value={booking.contactNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">🎫 Book Seat</button>
      </form>
    </div>
  );
};

export default BookSeat;
