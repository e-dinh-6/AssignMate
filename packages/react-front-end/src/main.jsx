// src/main.jsx
import React from "react";

import "./main.css";
import { Link } from "react-router-dom";

function MyApp() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <button>{<Link to="/list">link</Link>}</button>
    </div>
  );
}

export default MyApp;
