import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserDetail.css";

export default function UserDetail(props) {
  const id = useParams().id;
  console.log(props.loggedUser.isLogin);
  let navigate = useNavigate();
  if (!props.loggedUser.login) {
    navigate("/users/login");
  }

  return (
    <>
      <div>
        <h3>UserDetail</h3>
      </div>
      <ul className="ulUser">
        <li className="liUser">Name: {props.loggedUser.name}</li>

        <li className="liUser">Email: {props.loggedUser.email}</li>
        <li className="liUser">Password: {props.loggedUser.password}</li>
      </ul>
      <button
        onClick={() => {
          console.log(id);
          navigate(`/users/account/${id}/update`);
        }}
      >
        Update ?
      </button>
    </>
  );
}
