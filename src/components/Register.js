import React, { useState } from "react";
import { authenticatedFetch, register } from "../helpers";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const formErrors = [];
    if (!username) formErrors.push("Username is required");
    if (!email) formErrors.push("Email is required");
    if (!password) formErrors.push("Password is required");
    if (!repeatPassword) formErrors.push("Repeating password is required");
    setErrors(formErrors);
    return formErrors.length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (validate()) {
      try {
        await register(username, email, password, repeatPassword);
        navigate("/login");
      } catch (e) {
        setRegisterError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" value={username} onChange={({ target: { value } }) => setUsername(value)} required />
      </label>
      {errors.includes("Username is required") && <p className="error">Username is required</p>}
      <label>
        Email
        <input type="email" value={email} onChange={({ target: { value } }) => setEmail(value)} required />
      </label>
      {errors.includes("Email is required") && <p className="error">Email is required</p>}
      <label>
        Password
        <input type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} required />
      </label>
      {errors.includes("Password is required") && <p className="error">Password is required</p>}
      <label>
        Repeat Password
        <input
          type="password"
          value={repeatPassword}
          onChange={({ target: { value } }) => setRepeatPassword(value)}
          required
        />
      </label>
      {errors.includes("Repeating password is required") && <p className="error">Username is required</p>}

      {registerError !== "" && <p className="error">{registerError}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;

