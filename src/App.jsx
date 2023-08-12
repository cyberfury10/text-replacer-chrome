import React, { useState } from "react";
// import { saveExtensionData, getExtensionData } from "./content/content";
import ReactDOM from "react-dom";
import "./index.scss";
import MainScreen from "./screens/main-screen";

const App = () => {
  return <div className="container">
    <MainScreen />
  </div>
}
ReactDOM.render(<App />, document.getElementById("app"));
