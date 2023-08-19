import React from "react";
import ReactDOM from "react-dom/client";
import "./app.scss";
import { blueGrey } from '@mui/material/colors';
import OptionsScreen from "./screens/options";
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
        <OptionsScreen />
      </div>
    </ThemeProvider>
  </>
}

try {
  const root = ReactDOM.createRoot(document.getElementById("options"));
  root.render(<Options />);
} catch (e) {
  // This error is expected here options.html does not have a div with id="popup" 
}
