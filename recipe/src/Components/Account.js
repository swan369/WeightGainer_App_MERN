import "./Account.css";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Account(props) {
  const navigate = useNavigate();
  // const [registration, setRegistration] = useState("false");
  // const [update, setUpdate] = useState("false");
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = () => {
    console.log("handleRegister");
    navigate("/users/account/create");
  };

  const handleUpdate = () => {
    if (!props.loggedUser.isLogin) {
      setIsLogin("no");
    } else {
      console.log("handleUpdate");
      navigate("/users/account/" + props.loggedUser._id);
    }
  };

  if (isLogin === "no") {
    return (
      <>
        <h3>you need to log in</h3>
        <button
          onClick={() => {
            navigate("/users/login");
          }}
        >
          go to login
        </button>
      </>
    );
  }
  return (
    <>
      <div>
        <div>
          <h3>Account Management</h3>
        </div>

        <div>
          <button className="divRegistration" onClick={handleRegister}>
            Registration
          </button>
          <button className="divUpdate" onClick={handleUpdate}>
            Your Details
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
}
