import React from "react";
import "../Forecast/Forecast.css";

export default function WeatherForecastDay(props) {
    function maxTempetarure() {
        let temperature = Math.round(props.data.temperature.maximum);
        return temperature;
    }
    function minTempetarure() {
      let temperature = Math.round(props.data.temperature.minimum);
      return temperature;
    }
    function day() {
        let date = new Date(props.data.time * 1000);
        let day = date.getDay();
        let days = [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ];
        return days[day];
    }
  return (
    <div >
      <ul className="daily-forecast">
        <li>{day()}</li>
        <li>
          <img
            src={props.data.condition.icon_url}
            alt="icon"
            className="icon-forecast"
            id="icon"
          />
        </li>
        <li>
          <span className="max-temperature">{maxTempetarure()}</span>
          <span className="units-forecast-max">°C</span>
          <span className="min-temperature"> {minTempetarure()}</span>
          <span className="units-forecast-min">°C</span>
        </li>
      </ul>
      
    </div>
  );
}
