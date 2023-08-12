import React, { useState } from "react";
import { saveExtensionData, getExtensionData } from "./content/content";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => {
  const [state, setState] = useState({ from: '', to: '' })

  const save = (e) => {
    saveExtensionData(state)
  }
  const alert = (e) => {
    getExtensionData()
  }

  const onChange = (value, id) => {
    setState({ ...state, [id]: value })

  }
  return <div className="container">
    <input type='text' placeholder="from" onChange={(e) => onChange(e.target.value, 'from')} />
    <input type='text' placeholder="to" onChange={(e) => onChange(e.target.value, 'to')} />
    <button onClick={save}> Save</button>
    <button onClick={alert}> Alert</button>
  </div>
}
ReactDOM.render(<App />, document.getElementById("app"));
