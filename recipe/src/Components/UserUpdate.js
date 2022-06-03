import axios from "axios";
import "./UserUpdate.css";
import { useParams } from "react-router-dom";

export default function UserUpdate(props) {
  // console.log(props);
  const id = useParams().id;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(id);
    const updatedUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    console.log(updatedUser);
    axios
      // .put("http://localhost:3003/users/update/" + id, updatedUser)
      .put("https://recipe369.herokuapp.com/users/update/" + id, updatedUser)
      .then((res) => {
        console.log(res.data);
        // const userUpdated = res.data;
        // props.toUpdateUsers(userUpdated.updatedUser);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
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
        </form>
      </div>
    </>
  );
}
