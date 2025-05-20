import React from 'react'
import ThemeToggle from '@/Components/ThemeToggle'
import Background from '@/Components/Background'
import NavBar from '@/Components/NavBar'
import HeroSection from './HeroSection'
import EventsListSection from './EventsListSection'


const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      {/* <ThemeToggle /> */}


      {/* Background Effect */}
      <Background />


      {/* NavBar */}
      <NavBar />


      {/* Main Content */}
      <main>
        <HeroSection />
        <EventsListSection />
      </main>


      {/* Footer */}


    </div>
  )
}

export default HomeScreen