import React from 'react'
import { useParams } from 'react-router-dom'

const EventDeailsScreen = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>Event {params.eventId}</div>
    )
}

export default EventDeailsScreen