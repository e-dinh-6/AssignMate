// Filename - App.js
import { useState } from "react";
import ReactDOMClient from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import Login from "./Loginpage";
import SignUp from "./RegisterUser";
import Sevenday from "./sevenday";
import List from "./list";
import MonthView from "./MonthView";
import AddEvent from "./eventpage";
import Landing from "./landing";
import "./App.css";

//cd url: https://black-rock-04015071e.5.azurestaticapps.net

function App() {
  //const INVALID_TOKEN = "INVALID_TOKEN";
  const [setMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  function loginUser(creds) {
    console.log("loginUser");
    const promise = fetch(`https://assignmate7.azurewebsites.net/login`, {
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
            setMessage(`Login successful; auth token saved`);
            setRegistrationSuccess(true);
          });
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
    const promise = fetch(`https://assignmate7.azurewebsites.net/signup`, {
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
    window.location.href = "/landing"; // Redirect to /landing
  }

  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Login handleSubmit={loginUser} />} />
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
