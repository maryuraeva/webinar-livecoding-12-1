import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
