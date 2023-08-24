import React from 'react'
import Navbar from '../../componants/Navbar/Navbar'
import {toast } from 'react-toastify';
import { axiosInstance } from '../../api/apiConfigurations';
import './Style.css'

function Register() {

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get form data
    const formData = new FormData();
    formData.append('name', event.target.name.value);
    formData.append('place', event.target.place.value);
    formData.append('description', event.target.description.value);
    formData.append('owner', user.email);
    formData.append('image', event.target.image.files[0]);
    formData.append('license', event.target.license.files[0]);

    try {
      // Make a POST request to the Django backend
      const response = await axiosInstance.post('Restaurants/createrestaurants/', formData);
      // Handle success, show success toast
      toast.success('Restaurant Form submitted successfully');
      console.log('Restaurant created successfully:', response.data);
    } catch (error) {
      // Handle error, show error toast
      toast.error('Restaurant Form submitted Failed!');
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
