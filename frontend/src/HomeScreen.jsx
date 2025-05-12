import React, { useEffect, useState } from 'react'
import EventCard from './Components/EventCard'
import { Link, Outlet } from "react-router-dom";
import { useEventContext } from './EventProvider';

const HomeScreen = () => {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const response = await fetch("http://127.0.0.1:5000/events")
    const data = await response.json()
    setEvents(data.events)
    console.log(data.events)
  }

  return (<>
    <h1 className="text-3xl font-bold mb-6 text-center">HomeScreen</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard 
          key={event.id}
          id={event.id}
          title={event.eventTitle}
          description={event.eventDescription}
          image={event.imagePath}
          buttonText="More"
        />
      ))}
    </div>
    
    {showModal &&(
      <div className="fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0">
        <Outlet />
        <div>
          <h2>event.eve</h2>
        </div>
      </div>
    )}
  </>)
}

export default HomeScreen