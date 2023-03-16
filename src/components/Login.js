import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { authenticate } from "../helpers";

import styles from "../styles/form.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const formErrors = [];
    if (!email) formErrors.push("Email is required");
    if (!password) formErrors.push("Password is required");
    setErrors(formErrors);
    return formErrors.length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (validate()) {
      try {
        await authenticate(email, password);
        navigate("/");
      } catch (e) {
        setAuthError(e.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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

      {authError !== "" && <p className="error">{authError}</p>}

      <button type="submit">Login</button>
      <NavLink className={styles.signup} to={"/register"}>
        {" "}
        Sign Up{" "}
      </NavLink>
    </form>
  );
}

export default Login;
