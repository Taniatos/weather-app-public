import React, { useState, useEffect } from "react";
import "./Forecast.css";
import WeatherForecastDay from "../WeatherForecastDay/WeatherForecastDay";
import { apiKey } from "../../constants/apiKeys";
import axios from "axios";
import { DotWave } from "@uiball/loaders";


export default function Forecast({ city }) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  useEffect(() => {
    axios.get(apiUrl).then(handleResponse);
  }, [apiUrl]);

  function handleResponse(response) {
    setForecast(response.data.daily.slice(0, 5));
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="Forecast-container grid">
        {forecast.map((dailyForecast) => {
          //todo: add unique key - done
          return (
            <WeatherForecastDay key={dailyForecast.time} data={dailyForecast} />
          );
        })}
      </div>
    );
  }

  return (
    //loader
    <div>
      <DotWave size={20} speed={1} color="#332926" />
    </div>
  );;
}

//todo: show loader instead of null - done
