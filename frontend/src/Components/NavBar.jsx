import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (<>
    <Nav>
        <NavLink to='/'>
        {/* <img src='' alt='logo' /> */}
        <h1>Logo</h1>
        </NavLink>

        <Bars />

        <NavMenu>
            <NavLink to='/create_event' activeStyle>
                Create Event
            </NavLink>
            <NavLink to='/register' activeStyle>
                Sign Up
            </NavLink>
            <NavLink to='/login' activeStyle>
                Log In
            </NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to=''/>
        </NavBtn>
    </Nav>
  </>)
}

export default NavBar