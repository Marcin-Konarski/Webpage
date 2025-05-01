import React from "react"


const EventList = ({ events, updateEvent, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_event/${id}`, options);
            if (response.status == 200) {
                updateCallback();
            } else {
                console.error("failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    };


    return <div>
        <h2>Events</h2>
        <table>
            <thead>
                <tr>
                <th>Event Title</th>
                <th>Event Description</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event) => (
                    <tr key={event.id}>
                        <td>{event.eventTitle}</td>
                        <td>{event.eventDescription}</td>
                        <td>{event.eventDate}</td>
                        <td>
                            <button onClick={() => updateEvent(event)}>Update</button>
                            <button onClick={() => onDelete(event.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}


export default EventList