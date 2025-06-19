import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '@/AuthContext';
import Background from '@/Components/Background'
import NavBar from '@/Components/NavBar'
import EventForm from '@/Components/EventForm';
import LoginForm from '@/Components/LoginForm'

const AddEventScreen = () => {
  const [isUpdating, SetIsUpdating] = useState(false);
  const currentlocation = useLocation();
  const { isAuthenticated } = useAuthContext(false)
  const redirectToCreateEvent = true

  useEffect(() => {
    const updatingScreen = currentlocation.pathname.includes('/edit_event/')
    SetIsUpdating(updatingScreen)
  }, [])


  return(<>

    {/* Background Effect */}
    <Background  />

    {/* NavBar */}
    <NavBar />


    {isAuthenticated
      ? <EventForm isUpdating={isUpdating} />
      : (<div className="w-full flex items-center justify-center" style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
          <LoginForm redirectToCreateEvent />
        </div>)
    }


  </>)

}

export default AddEventScreen