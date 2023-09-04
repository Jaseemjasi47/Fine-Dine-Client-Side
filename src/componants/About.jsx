import React from 'react'
import Navbar from './Navbar/Navbar'
import { Link } from 'react-router-dom'


function About() {
  return (
    <>
    <Navbar/>
      <div className="container-xxl bg-white">
      <div className="container py-5 ">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="img/about-1.jpg"
                  alt="Image 1"
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="img/about-2.jpg"
                  alt="Image 2"
                  style={{ marginTop: '25%' }}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="img/about-3.jpg"
                  alt="Image 3"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="img/about-4.jpg"
                  alt="Image 4"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
            <h1 className="mb-4">Welcome to <i className="fa fa-utensils text-primary me-2"></i>FineDine</h1>
            <p className="mb-4">
            Welcome to FineDine, where we redefine the art of dining. Immerse yourself in a world of culinary excellence, where every reservation guarantees an unforgettable journey for your taste buds. Discover a seamless and intuitive platform that puts the power of reservation at your fingertips. 
            </p>
            <p className="mb-4">
            Whether you seek an intimate dinner for two or a grand celebration, FineDine ensures you secure the perfect table in just a few clicks.
            </p>
            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">
                    15
                  </h1>
                  <div className="ps-4">
                    <p className="mb-0">Years of</p>
                    <h6 className="text-uppercase mb-0">Experience</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                  <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">
                    50
                  </h1>
                  <div className="ps-4">
                    <p className="mb-0">Popular</p>
                    <h6 className="text-uppercase mb-0">Master Chefs</h6>
                  </div>
                </div>
              </div>
            </div>
            <a className="btn btn-primary py-3 px-5 mt-2">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default About
