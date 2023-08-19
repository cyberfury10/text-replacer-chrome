import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./app.scss";

const Popup = () => {
  return <>
    <div className="container">
      caodijasiojo
    </div>
  </>
}

try {
  const root = ReactDOM.createRoot(document.getElementById("popup"));
  root.render(<Popup />);
} catch (e) {
  // This error is expected here popup.html does not have a div with id="options" 
}