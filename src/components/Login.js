import React, { useState } from "react";
import { authenticate } from "../helpers";
import { useNavigate } from "react-router-dom";

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

      // console.log("Submitting form with:", { title, description, address, hashtags, category, imageLink });
      // let res = await authenticatedFetch("http://localhost:3000/api/locations", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: new URLSearchParams({
      //     title,
      //     description,
      //     address,
      //     imageLink,
      //     hashtags,
      //     category,
      //   }),
      // });
      // // Additional functionality to handle form submission can be added here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={({ target: { value } }) => setEmail(value)} required />
      </label>
      {errors.includes("Email is required") && <p className="error">Email is required</p>}

      <label>
        Password:
        <input type="password" value={password} onChange={({ target: { value } }) => setPassword(value)} required />
      </label>
      {errors.includes("Password is required") && <p className="error">Password is required</p>}

      {authError !== "" && <p className="error">{authError}</p>}

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
