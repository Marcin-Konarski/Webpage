import {useState} from "react"

const EventForm = ({existingEvent = {}, updateCallBack}) => {
    const [eventTitle, setEventTitle] = useState(existingEvent.eventTitle || "")
    const [eventDescription, setEventDescription] = useState(existingEvent.eventDescription || "")
    const [eventDate, setEventDate] = useState(existingEvent.eventDate || "")

    const updating = Object.entries(existingEvent).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            eventTitle,
            eventDescription,
            eventDate
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_event/${existingEvent.id}`: "create_event")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallBack();
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="eventTitle">Event Title:</label>
                <input
                    type="text"
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="eventDescription">Event Description:</label>
                <input
                    type="text"
                    id="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="eventDate">Date:</label>
                <input
                    type="text"
                    id="eventDate"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default EventForm