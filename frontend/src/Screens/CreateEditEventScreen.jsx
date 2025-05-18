import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import EventForm from '@/Components/EventForm';

const AddEventScreen = () => {
  const [isUpdating, SetIsUpdating] = useState(false);
  const currentlocation = useLocation();

  useEffect(() => {
    const updatingScreen = currentlocation.pathname.includes('/edit_event/')
    SetIsUpdating(updatingScreen)
  }, [])


  return (<>
    <div className="modal">
      <div className="modal-content">
        <EventForm isUpdating={isUpdating} />
      </div>
    </div>

  </>)
}

export default AddEventScreen