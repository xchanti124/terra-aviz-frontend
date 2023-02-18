import React, { useState } from "react";

function LocationForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [hashtags, setHashtags] = useState([]);
    const [imageLink, setImageLink] = useState([]);
    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const formErrors = [];
        if (!title) formErrors.push("Title is required");
        if (!description) formErrors.push("Description is required");
        if (!address) formErrors.push("Address is required");
        if (!hashtags) formErrors.push("Hashtags are required");
        if (!category) formErrors.push("Category is required");
        if (!imageLink) formErrors.push("imageLink is required");
        return formErrors.length === 0;
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (validate()) {
            console.log("Submitting form with:", { title, description, address,hashtags,category,imageLink});
            let res = await fetch("http://localhost:3000/api/locations",{
                method: "POST",
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    title,
                    description,
                    address,
                    imageLink,
                    hashtags,
                    category,
                })
            })
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
                Address:
                <input
                    type="text"
                    value={address}
                    onChange={({ target: { value } }) => setAddress(value)}
                    required
                />
            </label>
            {errors.includes("Address is required") && <p className="error">Address is required</p>}



            <label>
                Hashtags:
                <input
                    type="text"
                    value={hashtags}
                    onChange={({ target: { value } }) => setHashtags(value)}
                    required
                />
            </label>
            {errors.includes("Hashtags are required") && <p className="error">Hashtags are required</p>}

            <label>
                imageLink:
                <input
                    type="text"
                    value={imageLink}
                    onChange={({target: { value} } ) => setImageLink(value)}
                    required
                />
            </label>
            {errors.includes("ImageLink is required") && <p className="error">ImageLink is required</p>}


            <label>
                category:
                <input
                    type="text"
                    value={category}
                    onChange={({target: { value} } ) => setCategory(value)}
                    required
                />
            </label>
            {errors.includes("Category is required") && <p className="error">Category is required</p>}


            <button type="submit">Submit</button>
        </form>
    );
}

export default LocationForm;

