// Filename - App.js

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
import "./App.css";

//cd url: https://black-rock-04015071e.5.azurestaticapps.net

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/signup"
            element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
          />
          <Route path="/sevenday" element={<Sevenday />} />
          <Route path="/list" element={<List />} />
          <Route path="/event" element={<AddEvent />} />
          <Route path="/MonthView" element={<MonthView />} />

          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App />);
