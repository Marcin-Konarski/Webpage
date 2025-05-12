import React, { createContext, useContext, useState} from 'react'

const EventContext = createContext()

export const useEventContext = () => useContext(EventContext)

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async() => {
    setIsLoading(true)
    try{
      const response = await fetch("http://127.0.0.1:5000/events");
      const data = await response.json();
      setEvents(data.events || []);
      return data.events;
    } catch (error) {
      console.log("Failed to fetch events: ", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventsById = async(id) => {
    const cachedEvent = events.find(event => event.id === id);
    if (cachedEvent){
      setSelectedEvent(cachedEvent);
      return cachedEvent;
    }

    setIsLoading(true)
    try{
      const response = await fetch(`http://127.0.0.1:5000/event/${id}`);
      const data = await response.json();
      setSelectedEvent(data);
      return data;
    } catch (error) {
      console.log(`failed to load event with id ${id}: `, error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const value = {
    events,
    setEvents,
    fetchEvents,
    selectedEvent,
    setSelectedEvent,
    fetchEventsById,
    isLoading
  }

  return (
    <EventContext.Provider value={ value }>
      {children}
    </EventContext.Provider>
  )
}

