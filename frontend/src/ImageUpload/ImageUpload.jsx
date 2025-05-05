import React, { useState, useEffect } from "react";

const ImageUpload = () => {
    const [image, setImage] = useState();
    const [message, setMessage] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) {
            setMessage("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("http://127.0.0.1:5000/images/", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setFileUrl(data.ImageUrl);
            }
            else {
                setMessage(data.message || "Error uploading image.");
            }
        }
        catch (error) {
            setMessage("An error occurred while uploading the image.");
        }
    };

    return (
        <div>
        <form onSubmit={handleUpload}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
        {fileUrl && (
            <div>
            <p>Uploaded Image:</p>
            <img src={fileUrl} alt="Uploaded" style={{ width: "200px" }} />
            </div>
        )}
        </div>
    );
};

export default ImageUpload;