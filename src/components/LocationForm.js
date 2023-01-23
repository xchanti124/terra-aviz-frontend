import React, { useState } from "react";

function LocationForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [pictures, setPictures] = useState([]);
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const formErrors = [];

        if (!title) formErrors.push("Title is required");
        if (!description) formErrors.push("Description is required");
        if (!location) formErrors.push("Location is required");
        if (!pictures.length) formErrors.push("At least one picture is required");

        setErrors(formErrors);
        return formErrors.length === 0;
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (validate()) {
            console.log("Submitting form with:", { title, description, location, pictures });
            // Additional functionality to handle form submission can be added here
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={({ target: { value } }) => setTitle(value)}
                    required
                />
            </label>
            {errors.includes("Title is required") && <p className="error">Title is required</p>}

            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={({ target: { value } }) => setDescription(value)}
                    required
                />
            </label>
            {errors.includes("Description is required") && <p className="error">Description is required</p>}

            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={({ target: { value } }) => setLocation(value)}
                    required
                />
            </label>
            {errors.includes("Location is required") && <p className="error">Location is required</p>}

            <label>
                Pictures:
                <input
                    type="file"
                    multiple
                    onChange={({ target: { files } }) => setPictures(Array.from(files))}
                    required
                />
            </label>
            {errors.includes("At least one picture is required") && <p className="error">At least one picture is required</p>}

            <button type="submit">Submit</button>
        </form>
    );
}

export default LocationForm;
