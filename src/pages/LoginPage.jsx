import React from 'react'
import Navbar from '../componants/Navbar/Navbar'
import Login from '../componants/SignUp/Login'
import Background from '../componants/Background'
import './Login.css'

function Loginpage() {
  return (
    <div>
        <Background/>
        <Navbar/>
        <Login className="signup" />
    </div>
  )
}

export default Loginpage
