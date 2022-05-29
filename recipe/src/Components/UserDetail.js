import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserDetail.css";
import UserUpdate from "./UserUpdate";

export default function UserDetail(props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const id = useParams().id;
  console.log(props.loggedUser.isLogin);
  let navigate = useNavigate();
  if (!props.loggedUser.isLogin) {
    navigate("/users/login");
  }

  const handle2Update = () => {
    console.log("handle2Update");
    setIsUpdate(true);
  };
  const html = (
    <div>
      <ul className="ulUser">
        <li className="liUser">Name: {props.loggedUser.name}</li>

        <li className="liUser">Email: {props.loggedUser.email}</li>
        <li className="liUser">Password: {props.loggedUser.password}</li>
      </ul>
      <button onClick={handle2Update}>Update ?</button>
    </div>
  );

  return (
    <>
      <div>
        <h3>UserDetail</h3>
      </div>
      {isUpdate ? <UserUpdate /> : html}
    </>
  );
}
