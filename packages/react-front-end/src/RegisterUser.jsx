import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "./login.css";

import React, { useState } from "react";

function RegisterUser(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <MDBContainer className="my-5" style={{ backgroundColor: "#b3d2d4" }}>
      <MDBCard style={{ backgroundColor: "#e0ebec" }}>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol md="4">
            <MDBCardImage
              src="src/logo.png"
              alt="logo"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="8">
            <MDBCardBody>
              <h4 className="mt-1 mb-5 pb-1">Sign Up for AssignMate!</h4>
              <form>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  type="text"
                  name="username"
                  id="username"
                  value={creds.username}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  value={creds.pwd}
                  onChange={handleChange}
                />

                <MDBBtn className="mb-4 w-100" onClick={submitForm}>
                  Register
                </MDBBtn>
              </form>
              {errorMessage && ( // Conditionally render error message
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
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

  function submitForm(event) {
    event.preventDefault();
    props.handleSubmit(creds).then((response) => {
      if (!response || response.status !== 200) {
        setErrorMessage(`This username has been taken. Please try again.`);
      }
    });
    setCreds({ username: "", pwd: "" });
  }
}
export default RegisterUser;
