import React from "react";
import { useState } from "react";
import "./CreateUser.css";
import axios from "axios";

export default function CreateUsers(props) {
  console.log(props);
  const [createdUser, setCreatedUser] = useState({});

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
      .then(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <form className="createUserContainer">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={createdUser.name}
            onChange={handleCreateUser}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            value={createdUser.email}
            onChange={handleCreateUser}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            id="password"
            name="password"
            value={createdUser.password}
            onChange={handleCreateUser}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}
