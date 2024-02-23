import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherApp from './Weather';
import SingleCard from './SingleCard';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* Render WeatherApp by default */}
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        {/* Define a route for SingleCard with a dynamic CityCode parameter */}
        <Route path="/SingleCard/:CityCode" element={<SingleCard />} />
        {/* Redirect to WeatherApp for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
