import React, { useState } from "react";
import "../../App.css";
import Forecast from "../Forecast/Forecast";
import Weather from "../Weather/Weather";
import { apiKey } from "../../constants/apiKeys";
import axios from "axios";
import { DotWave } from "@uiball/loaders";

export default function Search(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [searchResults, setSearchResults] = useState([]);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: Math.round(response.temperature.current),
      city: response.city,
      date: new Date(response.time * 1000),
      iconUrl: response.condition.icon_url,
      description: response.condition.description,
      humidity: Math.round(response.temperature.humidity),
      wind: Math.round(response.wind.speed),
    });
  }

  async function fetchCities(query) {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/lmfmaier/cities-json/master/cities500.json"
      );
      const cities = await response.json();
      return cities
        .filter((city) => city.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
    } catch (error) {
      console.error("Error fetching city data:", error);
      return [];
    }
  }

  function handleCityChange(event) {
    const query = event.target.value;
    setCity(query);

    if (query.length > 0) {
      fetchCities(query).then((cities) => {
        setSearchResults(cities);
      });
    } else {
      setSearchResults([]);
    }
  }

  function handleCityClick(cityName) {
    setCity(cityName);
    setSearchResults([]);
  }

  function search() {
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(({ data }) => handleResponse(data));
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  if (weatherData.ready) {
    return (
      <div className="App">
        <div className="container">
          <h1>Your Weather App</h1>
          <div className="search-box">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                className="search-city"
                placeholder="Enter your city..."
                autoComplete="off"
                autoFocus="on"
                value={city}
                onChange={handleCityChange}
              />
              <div className="suggestions">
                {searchResults.map((cityData) => (
                  <div
                    className="suggestion"
                    key={cityData.id}
                    onClick={() => handleCityClick(cityData.name)}
                  >
                    {cityData.name}, {cityData.country}
                  </div>
                ))}
              </div>
              <input
                type="submit"
                value="Search"
                className="search-button"
                id="search-button"
              />
            </form>
          </div>
          <Weather data={weatherData} />
          <Forecast city={weatherData.city} />
          <div className="footer">
            <p>
              Open-sourced{" "}
              <a
                href="https://github.com/Taniatos/weather-app-public.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                code
              </a>{" "}
              by Tetiana Korchynska
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return (
      <div className="loader">
        <DotWave size={50} speed={1} color="#332926" />
      </div>
    );
  }
}
