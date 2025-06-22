import React from 'react'
import { X } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom';

const EventDeailsScreen = ({ event, onClose, isOwner=false }) => {
    if (!event) return <div>Event not found</div>;
    const navigate = useNavigate();


    return (
        <div className="relative">
            {/* Close button */}
            <button className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800" onClick={onClose}>
                <X size={24}/>
            </button>

            <h2 className="text-2xl font-bold mb-4">{event.eventTitle}</h2>

            {event.imagePath && (
                <img src={event.imagePath} alt={event.eventTitle} className="w-full h-64 object-cover mb-4 rounded"/>
            )}

            <p className="mb-3">{event.eventDescription}</p>

            {event.eventLocation && (
                <div className="mb-2">
                    <strong>Location:</strong> {event.eventLocation}
                </div>
            )}

            {event.eventCategory && (
                <div className="mb-2">
                    <strong>Category:</strong> {event.eventCategory}
                </div>
            )}

            {event.eventDate && (
                <div className="mb-2">
                    <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                </div>
            )}

            {isOwner &&
                <div className="mt-6 flex justify-end">
                    <button className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700" onClick={() => navigate(`/edit_event/${event.id}`)}>
                        Edit
                    </button>
                </div>
            }

            <div className="mt-6 flex justify-end">
                <button className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default EventDeailsScreen