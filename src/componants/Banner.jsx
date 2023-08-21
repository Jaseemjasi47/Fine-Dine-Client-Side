import React from 'react'
import '../css/bootstrap.min.css'
import '../css/style.css'
import { Link } from 'react-router-dom';

function Banner() {


  return (
    <div className="container-xxl pt-2 bg-dark hero-header">
        <div className="container ">
            <div className="row align-items-center g-5">
                <div className="col-lg-6 text-center text-lg-start">
                    <h1 className="display-3 text-white animated slide-in-left">Lock in Memorable Dining</h1>
                    <p className="text-white animated slide-in-left mb-4 pb-2">
                    Welcome to FineDine, where we redefine the art of dining. Immerse yourself in a world of culinary excellence, where every reservation guarantees an unforgettable journey for your taste buds. Discover a seamless and intuitive platform that puts the power of reservation at your fingertips. Whether you seek an intimate dinner for two or a grand celebration, FineDine ensures you secure the perfect table in just a few clicks.</p>
                    <Link to="/menu" className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft">Book A Table</Link>
                </div>
                <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                    <img className="img-fluid" src="/img/hero.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner
