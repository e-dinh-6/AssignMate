// Filename - App.js
import React, { useState, useEffect } from "react";
import ReactDOMClient from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import Login from "./loginpage";
import SignUp from "./RegisterUser";
import Sevenday from "./sevenday";
import List from "./list";
import MonthView from "./MonthView";
import AddEvent from "./eventpage";
import Landing from "./landing";
import "./App.css";

//cd url: https://black-rock-04015071e.5.azurestaticapps.net

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  //const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  function loginUser(creds) {
    console.log("loginUser");
    const promise = fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => {
            //setToken(payload.token);
            localStorage.setItem("token", payload.token);
          }),
            setMessage(`Login successful; auth token saved`);
          setRegistrationSuccess(true);
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function signupUser(creds) {
    console.log("signupUser");
    const promise = fetch(`http://localhost:8000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => {
            //setToken(payload.token);
            localStorage.setItem("token", payload.token);
          });
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`,
          );
          setRegistrationSuccess(true);
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
    return promise;
  }

  if (registrationSuccess) {
    //console.log(localStorage.getItem("token"));
    window.location.href = "/landing"; // Redirect to /landing
  }

  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login handleSubmit={loginUser} />} />
          <Route path="/login" element={<Login handleSubmit={loginUser} />} />
          <Route
            path="/signup"
            element={<SignUp handleSubmit={signupUser} buttonLabel="Sign Up" />}
          />
          <Route path="/sevenday" element={<Sevenday />} />
          <Route path="/list" element={<List />} />
          <Route path="/event" element={<AddEvent />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/MonthView" element={<MonthView />} />

          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App />);
