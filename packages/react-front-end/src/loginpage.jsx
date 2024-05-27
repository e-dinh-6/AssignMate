import React from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

function loginpage() {
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50 ">
      <div className="text-center">
        <img src="src/logo.png" style={{ width: "185px" }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">Login to AssignMate</h4>
      </div>
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        style={{ backgroundColor: "#f0f0f0" }}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        style={{ backgroundColor: "#f0f0f0" }}
      />

      <MDBBtn className="mb-4">Sign in</MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <a href="/signup">Register</a>
        </p>
      </div>
    </MDBContainer>
  );
}

export default loginpage;
