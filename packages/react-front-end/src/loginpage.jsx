// import React, { useEffect } from "react";
// import {
//   MDBContainer,
//   MDBInput,
//   MDBCheckbox,
//   MDBBtn,
//   MDBIcon,
// } from "mdb-react-ui-kit";

// const INVALID_TOKEN = "INVALID_TOKEN";
// const [token, setToken] = useState(INVALID_TOKEN);
// const [message, setMessage] = useState("");
// const API_PREFIX = "https://black-rock-04015071e.5.azurestaticapps.net";

// function loginpage() {
//   const [creds, setCreds] = useState({
//     username: "",
//     pwd: "",
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;
//     switch (name) {
//       case "username":
//         setCreds({ ...creds, username: value });
//         break;
//       case "password":
//         setCreds({ ...creds, pwd: value });
//         break;
//     }
//   }

//   function submitForm() {
//     props.handleSubmit(creds);
//     setCreds({ username: "", pwd: "" });
//   }

//   function loginUser(creds) {
//     const promise = fetch("https://assignmate7.azurewebsites.net/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(creds),
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           response.json().then((payload) => setToken(payload.token));
//           setMessage(`Login successful; auth token saved`);
//         } else {
//           setMessage(`Login Error ${response.status}: ${response.data}`);
//         }
//       })
//       .catch((error) => {
//         setMessage(`Login Error: ${error}`);
//       });

//     return promise;
//   }

//   function addAuthHeader(otherHeaders = {}) {
//     if (token === INVALID_TOKEN) {
//       return otherHeaders;
//     } else {
//       return {
//         ...otherHeaders,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//   }

//   function fetchUsers() {
//     const promise = fetch("https://assignmate7.azurewebsites.net/users", {
//       headers: addAuthHeader(),
//     });

//     return promise;
//   }

//   function postUser(person) {
//     const promise = fetch("https://assignmate7.azurewebsites.net/users", {
//       method: "POST",
//       headers: addAuthHeader({
//         "Content-Type": "application/json",
//       }),
//       body: JSON.stringify(person),
//     });
//   }

//   function signupUser(creds) {
//     const promise = fetch("https://assignmate7.azurewebsites.net/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(creds),
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           response.json().then((payload) => setToken(payload.token));
//           setMessage(
//             `Signup successful for user: ${creds.username}; auth token saved`,
//           );
//         } else {
//           setMessage(`Signup Error ${response.status}: ${response.data}`);
//         }
//       })
//       .catch((error) => {
//         setMessage(`Signup Error: ${error}`);
//       });

//     return promise;
//   }

//   useEffect(() => {
//     fetchUsers()
//       .then((res) => res.json())
//       .then((json) => {
//         setEvents(json);
//       })
//       .catch((error) => console.log(error));
//   });

//   return (
//     <MDBContainer className="p-3 my-5 d-flex flex-column w-50 ">
//       <div className="text-center">
//         <img src="src/logo.png" style={{ width: "185px" }} alt="logo" />
//         <h4 className="mt-1 mb-5 pb-1">Login to AssignMate</h4>
//       </div>
//       <MDBInput
//         wrapperClass="mb-4"
//         label="Email address"
//         id="form1"
//         type="email"
//         style={{ backgroundColor: "#f0f0f0" }}
//       />
//       <MDBInput
//         wrapperClass="mb-4"
//         label="Password"
//         id="form2"
//         type="password"
//         style={{ backgroundColor: "#f0f0f0" }}
//       />

//       <MDBBtn className="mb-4">Sign in</MDBBtn>

//       <div className="text-center">
//         <p>
//           Not a member? <a href="/signup">Register</a>
//         </p>
//       </div>
//     </MDBContainer>
//   );
// }

// export default loginpage;

import React, { useState } from "react";

function loginpage(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  return (
    <form>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        name="username"
        id="username"
        value={creds.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.pwd}
        onChange={handleChange}
      />
      <input
        type="button"
        value={props.buttonLabel || "Log In"}
        onClick={submitForm}
      />
    </form>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }
}
export default loginpage;
