import "./landing.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

function landing() {
  return (
    <div className="landing-page">
      <img src={logo} className="logo" alt="Logo" />
      <h1>Welcome [user]</h1>
      <button>{<Link to="/sevenday">view my calendar</Link>}</button>
    </div>
  );
}

export default landing;
