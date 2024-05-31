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

import Home from "./main";
import Login from "./loginpage";
import SignUp from "./RegisterUser";
import List from "./list";
import AddEvent from "./eventpage";
import "./App.css";

//assignmate7.azurewebsites.net azure front end url (use in place of localhost:8000)

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/list" element={<List />} />
          <Route path="/event" element={<AddEvent />} />

          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(<App />);
