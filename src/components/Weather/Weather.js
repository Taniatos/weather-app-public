import React from "react";
import "../../App.css";
import WeatherTemperature from "../WeatherTemperature/WeatherTemperature";
// import FormattedDate from "../FormattedDate/FormattedDate";

export default function Weather({ data }) {
  const { iconUrl, description, city, date, humidity, wind, temperature } =
    data;

  return (
    <div className="WeatherInfo">
      <div className="city-name grid">
        <img
          src={iconUrl}
          alt={description}
          className="icon-weather"
          id="icon"
        />
        <h2>{city}</h2>
      </div>
      <div className="city-description grid">
        <ul className="description-list">
          {/* <li>
            <FormattedDate date={date} />
          </li> */}
          <br />
          <li>{description.charAt(0).toUpperCase() + description.slice(1)}</li>
          <li>Humidity: {humidity} %</li>
          <li>Wind: {wind} km/h</li>
        </ul>

        <div className="temperature-display grid">
          <WeatherTemperature degree={temperature} />
        </div>
      </div>
    </div>
  );
}
