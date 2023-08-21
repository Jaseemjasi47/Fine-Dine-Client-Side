import React from 'react'
import Navbar from '../../componants/Navbar/Navbar'
import {toast } from 'react-toastify';
import { axiosInstance } from '../../api/apiConfigurations';
import './Style.css'

function Register() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target);
    console.log('Form data being sent:', formData);

    try {
      // Make a POST request to the Django backend
      const response = await axiosInstance.post(`Restaurants/createrestaurants/`, formData);

      // Handle success, show success toast
      toast.success('Restaurant Form submitted successfully');
      console.log('Restaurant created successfully:', response.data);
    } catch (error) {
      // Handle error, show error toast
      toast.error('Email Not Found As a User');
      console.error('Error creating restaurant:', error);
    }
  };


  return (
    <div className='bg-white h-full-screen'>
    <Navbar/>   
    <div className="container owneregister">
      <div className="row  mb-5">
        <div className="col-md-6">
          <div className="card">
            <header className="card-header text-center">
              <h3 className="card-title mt-2 ">Register</h3>
            </header>
            <article className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Restaurant Name</label>
                <input type="text" className="form-control" name="name" placeholder="" required/>
              </div>

              <div className="form-group">
                <label>Restaurant Image</label>
                <input type="file" className="form-control" name="image" placeholder="" required/>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" className="form-control" name="place" placeholder=" "  required/>
              </div>

              <div className="form-group">
                <label>Restaurant Licence</label>
                <input type="file" className="form-control" name="license" placeholder="" required/>
                <small className="form-text text-muted">
                  We'll never share your details with anyone else.
                </small>
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" name="email" placeholder="" required/>
                <small className="form-text text-muted">
                  Enter the Email that you Signed In
                </small>
              </div>

              <div className="form-group">
                <label>Tell About Your Restaurant</label>
                <textarea className="form-control" name="description" placeholder="" required/>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
            </form>
            </article>
            {/* card-body end .// */}
          </div>
          {/* card.// */}
        </div>
        {/* col.// */}
      </div>
      {/* row.// */}
    </div>
    </div>
  )
}

export default Register
