import React from "react";
import "./App.css";
import Search from "./components/Search/Search";
export default function App() {
  return (
    <div className="App">
      <Search defaultCity="New York"/>
    </div>
  );
}
