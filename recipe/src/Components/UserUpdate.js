import axios from "axios";
import "./UserUpdate.css";

export default function UserUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("userUpdate");
    const updatedUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    // axios.put("/users/update/")
  };
  return (
    <>
      <div>
        <form className="userUpdateContainer" onSubmit={handleSubmit}>
          <h3>Update</h3>
          <div className="divUpdateInput">
            <label className="labelUserUpdate" htmlFor="name">
              Name:{" "}
            </label>
            <input
              className="inputUserUpdate"
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div className="divUpdateInput">
            <label className="labelUserUpdate" htmlFor="email">
              Email:{" "}
            </label>
            <input
              className="inputUserUpdate"
              type="text"
              id="email"
              name="email"
            />
          </div>
          <div className="divUpdateInput">
            <label className="labelUserUpdate" htmlFor="password">
              Password:{" "}
            </label>
            <input
              className="inputUserUpdate"
              type="text"
              id="password"
              name="password"
            />
          </div>
          <input className="btnUserUpdate" type="submit" value="Update" />
          {/* <button className="buttonRegister" onClick={handleSubmit}>
            Submit
          </button> */}
        </form>
      </div>
    </>
  );
}
