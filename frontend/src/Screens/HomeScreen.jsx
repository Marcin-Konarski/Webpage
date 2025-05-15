import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import EventCard from '../Components/EventCard'
import { Outlet, NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { useEventContext } from '../Context';
import EventDeailsScreen from './EventDetailsScreen';
import NavBar from '../Components/NavBar';

const HomeScreen = () => {
  const [showDialog, setShowDialog] = useState(false);
  const {events, fetchEvents, isLoading } = useEventContext();
  const currentLocation = useLocation();
  const location = currentLocation.pathname.includes('/event/');
  const params = useParams();
  const eventId = parseInt(params.eventId);
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [])

  useEffect(() => {
    setShowDialog(location);
    toggleDialog();
  }, [location])

  function toggleDialog() {
    if (location && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }

  const currentEvent = useMemo(() => {
    if(eventId && events?.length) {
      return events.find(event => event.id === eventId) || null;
    }
    return null;
  }, [events, eventId])

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    navigate('/');
  }

  return (<>

    <NavLink 
        className={({ isActive }) => 
          `rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all
          shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700
          active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
          ${isActive ? 'text-primary-700 ' : ''}`}
        to={`login`}>
            Log In
    </NavLink>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {(events || []).map((event) => (
        <EventCard 
          key={event.id}
          event={event}
          buttonText="More"
        />
      ))}
    </div>

    <NavLink 
        className={({ isActive }) => 
          `rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all
          shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700
          active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
          ${isActive ? 'text-primary-700 ' : ''}`}
        to={`create_event`}>
            Add Event
    </NavLink>

    <dialog ref={dialogRef}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 rounded-lg shadow-xl backdrop:bg-black/50"
    onClose={handleCloseDialog}>
      {currentEvent ? (
        <EventDeailsScreen event={currentEvent} onClose={handleCloseDialog}/>
      ) : (
        <div className='center-text'><p>Loading...</p></div>
      )}
    </dialog>



  </>)
}

export default HomeScreen