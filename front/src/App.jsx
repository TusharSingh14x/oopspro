import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BusList from './components/BusList';
import AddBus from './components/AddBus';
import BookSeat from './components/BookSeat';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>🚌 College Bus Booking System</h1>
        <nav>
          <Link to="/">View Buses</Link>
          <Link to="/add-bus">Add Bus</Link>
          <Link to="/book">Book Seat</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BusList />} />
          <Route path="/add-bus" element={<AddBus />} />
          <Route path="/book" element={<BookSeat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
