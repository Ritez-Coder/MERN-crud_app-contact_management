import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
     return (
          <div className='header'>

               <div className="container">

                    <div className='logo-div'>
                         <h1 className='logo'>MERN-APP</h1>
                    </div>

                    <nav className='navlinks'>
                         <NavLink className='link' to={"/"} >Contacts</NavLink>
                         <NavLink className='link' to={"/create-contact"} >Create Contact</NavLink>
                    </nav>
               </div>
          </div>
     )
}

export default Header
