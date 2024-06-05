// import React, { useState } from "react";
// import { Redirect } from "react-router-dom";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBCheckbox,
// } from "mdb-react-ui-kit";

// function RegisterUser() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);

//   function addUser({ username: user, pwd: password }) {
//     postUser({ username: user, pwd: password })
//       .then((response) => {
//         if (response.status === 201) {
//           setRegistrationSuccess(true);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function postUser({ username: user, pwd: password }) {
//     const promise = fetch("https://assignmate7.azurewebsites.net/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(),
//     });
//     return promise;
//   }

//   if (registrationSuccess) {
//     return <Redirect to="/landing" />;
//   }

//   return (
//     <MDBContainer className="my-5">
//       <MDBCard>
//         <MDBRow className="g-0 d-flex align-items-center">
//           <MDBCol md="4">
//             <MDBCardImage
//               src="src/logo.png"
//               alt="logo"
//               className="rounded-t-5 rounded-tr-lg-0"
//               fluid
//             />
//           </MDBCol>

//           <MDBCol md="8">
//             <MDBCardBody>
//               <h4 className="mt-1 mb-5 pb-1">Sign Up for AssignMate!</h4>
//               <form onSubmit={addUser}>
//                 <MDBInput
//                   wrapperClass="mb-4"
//                   label="Username"
//                   id="form1"
//                   type="username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <MDBInput
//                   wrapperClass="mb-4"
//                   label="Password"
//                   id="form2"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <MDBBtn className="mb-4 w-100">Register</MDBBtn>
//               </form>
//             </MDBCardBody>
//           </MDBCol>
//         </MDBRow>
//       </MDBCard>
//     </MDBContainer>
//   );
// }

// export default RegisterUser;

import React, { useState } from "react";

function RegisterUser(props) {
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
export default RegisterUser;
