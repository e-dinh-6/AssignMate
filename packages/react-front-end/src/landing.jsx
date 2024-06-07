import "./landing.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

function landing() {
  useEffect(() => {
    const logoElement = document.querySelector(".landing-logo");

    if (logoElement) {
      // Add animation class when component mounts
      logoElement.classList.add("jump-once");

      // Remove animation class after animation completes
      setTimeout(() => {
        logoElement.classList.remove("jump-once");
      }, 1000); // Adjust this time according to your animation duration
    }
  }, []);

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
