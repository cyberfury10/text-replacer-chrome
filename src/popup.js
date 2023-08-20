import React from "react";
import ReactDOM from "react-dom/client";
import SettingsIcon from '@mui/icons-material/Settings';
import "./app.scss";
import replaceIcon from "./images/replace-icon.svg"

import { openOptionsPage } from "./content/content";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const blackTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[700]
    }
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(','),
  },
})

const Popup = () => {

  return <>
    <ThemeProvider theme={blackTheme}>
      <div className="popup-container-transparent">
        <div className="popup-container">
          <div className="banner-container-popup">
            <img className="logo" src={replaceIcon} alt="WebEdit Pro" />
            <h2 className="banner">
              WebEdit Pro
            </h2>
          </div>
          <Button variant="contained" onClick={openOptionsPage} startIcon={<SettingsIcon />} style={{ margin: "20px" }}>
            Open Settings
          </Button>
        </div>
      </div>
    </ThemeProvider>
  </>
}

try {
  const root = ReactDOM.createRoot(document.getElementById("popup"));
  root.render(<Popup />);
} catch (e) {
  // This error is expected here popup.html does not have a div with id="options" 
}