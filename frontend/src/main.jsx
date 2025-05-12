import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import HomeScreen from "./HomeScreen";
import AddEventScreen from "./AddEventScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import PageNotFound from "./PageNotFound";
import EventDeailsScreen from "./EventDetailsScreen";
import { EventProvider } from "./EventProvider";


  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeScreen />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '/event/:eventId',
          element: <EventDeailsScreen />,
        },
      ]
    },
    {
      path: '/create_event',
      element: <AddEventScreen />,
    },
    {
      path: '/login',
      element: <LoginScreen />,
    },
    {
      path: '/register',
      element: <RegisterScreen />,
    },
    
  ]);


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      {/* <EventProvider> */}
        <RouterProvider router={router} />
      {/* </EventProvider> */}
    </React.StrictMode>
  )