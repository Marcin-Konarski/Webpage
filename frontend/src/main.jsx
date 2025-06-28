import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '@/index.css'
import HomeScreen from "@/Screens/HomeScreen";
import CreateEditEventScreen from "@/Screens/CreateEditEventScreen";
import LoginScreen from "@/Screens/LoginScreen";
import RegisterScreen from "@/Screens/RegisterScreen";
import PageNotFound from "@/Screens/PageNotFound";
import EventDeailsScreen from "@/Screens/EventDetailsScreen";
import { EventProvider } from "@/Context";
import { AuthProvider } from "./AuthContext";
import EmailConfirmation from "./Components/EmailConfirmation";


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
      element: <CreateEditEventScreen />,
    },
    {
      path: '/edit_event/:eventId',
      element: <CreateEditEventScreen />,
    },
    {
      path: '/login',
      element: <LoginScreen />,
    },
    {
      path: '/register',
      element: <RegisterScreen />,
    },
    {
      path: '/confirm/:token',
      element: <EmailConfirmation />,
    }
    
  ]);


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider key={window.location.href}>   {/* This ensures React remounts the provider whenever the URL changes (e.g., ?confirmed=success), so your re-auth logic triggers cleanly */}
        <EventProvider>
          <RouterProvider router={router} />
        </EventProvider>
      </AuthProvider>
    </React.StrictMode>
  )
