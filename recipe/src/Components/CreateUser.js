import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";
import axios from "axios";

export default function CreateUsers(props) {
  // console.log(props.isErrorObj.message);
  const [createdUser, setCreatedUser] = useState({});
  const [error, setError] = useState({});

  console.log(error);
  const navigate = useNavigate();
  const handleCreateUser = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    setCreatedUser({ ...createdUser, [name]: event.target.value });
  };

  const handleReturn = function () {
    setError({});
    navigate("/users/create");
  };

  const handleRedirectHome = function () {
    setError({});
    navigate("/users/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3003/users/create", createdUser)
      .then((response) => {
        const newUser = response;
        console.log(newUser);
        props.handleAddUser(newUser);
        setError({ isError: false });
      })
      .catch(function (error) {
        // console.log(error.response.data.message);
        const errorMessage = error.response.data.message;

        setError({
          message: errorMessage,
          isError: true,
        });
      });
  };

  if (error.isError === true) {
    return (
      <div>
        <h3>Error: See below message for details...</h3>
        {error.message}
        <button onClick={handleReturn}>Return to Registration</button>
      </div>
    );
  }

  if (error.isError === false) {
    return (
      <>
        <div>Registration Success !</div>
        <button onClick={handleRedirectHome}>Click to go home</button>
      </>
    );
  }

  return (
    <>
      <h3>Account Management</h3>
      <form className="createUserContainer">
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
          Submit
        </button>
      </form>
    </>
  );
}
