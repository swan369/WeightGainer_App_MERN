import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const navigate = useNavigate();
  // console.log(props.users);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleReturn = () => {
    setStatus("");
    navigate("/users/login");
  };

  const handleHome = () => {
    navigate("/");
    setStatus("");
  };

  const handleChange = (event) => {
    const name = event.target.name;
    // console.log("handleChange - event", name, event.target.value);
    setLogin({ ...login, [name]: event.target.value });
  };

  const handleToRegistration = function () {
    navigate("/users/account/create");
  };

  const handleSubmit = function () {
    console.log(login);
    // console.log(props.users);

    const result = props.users.some(
      (user) => user.email === login.email && user.password === login.password
    );

    if (result) {
      const found = props.users.find(
        (user) => user.email === login.email && user.password === login.password
      );
      found.isLogin = true;
      props.loginUser(found);
      setStatus("success");
    }
    if (!result) {
      console.log("login does not match, try again");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <>
        <div>
          <h3>successful login</h3>
          <button onClick={handleHome}>go home</button>
        </div>
      </>
    );
  }
  if (status === "error") {
    return (
      <>
        <div>
          <h3>unsuccessful login, try again</h3>
          <button onClick={handleReturn}> retry Login</button>
        </div>
      </>
    );
  }
  // console.log(loggedUser);
  return (
    <>
      <div className="divLogin">
        <h3>Login Page</h3>
        <div className="divLoginEmail">
          <label htmlFor="email" className="labelEmail">
            Email:{" "}
          </label>
          <input
            id="email"
            className="inputEmail"
            name="email"
            value={login.email}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>

        <br />
        <div>
          <label htmlFor="password" className="labelPassword">
            Password:{" "}
          </label>
          <input
            id="password"
            className="inputPassword"
            name="password"
            value={login.password}
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>

        <button onClick={handleSubmit} className="btnLoginSubmit">
          Login
        </button>
        <div className="notSignedUp">
          <h5>not signed up ?</h5>
        </div>
        <button onClick={handleToRegistration} className="btnLoginRedirect">
          Link to Registration
        </button>
      </div>
    </>
  );
};

export default Login;
