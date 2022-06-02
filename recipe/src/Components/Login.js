import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  // console.log(props.users);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  // handleLogOut() {
  //   this.setState({
  //     email: "",
  //     password: "",
  //     isLoggedIn: false,
  //   });
  //   localStorage.clear();
  // }

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

  const handleSubmit = function (e) {
    // console.log(login);
    let foundUser;
    e.preventDefault();
    axios
      .post("http://localhost:3003/users/login", login)
      .then((response) => {
        // console.log(response);
        localStorage.token = response.data.token;
        const found = response.data.user;
        foundUser = { ...found };
        // console.log(foundUser);
        foundUser.isLogin = true;
        props.loginUser(foundUser);
        setStatus("success");
        // setState({ isLoggedIn: true });
      })
      .catch((err) => {
        setStatus("error");
      });
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
      {/* <div class="ui two column centered grid">hello</div> */}

      <div class="ui centered login">
        <div class="column">
          <h2 class="ui purple image header">
            <div class="content">Log-in to your account</div>
          </h2>

          <form class="ui large form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input
                    type="text"
                    id="email"
                    className="inputEmail"
                    name="email"
                    value={login.email}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    placeholder="E-mail address"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input
                    type="password"
                    id="password"
                    className="inputPassword"
                    name="password"
                    value={login.password}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                </div>
              </div>
              <div
                onClick={handleSubmit}
                class="ui fluid large purple submit button"
              >
                Login
              </div>
            </div>

            {/* <div class="ui error message"></div> */}
          </form>
          <div class="ui message">
            "New to us ?"
            <a href="/users/account/create">Sign Up</a>
          </div>
        </div>
      </div>

      {/* <div className="divLogin">
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
      </div> */}
    </>
  );
};

export default Login;
