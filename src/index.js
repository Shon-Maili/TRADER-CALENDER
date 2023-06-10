import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import {v4 as uuidv4} from "uuid"
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
);

