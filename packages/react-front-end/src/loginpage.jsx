import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import "./login.css";

function Loginpage(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  return (
    <form>
      <MDBContainer
        className="p-3 my-5 d-flex flex-column w-50"
        style={{ backgroundColor: "#b3d2d4" }}
      >
        <div className="text-center">
          <img
            src="src/assets/logo.png"
            style={{ width: "185px" }}
            alt="logo"
          />
          <h4 className="mt-1 mb-5 pb-1">Login to AssignMate</h4>
        </div>
        <MDBInput
          wrapperClass="mb-4"
          label="Username"
          type="text"
          name="username"
          id="username"
          value={creds.username}
          onChange={handleChange}
          style={{ backgroundColor: "#ffffff" }}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          type="password"
          name="password"
          id="password"
          value={creds.pwd}
          onChange={handleChange}
          style={{ backgroundColor: "#ffffff" }}
        />

        <MDBBtn className="mb-4" onClick={submitForm}>
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member? <a href="/signup">Register</a>
          </p>
        </div>
      </MDBContainer>
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

  function submitForm(event) {
    event.preventDefault();
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }
}
export default Loginpage;
