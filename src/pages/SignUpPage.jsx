import React from 'react'
import SignUp from '../componants/SignUp/SignUp'
import Navbar from '../componants/Navbar/Navbar'
import Background from '../componants/Background'
import './Login.css'

function SignUpPage() {
  return (
    <>
    <Navbar/>
    <div >
      <Background/>
      <SignUp className="signup " />
    </div>
    </>
  )
}

export default SignUpPage
