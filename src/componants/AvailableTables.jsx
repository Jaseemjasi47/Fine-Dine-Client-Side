import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../api/apiConfigurations';
import { Link } from 'react-router-dom';
import { MDBSpinner } from 'mdb-react-ui-kit';

function AvailableTables({ location, hotel }) {
  const [availableRestaurants, setAvailableRestaurants] = useState([]);
  const hotelName = hotel.trim() ? hotel : `Located In ${location}`;
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // Function to fetch available restaurants data from the backend API
    const fetchAvailableRestaurants = async () => {
      try {
        const response = await axiosInstance.get('/Restaurants/available_restaurants/', {
          params: { name: hotel, place: location },
        });
        setAvailableRestaurants(response.data);
        console.log(availableRestaurants,"------------------------adata--------------");
        setLoading(false);
      } catch (error) {
        console.error('Error fetching available restaurants:', error);
        setLoading(false);
          setFetchError(true)
      }
    };

    // Call the fetch function
    fetchAvailableRestaurants();
  }, [location, hotel]);

  if (loading) {
    return <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
    <span className='visually-hidden'>Loading...</span>
  </MDBSpinner></div>;
  }
else if (fetchError) {
    return <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
    <span className='visually-hidden'>Loading...</span>
  </MDBSpinner>Please Reload To See The Data...</div>;
}

  return (
    <div>
        <div className="d-flex justify-content-center mt-5 align-items-center" >
            <div className="text-center">
                <h3>Available Restaurants</h3>
                <p>{hotelName}</p>
                {/* Display more information about the available tables */}
            </div>
        </div>
        <div className="tab-content " style={{
                  maxHeight: "60vh",
                  minWidth: "60vw",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}>
        <div id="tab-1" className="tab-pane fade show p-0 active">
          <div className="row g-4 p-5">
          {availableRestaurants.map((restaurant) => (
              <div className="col-lg-6" key={restaurant.id}>
                <Link to={`/restaurant/${restaurant.id}`}>
                <div className="d-flex align-items-center">
                  <img
                    className="flex-shrink-0 img-fluid rounded"
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={{ width: "100px" }}
                  />
                  <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                      <span>{restaurant.name}</span>
                      <span className="text-primary ml-3 row"><i class="fa fa-star row " aria-hidden="true"></i> {restaurant.ratings}</span>
                    </h5>
                    <small className="fst-italic">{restaurant.place}</small>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableTables;
