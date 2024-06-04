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
import Sevenday from "./sevenday";
import List from "./list";
import MonthView from "./MonthView";
import AddEvent from "./eventpage";
import Landing from "./landing";
import "./App.css";

//cd url: https://black-rock-04015071e.5.azurestaticapps.net

function App() {
//   const [events, setEvents] = useState([]);
//   function fetchUsers(){
//     const promise = fetch("http://localhost:8000/events");
//     return promise;
//   }

//   useEffect(() => {
//     fetchUsers()
//       .then((eventsList) => {
//         setEvents(eventsList);
//       })
//       .catch((error) => {
//         console.error("Erro setting events:", error); 
//   });
// },[]);

  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sevenday" element={<Sevenday />} />
          <Route path="/list" element={<List />} />
          <Route path="/event" element={<AddEvent />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/MonthView" element={<MonthView />} />

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
