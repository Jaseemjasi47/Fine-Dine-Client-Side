import React from 'react'
import Sidebar from '../../componants/Admin/Sidebar'
import '../../componants/Admin/Style.css'

function AdminDashboard() {
  return (
    <>
    <Sidebar/>
      <div className='admin-content bg-white'>
        <div className="m-5">
          <h1>Dashboard</h1>
        </div>        
      </div>
    </>
  )
}

export default AdminDashboard
