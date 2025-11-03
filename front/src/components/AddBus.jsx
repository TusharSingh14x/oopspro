import React, { useState } from 'react';
import axios from 'axios';

const AddBus = () => {
  const [bus, setBus] = useState({ busNumber: '', source: '', destination: '', totalSeats: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setBus({ ...bus, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const busData = {
        busNumber: bus.busNumber,
        source: bus.source,
        destination: bus.destination,
        totalSeats: parseInt(bus.totalSeats) || 0 // Convert string to number, default to 0
      };

      if (busData.totalSeats <= 0) {
        setMessage('Total seats must be greater than 0');
        setIsSuccess(false);
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/buses', busData);

      if (response.data.success) {
        setMessage(response.data.message || 'Bus added successfully!');
        setIsSuccess(true);
        setBus({ busNumber: '', source: '', destination: '', totalSeats: '' });
      } else {
        setMessage(response.data.message || 'Failed to add bus');
        setIsSuccess(false);
      }
    } catch (err) {
      console.error('Error adding bus:', err);
      const errorMsg = err.response?.data?.message || 'Failed to add bus. Please try again.';
      setMessage(errorMsg);
      setIsSuccess(false);
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2>Add New Bus</h2>
      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? '✅' : '❌'} {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="busNumber"
          placeholder="🚌 Enter Bus Number"
          value={bus.busNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="source"
          placeholder="📍 Enter Source Location"
          value={bus.source}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="📍 Enter Destination Location"
          value={bus.destination}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="totalSeats"
          placeholder="💺 Enter Total Seats"
          value={bus.totalSeats}
          onChange={handleChange}
          required
          min="1"
        />
        <button type="submit">➕ Add Bus</button>
      </form>
    </div>
  );
};

export default AddBus;
