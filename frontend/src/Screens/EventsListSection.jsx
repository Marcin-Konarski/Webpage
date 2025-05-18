import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import EventCard from '@/Components/EventCard'
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEventContext } from '@/Context';
import EventDeailsScreen from '@/Screens/EventDetailsScreen';


const EventsListSection = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { events, fetchEvents } = useEventContext();
  const currentLocation = useLocation();
  const location = currentLocation.pathname.includes(); // Here input the location of the screen that should contain this dialog
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

  // Sets the current event to the based on which button is clicked in order to show appropriate event details dialog
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
    navigate('#events');
  }



  return (<>

    {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 mx-20 */}
    <div id="events" className="container mx-auto flex flex-wrap justify-center gap-6 px-6 pt-14">
      {(events || []).map((event) => (
        <EventCard 
          key={event.id}
          event={event}
          buttonText="More"
        />
      ))}
    </div>


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

export default EventsListSection