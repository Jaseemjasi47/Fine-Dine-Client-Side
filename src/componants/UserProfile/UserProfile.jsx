import React, { useState } from 'react';
import UserBookings from './UserBookings';
import { Link } from 'react-router-dom'

function UserProfile() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  

  return (
    <div className="container-xxl bg-white" style={{ height: '100vh' }}>
      <section className="mb-3">
      <div className="container" >
        <div className="justify-content-center" style={{ width: '100%' }}>
          <div className="">
            <div className=" my-3 ">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#0F172B', height: '200px', width: '90vw'  }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img
                    src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=360"
                    alt="Your Profile image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: '150px', zIndex: 1 }}
                  />
                  <Link to="/owner/register" className=" text-center border"  style={{ zIndex: 1, color: 'black' }}>
                    ADD YOUR RESTAURANT
                    </Link>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5 style={{color: 'white' }}>{user?.name}</h5>
                  <p className='text-primary ff-secondary'>{user?.email}</p>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa', width: '84vw' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div className='mx-3' >
                    <p className="mb-1 h5"></p>
                    <p className="small text-muted mb-0"></p>
                  </div>
                </div>
              </div>
              </div>
              <div className="p-4 text-black">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="lead fw-normal mb-0">Recent Bookings</p>
                  <p className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
    <UserBookings/>
    </div>
  );
}

export default UserProfile;
