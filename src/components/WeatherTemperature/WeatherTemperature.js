import React, { useState } from "react";
import "../../App.css";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");
  function convertToFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }
  function convertToCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }
  if (unit === "celsius") {
    return (
      <div className="temperature-container">
        <ul className="temperature-list">
          <li className="degree">{props.degree}</li>
          <li className="cels-fahr">
            <span className="in-celsius current">°C</span> |{" "}
            <span className="in-fahr toClick">
              <a href="/" onClick={convertToFahrenheit}>
                °F
              </a>{" "}
            </span>
          </li>
        </ul>
      </div>
    );
  } else {
    let fahrenheitTemp = Math.round((props.degree * 9) / 5 + 32);
    return (
      <div className="temperature-container">
        <ul className="temperature-list">
          <li className="degree">{fahrenheitTemp}</li>
          <li className="cels-fahr">
            <span className="in-celsius toClick">
              <a href="/" onClick={convertToCelsius}>
                °C
              </a>
            </span>{" "}
            | <span className="in-fahr current">°F</span>
          </li>
        </ul>
      </div>
    );
  }
}
