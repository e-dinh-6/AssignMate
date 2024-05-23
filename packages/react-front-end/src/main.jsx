// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter as Router, Route, Swtich } from "react-router-dom";
import List from "./List"
import "./main.css";

function MyApp() {
  return (
       <Route>
      <div>
        <h1>Hello, React!</h1>
        <Switch>
          <Route path = "/list" exact component={List}/>
        </Switch>
      </div>
    </Route>
    
  );
}

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);
