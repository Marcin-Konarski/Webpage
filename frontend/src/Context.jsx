import React, { createContext, useContext, useState} from 'react'

const EventContext = createContext(undefined);

export function useEventContext() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEventContext must be used within an EventProvider")
  }
  return context
}

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async() => {
    setIsLoading(true)
    try{
      const response = await fetch("http://127.0.0.1:5000/events", { credentials: "include" });
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

  const value = {
    events,
    setEvents,
    fetchEvents,
    isLoading
  }

  return (
    <EventContext.Provider value={ value }>
      {children}
    </EventContext.Provider>
  )
}

