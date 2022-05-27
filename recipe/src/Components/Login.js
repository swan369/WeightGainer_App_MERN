import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const name = event.target.name;

    console.log("handleChange - event", name, event.target.value);

    setLogin({ ...login, [name]: event.target.value });
  };
  return (
    <>
      <h3>login page</h3>
      <label>Email: </label>
      <input
        name="email"
        value={login.email}
        onChange={(event) => {
          handleChange(event);
        }}
      />
      <br />
      <label>Password: </label>
      <input
        name="password"
        value={login.password}
        onChange={(event) => {
          handleChange(event);
        }}
      />
    </>
  );
};

export default Login;
