import React from 'react'
import { NavLink } from "react-router-dom";

const EventCard = ({ event, buttonText}) => { //id, title, description, image,
  return (<>
    <div className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            <img className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110" 
                src={event.imagePath} alt="event image" />
        </div>
        <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {event.eventTitle}
            </h6>
            <p className="text-slate-600 leading-normal font-light">
            {event.eventDescription}
            </p>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2">
            <NavLink 
              className={({ isActive }) => 
                `rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                  isActive ? 'text-primary-700 ' : ''}`}
              to={`event/${event.id}`}>
                  {buttonText}
            </NavLink>
            <NavLink 
                className={({ isActive }) => 
                  `rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all
                  shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700
                  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                  ${isActive ? 'text-primary-700 ' : ''}`}
                to={`/edit_event/${event.id}`} isupdating="true" state={{ existingEvent: event }} >
                    Edit
            </NavLink>
            
        </div>
    </div>
  </>)
}

export default EventCard