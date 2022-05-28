import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";
import axios from "axios";

export default function CreateUsers(props) {
  const [createdUser, setCreatedUser] = useState({});
  const navigate = useNavigate();
  const handleCreateUser = (event) => {
    console.log(event.target.value);
    const name = event.target.name;
    setCreatedUser({ ...createdUser, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3003/users/create", createdUser)
      .then((response) => {
        const newUser = response;
        console.log(newUser);
        props.handleAddUser(newUser);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/");
  };

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
