import React from 'react'
import ThemeToggle from '@/Components/ThemeToggle'
import Background from '@/Components/Background'
import NavBar from '@/Components/NavBar'
import RegisterForm from '@/Components/RegisterForm'

const RegisterScreen = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Theme Toggle */}
      {/* <div className="z-[100]">
        <ThemeToggle />
      </div> */}


      {/* Background Effect */}
      <Background />

      {/* NavBar */}
      <NavBar />

      {/* Main Content */}
      <div className="w-full flex items-center justify-center mt-8 min-h-[calc(100vh-80px)]">
        <RegisterForm />
      </div>

      {/* Footer */}


    </div>
  )
}

export default RegisterScreen