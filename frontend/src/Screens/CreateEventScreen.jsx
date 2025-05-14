import React from 'react'
import EventForm from '../Components/EventForm';

const AddEventScreen = () => {


  return (<>
    <div className="modal">
      <div className="modal-content">
        <EventForm isUpdating={false} />
      </div>
    </div>

  </>)
}

export default AddEventScreen