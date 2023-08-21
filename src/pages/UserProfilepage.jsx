import React, {useState} from 'react'
import '../componants/Admin/Style.css'
import UserProfile from '../componants/UserProfile/UserProfile'
import UserBookings from '../componants/UserProfile/UserBookings';
import Navbar from '../componants/Navbar/Navbar';

function UserProfilepage() {



  return (
    <div>
      <Navbar/>
      <UserProfile/>
    </div>
  )
}

export default UserProfilepage
