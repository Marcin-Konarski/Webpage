import React, { useEffect, useRef } from 'react'
import { NavLink } from "react-router-dom";
import { cn } from '@/lib/utils'
import VanillaTilt from 'vanilla-tilt'


const EventCard = ({ event, buttonText}) => { //id, title, description, image,
  const tiltRef = useRef(null);
  
  useEffect(() => {
    if (typeof VanillaTilt === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.0/dist/vanilla-tilt.min.js'
      script.async = true;
      script.onload = () => initTilt();
      document.body.appendChild(script);
    } else {
      initTilt()
    }


    function initTilt() {
      if (tiltRef.current) {
        VanillaTilt.init(tiltRef.current, {
          max: 4,
          transition: true,
          easing: "cubic-bezier(.03,.98,.52,.99)",
        });
      }
      // Clean up the effect when component unmounts
      return () => {
        if (tiltRef.current && tiltRef.current.vanillaTilt) {
          tiltRef.current.vanillaTilt.destroy();
        }
      };
    }
  }, [])


  return (<>

    <div className="card" ref={tiltRef}>

        {/* Image */}
        <div className="relative h-56 m-2.5 overflow-hidden">
            <img className={cn("w-full h-full p-2 rounded-xl object-cover transition-transform duration-500",
                                "ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110")} 
                src={event.imagePath} alt="event image" />
        </div>

        {/* Title and Description */}
        <div className="p-4">
            <h6 className="mb-2 text-white text-2xl font-bold truncate overflow-hidden whitespace-nowrap">
              {event.eventTitle}
            </h6>
            <p className="text-white leading-normal font-medium truncate overflow-hidden whitespace-nowrap">
              {event.eventDescription}
            </p>
        </div>

        {/* Button */}
        <div className="px-4 pb-4 pt-0 mt-2">
            <NavLink 
              className={({ isActive }) => 
                `rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md
                hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none
                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                  isActive ? 'text-primary-700 ' : ''}`}
              to={`event/${event.id}`}>
                  {buttonText}
            </NavLink>

        </div>
    </div>

  </>)
}

export default EventCard