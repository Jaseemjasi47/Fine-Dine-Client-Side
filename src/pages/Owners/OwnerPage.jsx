import React, { useState } from 'react';
import '../../componants/Admin/Style.css';
import Details from '../../componants/Owner/Details';
import Bookings from '../../componants/Owner/Bookings';
import { Link } from 'react-router-dom';


function OwnerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showBookings, setShowBookings] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

 

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowDetails = () => {
    setShowDetails(true);
    setShowBookings(false);
    // setSidebarOpen(!sidebarOpen);
  };

  const handleShowBookings = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setShowDetails(false);
    setShowBookings(true);
    // setSidebarOpen(!sidebarOpen);
  };


  return (
    <>
      <div>
        <div className="bar">
          <h1 className="text-primary ">
            <i className="fa fa-utensils me-3"></i>FineDine
          </h1>
          <button className="toggle-btn" onClick={handleToggle}>
            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        <nav id="sidebar" className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
          <div className="sidebar-content">
            <ul className="sidebar-nav text-uppercase">
              <li className="sidebar-header">Dashbord</li>
              <li
                className={`nav-item sidebar-link nav-link ${
                  showDetails ? 'active' : ''
                }`}
                onClick={handleShowDetails}
              >
                <i class="fa fa-cutlery mr-3" aria-hidden="true"></i>Restaurant
              </li>
              {/* <li
                className={`nav-item sidebar-link nav-link ${
                  showBookings ? 'active' : ''
                }`}
                // onClick={handleShowBookings}
              >
                <i class="fa fa-columns mr-3" aria-hidden="true"></i>Bookings
              </li> */}
              <Link to="/" className='nav-item sidebar-link nav-link' >
            <i class="fa fa-backward mr-3" aria-hidden="true"></i>Site
            </Link>
            </ul>
          </div>
        </nav>
      </div>
      <div>
    {showDetails && <Details handleShowBookings={handleShowBookings} />}
    {showBookings && <Bookings restaurantId={selectedRestaurantId} handleShowDetails={handleShowDetails}  />}
  </div>
    </>
  );
}

export default OwnerPage;
