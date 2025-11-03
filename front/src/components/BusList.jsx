import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusList = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/buses')
      .then(res => setBuses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Buses</h2>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusList;
