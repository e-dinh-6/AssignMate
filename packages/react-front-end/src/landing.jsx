import "./landing.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

function landing() {
  return (
    <div className="landing-page">
      <img src={logo} className="landing-logo" alt="Logo" />
      <h1 className="welcome">Welcome to AssignMate!</h1>
      <button className="view-cal">
        {<Link to="/sevenday">view my calendar</Link>}
      </button>
    </div>
  );
}

export default landing;
