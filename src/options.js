import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./app.scss";
import { blueGrey } from '@mui/material/colors';
import MainScreen from "./screens/main-screen";
import { ThemeProvider, createTheme } from "@mui/material";

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


const Options = () => {
  return <>
    <ThemeProvider theme={blackTheme}>
      <div className="container">
        <MainScreen />
      </div>
    </ThemeProvider>
  </>
}

const root = ReactDOM.createRoot(document.getElementById("options"));
root.render(<Options />);
