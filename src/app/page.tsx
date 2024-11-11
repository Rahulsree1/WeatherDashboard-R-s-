"use client";

import React, { useState } from "react";
import CityManager from "./components/CityManager";
import Weather from "./components/Weather";
import Title from "./components/Title";
import { Metadata } from "next";


const Home = () => {
  const [cities, setCities] = useState([]);

  // Function to remove a city from the list
  const handleRemoveCity = (city: never) => {
    setCities(cities.filter((c) => c !== city));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        gap: "10px",
      }}
    >
      <Title />
      <CityManager cities={cities} setCities={setCities} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 3 columns
          gap: "20px",
          margin: "10px" // space between items
        }}
      >
          {cities.map((city) => (

              <Weather
                key={city}
                city={city}
                onRemove={() => handleRemoveCity(city)}
              />
          ))}
      </div>
    </div>
  );
};

export default Home;

