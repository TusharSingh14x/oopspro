import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [increaseSeatsId, setIncreaseSeatsId] = useState(null);
  const [additionalSeats, setAdditionalSeats] = useState('');

  const fetchBuses = () => {
    axios.get('http://localhost:8080/api/buses')
      .then(res => setBuses(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const showMessage = (msg, success) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleResetSeats = async (busId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/buses/${busId}/reset-seats`);
      if (response.data.success) {
        showMessage(response.data.message, true);
        fetchBuses();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to reset seats', false);
    }
  };

  const handleIncreaseSeats = async (busId) => {
    if (!additionalSeats || parseInt(additionalSeats) <= 0) {
      showMessage('Please enter a valid number of seats', false);
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/api/buses/${busId}/increase-seats`, {
        additionalSeats: parseInt(additionalSeats)
      });
      if (response.data.success) {
        showMessage(response.data.message, true);
        setIncreaseSeatsId(null);
        setAdditionalSeats('');
        fetchBuses();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to increase seats', false);
    }
  };

  const handleDeleteBus = async (busId, busNumber) => {
    if (!window.confirm(`Are you sure you want to delete bus ${busNumber}? This action cannot be undone.`)) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:8080/api/buses/${busId}`);
      if (response.data.success) {
        showMessage(response.data.message, true);
        fetchBuses();
      }
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to delete bus', false);
    }
  };

  return (
    <div>
      <h2>All Buses</h2>
      {message && (
        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? '✅' : '❌'} {message}
        </div>
      )}
      {buses.length === 0 ? (
        <div className="empty-state">
          <p>No buses available</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Total Seats</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map(bus => (
              <tr key={bus.id}>
                <td>🚌 {bus.busNumber}</td>
                <td>📍 {bus.source}</td>
                <td>📍 {bus.destination}</td>
                <td>{bus.totalSeats}</td>
                <td>
                  {bus.availableSeats > 0 ? (
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                      ✓ {bus.availableSeats}
                    </span>
                  ) : (
                    <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
                      ✗ Full
                    </span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    {increaseSeatsId === bus.id ? (
                      <div className="increase-seats-input">
                        <input
                          type="number"
                          placeholder="Seats"
                          value={additionalSeats}
                          onChange={(e) => setAdditionalSeats(e.target.value)}
                          min="1"
                          style={{ width: '80px', marginRight: '5px' }}
                        />
                        <button
                          className="btn-confirm"
                          onClick={() => handleIncreaseSeats(bus.id)}
                        >
                          ✓
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() => {
                            setIncreaseSeatsId(null);
                            setAdditionalSeats('');
                          }}
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          className="btn-reset"
                          onClick={() => handleResetSeats(bus.id)}
                          title="Reset available seats to total seats"
                        >
                          🔄 Reset
                        </button>
                        <button
                          className="btn-increase"
                          onClick={() => setIncreaseSeatsId(bus.id)}
                          title="Increase total seats"
                        >
                          ➕ Increase
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteBus(bus.id, bus.busNumber)}
                          title="Delete bus"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusList;
