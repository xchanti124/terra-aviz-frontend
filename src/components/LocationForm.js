import React, { useState } from "react";

import { authenticatedFetch } from "../helpers";

import styles from "../styles/form.module.css";

function LocationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imageLink, setImageLink] = useState([]);
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const formErrors = [];
    if (!title) formErrors.push("Title is required");
    if (!description) formErrors.push("Description is required");
    if (!address) formErrors.push("Address is required");
    if (!category) formErrors.push("Category is required");
    if (!imageLink) formErrors.push("imageLink is required");
    return formErrors.length === 0;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (validate()) {
      console.log("Submitting form with:", { title, description, address, category, imageLink });
      let res = await authenticatedFetch("http://localhost:3000/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          title,
          description,
          address,
          imageLink,
          category,
        }),
      });
      // Additional functionality to handle form submission can be added here
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <input placeholder={"Title..."} value={title} onChange={({ target: { value } }) => setTitle(value)} required />
      </label>
      {errors.includes("Title is required") && <p className="error">Title is required</p>}

      <label>
        <input
          placeholder={"Description..."}
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
          required
        />
      </label>
      {errors.includes("Description is required") && <p className="error">Description is required</p>}

      <label>
        <input
          placeholder={"Address..."}
          value={address}
          onChange={({ target: { value } }) => setAddress(value)}
          required
        />
      </label>
      {errors.includes("Address is required") && <p className="error">Address is required</p>}

      <label>
        <input
          placeholder={"Image link..."}
          value={imageLink}
          onChange={({ target: { value } }) => setImageLink(value)}
          required
        />
      </label>

      {errors.includes("ImageLink is required") && <p className="error">ImageLink is required</p>}

      <label>
        <input
          placeholder={"Category..."}
          value={category}
          onChange={({ target: { value } }) => setCategory(value)}
          required
        />
      </label>
      {errors.includes("Category is required") && <p className="error">Category is required</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default LocationForm;
