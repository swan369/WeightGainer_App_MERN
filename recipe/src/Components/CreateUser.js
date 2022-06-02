import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";
import axios from "axios";

export default function CreateUsers(props) {
  const navigate = useNavigate();
  // console.log(props.isErrorObj.message);

  const [createdUser, setCreatedUser] = useState({});
  const [error, setError] = useState({});

  console.log(error);

  const handleCreateUser = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    console.log(name);
    setCreatedUser({ ...createdUser, [name]: event.target.value });
  };

  const handleReturn = function () {
    setError({});
    navigate("/users/account/create");
  };

  const handleRedirectHome = function () {
    setError({});
    navigate("/users/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(createdUser);
    axios
      .post("http://localhost:3003/users/create", createdUser)
      .then((response) => {
        console.log(response);
        localStorage.token = response.data.token; // jwt
        setError({ isError: false });
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = error.response.data.error;

        setError({
          message: errorMessage,
          isError: true,
        });
      });
  };

  if (error.isError === true) {
    return (
      <div className="errorContainer">
        <h3>Error: See below message for details...</h3>
        {error.message}
        <button className="errorBtn" onClick={handleReturn}>
          Return to Registration
        </button>
      </div>
    );
  }

  if (error.isError === false) {
    return (
      <>
        <div className="divRegSuccess">
          <h3>Registration Success !</h3>
          <button onClick={handleRedirectHome}>Click to login</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div class="ui centered login">
        <form id="test" class="ui form" method="POST" action="">
          <h4 class="ui center aligned top attached header">
            Please enter your credentials
          </h4>
          <div id="form-segment" class="ui center aligned attached segment">
            <div class="field">
              <label for="username">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={createdUser.name}
                onChange={handleCreateUser}
                placeholder="Magnificient gain"
              />
            </div>
            <div class="field">
              <label for="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={createdUser.email}
                onChange={handleCreateUser}
                placeholder="manificient@weightgainer.com"
              />
            </div>
            <div class="field">
              <label for="password">Password:</label>
              <input
                type="text"
                id="password"
                name="password"
                value={createdUser.password}
                onChange={handleCreateUser}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div id="form-message" class="ui attached message">
            <i class="icon help"></i>
            Already registered? Please login <a href="/users/login">here</a>.
          </div>
          <button
            class="ui bottom attached fluid button purple"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>

      {/* <form className="createUserContainer">
        <h3>Register</h3>
        <div className="divRegisterInput">
          <label className="labelRegister" htmlFor="name">
            Name:{" "}
          </label>
          <input
            className="inputRegister"
            type="text"
            id="name"
            name="name"
            value={createdUser.name}
            onChange={handleCreateUser}
          />
        </div>
        <div className="divRegisterInput">
          <label className="labelRegister" htmlFor="email">
            Email:{" "}
          </label>
          <input
            className="inputRegister"
            type="text"
            id="email"
            name="email"
            value={createdUser.email}
            onChange={handleCreateUser}
          />
        </div>
        <div className="divRegisterInput">
          <label className="labelRegister" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="inputRegister"
            type="text"
            id="password"
            name="password"
            value={createdUser.password}
            onChange={handleCreateUser}
          />
        </div>

        <button className="buttonRegister" onClick={handleSubmit}>
          Register
        </button>
      </form> */}
    </>
  );
}
