import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../Dropdown/DropdownItem";

const EventForm = ({ existingEvent = {}, updateCallBack }) => {
    const [eventTitle, setEventTitle] = useState(existingEvent.eventTitle || "");
    const [eventDescription, setEventDescription] = useState(existingEvent.eventDescription || "");
    const [eventDate, setEventDate] = useState(existingEvent.eventDate || "");
    const [eventLocation, setEventLocation] = useState(existingEvent.eventLocation || "");
    const [eventCategory, setEventCategory] = useState(existingEvent.eventCategory || "");
    const [isFinished, setIsFinished] = useState(existingEvent.isFinished || false);
    const [createdBy, setCreatedBy] = useState(existingEvent.createdBy || 0);

    // Images:
    const [image, setImage] = useState();
    const [message, setMessage] = useState("");
    const [imagePath, setImagePath] = useState("");

    const categories = [
        "Music", "Art", "Sports", "Recreation", "Food", "Drink", "Business", "Education",
        "Family", "Kids", "Community", "Parties", "Outdoor", "Nature", "Adventure", "Politics",
        "Government", "Health", "Spirituality", "Shopping", "Fashion", "Travel", "Media", "Cinema",
        "Entertainment", "Career", "Science", "Technology", "Home", "Gardening", "Faith", "Religion",
        "Charity", "Social", "Festivals", "Other"
    ];

    const updating = Object.entries(existingEvent).length !== 0;

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("eventTitle", eventTitle);
        formData.append("eventDescription", eventDescription);
        formData.append("eventDate", eventDate);
        formData.append("eventLocation", eventLocation);
        formData.append("eventCategory", eventCategory);
        formData.append("isFinished", isFinished);
        formData.append("createdBy", createdBy);
        if (image) {
            formData.append("image", image);
        }
    
        const url = "http://127.0.0.1:5000/" + (updating ? `update_event/${existingEvent.id}` : "create_event");
        const options = {
            method: updating ? "PATCH" : "POST",
            body: formData,
        };
    
        try {
            const response = await fetch(url, options);
            const data = await response.json();
    
            if (response.ok) {
                updateCallBack();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error submitting event:", error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="eventTitle">Event Title:</label>
                <input
                    type="text"
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    maxLength={50}
                />
            </div>
            <div>
                <label htmlFor="eventDescription">Event Description:</label>
                <input
                    type="text"
                    id="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    maxLength={1000}
                />
            </div>
            <div>
                <label htmlFor="eventDate">Date:</label>
                <input
                    type="text"
                    id="eventDate"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    maxLength={30}
                />
            </div>
            <div>
                <label htmlFor="eventLocation">Location:</label>
                <input
                    type="text"
                    id="eventLocation"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    maxLength={30}
                />
            </div>
            <div>
                <label htmlFor="eventCategory">Category:</label>
                <Dropdown
                    id="eventCategory"
                    buttonText={eventCategory || "Select a Category"}
                    content={
                        <>
                            {categories.map((item) => (
                                <DropdownItem key={item} onClick={() => setEventCategory(item)}>
                                    {item}
                                </DropdownItem>
                            ))}
                        </>
                    }
                />
            </div>
            <div>
                <label htmlFor="createdBy">Created by:</label>
                <input
                    type="text"
                    id="createdBy"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="image">Event Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {message && <p>{message}</p>}
                {imagePath && (
                    <div>
                        <p>Uploaded Image:</p>
                        <img src={imagePath} alt="Uploaded" style={{ width: "200px" }} />
                    </div>
                )}
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default EventForm;