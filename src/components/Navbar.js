import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token, user }) => {
  return (
    <header>
      <nav>
        <Link to='/'><button id='navbar'>Home</button></Link>
        <Link to='/posts'><button id='navbar'>Posts</button></Link>
        
        
        {
          token ? 
          (
            <>
            
            <Link to='/profile'><button id='navbar'>Profile</button></Link>
            <Link to='/' onClick={ () => logout() }><button id='navbar'>Logout</button></Link>
            <h2 id='userName'>Hello, {user.username}!</h2>
            </>
          ) : (
            <>
              <Link to='/register'><button id='navbar'>Register</button></Link>
              <Link to='/login'><button id='navbar'>Login</button></Link>
            </>
          )
        }
      </nav>
    </header>
  )
}

export default Navbar;