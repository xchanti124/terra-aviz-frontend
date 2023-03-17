import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authenticatedFetch, register } from "../helpers";

import styles from "../styles/form.module.css";

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <input
          placeholder="Username..."
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          required
        />
      </label>
      {errors.includes("Username is required") && <p className="error">Username is required</p>}
      <label>
        <input
          placeholder="Email..."
          type="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          required
        />
      </label>
      {errors.includes("Email is required") && <p className="error">Email is required</p>}
      <label>
        <input
          placeholder="Password..."
          type="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          required
        />
      </label>
      {errors.includes("Password is required") && <p className="error">Password is required</p>}
      <label>
        <input
          placeholder="Repeat password..."
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
