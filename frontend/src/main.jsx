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
    
  ]);


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <EventProvider>
          <RouterProvider router={router} />
        </EventProvider>
      </AuthProvider>
    </React.StrictMode>
  )