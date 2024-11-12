"use client";

import React, { useState, useEffect } from "react";

import citlist from "../utils/citlist";

// Example static list of city names for suggestions

const CityManager = ({ cities, setCities }) => {
  const [newCity, setNewCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  // Load saved cities from localStorage on component mount
  useEffect(() => {
    const savedCities = localStorage.getItem("cities");
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    }
  }, []);

  // Save cities to localStorage whenever cities array changes
  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  // Handle new city input and apply debounced filtering of suggestions
  const handleInputChange = (e) => {
    const input = e.target.value;
    setNewCity(input);

    // Clear any existing debounce timer
    clearTimeout(window.searchDebounce);

    // Set a new debounce timer
    window.searchDebounce = setTimeout(() => {
      // Filter suggestions based on the input (case-insensitive) and exclude already-added cities
      const filteredSuggestions = citlist.filter(
        (city) =>
          city.toLowerCase().startsWith(input.toLowerCase()) &&
          !cities.includes(city)
      );
      setSuggestions(filteredSuggestions);
    }, 300); // 300ms debounce time
  };

  // Add the selected city from input or suggestions
  const handleAddCity = (city) => {
    if (city && !cities.includes(city)) {
      setCities([...cities, city]);
      setNewCity("");
      setSuggestions([]);
      setError(null);
    } else {
      setError("City is already in the list or invalid.");
    }
  };


  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        flexDirection: "column",
      }}
    >
      {/* Input field for city search with suggestions */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={newCity}
          onChange={handleInputChange}
          placeholder="Enter city name"
          style={{
            borderRadius: "8px",
            height: "30px",
            width: "400px",
            padding: "6px",
            marginBottom: "5px",
            border:"1.5px solid black",
            color: "black",
          }}
        />
        <button onClick={() => handleAddCity(newCity)}>
          <i className="fas"></i>
        </button>
      </div>

      {/* Display suggestions as a dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{
            border: "10px solid #608BC1",
            marginTop: "5px",
            borderRadius: "20px",
            padding: "10px",
            padding: "0",
            listStyle: "none",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={{
                padding: "5px",
                cursor: "pointer",
                margin: "2px",
                marginLeft: "10px",
                marginRight: "10px",
                borderBottom: "0.5px solid #133E87",
              }}
              onClick={() => handleAddCity(suggestion)}
            >
              <h1 style={{ color: "#133E87", font: "caption" }}>
                {suggestion}
              </h1>
            </li>
          ))}
        </ul>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CityManager;
