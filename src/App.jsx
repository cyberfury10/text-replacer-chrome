import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { blueGrey } from '@mui/material/colors';
import MainScreen from "./screens/main-screen";
import { ThemeProvider, createTheme } from "@mui/material";

const blackTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[700]
    }
  },
})


const App = () => {
  return <>
    <ThemeProvider theme={blackTheme}>
      <div className="container">
        <MainScreen />
      </div>
    </ThemeProvider>
  </>
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
