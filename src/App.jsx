import { useState, useEffect } from 'react';
import './App.css';
import image1 from "./assets/Disenchantment_sunset_profile.jpg";

import EventList from './EventList/EventList';
import EventForm from './EventForm/EventForm';
import EventCard from './EventCard/EventCard';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import EventSlider from './eventSlider/EventSlider';

function App() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false) // this is for updating the contacts
  const [currentEvent, setCurrentEvent] = useState({}) // this is for editing contact (stores current contact to edit)

  useEffect(() => {
    fetchEvents()
  }, []);

  const fetchEvents = async () => {
    const response = await fetch("http://127.0.0.1:5000/events")
    const data = await response.json()
    setEvents(data.events)
    console.log(data.events)
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentEvent({})
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  };

  const openEditModal = (event) => {
    if (isModalOpen) return
    setCurrentEvent(event)
    setIsModalOpen(true)
  };

  const onUpdate = () => {
    closeModal()
    fetchEvents()
  };

  return(<>
    <EventList events={events} updateEvent={openEditModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}>Create New Event</button>
    { isModalOpen && <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <EventForm existingEvent={currentEvent} updateCallBack={onUpdate }/>
      </div>
    </div>
    }
    <div>
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          title={event.eventTitle} 
          description={event.eventDescription} 
          image={image1} 
        />
      ))}
    </div>
    <EventSlider events={events} />
  </>);

};

export default App
