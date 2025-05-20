import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import EventCard from '@/Components/EventCard'
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEventContext } from '@/Context';
import EventDeailsScreen from '@/Screens/EventDetailsScreen';
import { cn } from '@/lib/utils'
import { categories } from '@/lib/Constants'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const EventsListSection = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedcategory, setSelectedCategory] = useState([]);
  const { events, fetchEvents } = useEventContext();
  // displayingEvents - By default diaplay 12 evelnts. (devides by 4, 3 and 2 which are the number of columns for different screen sizes)
  // After clicking on a 'Show More' button there next 12 events will be displayed etc...
  const numberOfEventsOnScreen = 4
  const [displayingEvents, setDisplayingEvents] = useState(numberOfEventsOnScreen); 
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

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    navigate('#events');
  }

  // Sets the current event to the based on which button is clicked in order to show appropriate event details dialog
  const currentEvent = useMemo(() => {
    if(eventId && events?.length) {
      return events.find(event => event.id === eventId) || null;
    }
    return null;
  }, [events, eventId])

  const selectCategory = (e) => {
    // if (selectedcategory.includes(e)) { 
    //   setSelectedCategory(selectedcategory.filter((s) => s != e)) // Remove // IN THIS APPRACH THE STATE WILL UPDATE AFTER THE FUNCTION COMPLETES!
    // } else {
    //   setSelectedCategory([...selectedcategory, e]); // Add
    // }
    setSelectedCategory( prevSelectedCategory => { // IN THIS APPROACH I WORK WITH MOST CURRENT STATE OF THE VALUE SO THE STATE UPDATES IMIDIATELY!
      if (prevSelectedCategory.includes(e)) {
        return prevSelectedCategory.filter((p => p != e));
      } else {
        return [...prevSelectedCategory, e]
      }
    })
  };

  // Filters events and displaes only those that belong to the selectedcategory categories
  const filteredEvents = useMemo(() => {
    if (selectedcategory.length === 0) { // if no category selectedcategory than display all (returned list will be used to display events) 
      return events || [];
    }

    return events.filter( (event) => selectedcategory.includes(event.eventCategory) ); // filter only events that category maches those in the `selectedcategory` list

  }, [selectedcategory, events]);

  useEffect(() => {
    console.log(displayingEvents);
  }, [displayingEvents]);

  const showMoreEvents = () => {
    console.log("Show more button clicked");
    setDisplayingEvents((prev) => (prev + numberOfEventsOnScreen)); // this increases the number of displaying events
  };


  return (<>

    <div id="events" className="pt-24">

      {/* Category Selection Menu */}
      {/* slidesPerView and centerInsufficientSlides ensures snapping the last slide into view and prevent swiper from scrolling too far right*/}
      <Swiper className="flex max-w-screen-xl mb-10" slidesPerView="auto" 
            spaceBetween={8} slidesOffsetBefore={0} slidesOffsetAfter={0} centerInsufficientSlides={true}>
        {categories.map((category) =>
          <SwiperSlide key={category} onClick={() => selectCategory(category)}
                        className={cn("max-w-fit h-full px-2 pb-1 border border-white rounded-lg overflow-hidden shadow-2xl",
                        selectedcategory.includes(category)
                          ? "bg-gray-800/80 backdrop-brightness-200 border-gray-500"
                          : "bg-white/30 backdrop-blur-lg backdrop-brightness-150")}>
            {category}
          </SwiperSlide>)}
      </Swiper>

      {/* Event Cards */}
      {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 mx-20 */}
      <div className="container mx-auto flex flex-wrap justify-center gap-6 px-6">
        {filteredEvents.slice(0, displayingEvents).map((event) => (
          <EventCard key={event.id} event={event} buttonText="More" />
        ))}
      </div>

    </div>

    {filteredEvents.length > displayingEvents && ( 
      <div className="flex justify-center">
        <button onClick={() => console.log("hello")} className="">Show More</button>
      </div>
    )}




    {/* Dialog showing details */}
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