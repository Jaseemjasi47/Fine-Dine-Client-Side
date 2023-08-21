import React from 'react'
import SignUp from '../componants/SignUp/SignUp'
import Navbar from '../componants/Navbar/Navbar'
import Background from '../componants/Background'
import './Login.css'

function SignUpPage() {
  return (
    <div>
      <Background/>
      <Navbar/>
      <SignUp className="signup" />
    </div>
  )
}

export default SignUpPage
