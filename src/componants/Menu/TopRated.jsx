import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {axiosInstance} from '../../api/apiConfigurations';
import { MDBSpinner } from 'mdb-react-ui-kit';

function TopRated() {
  const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchTopRatedRestaurants = async () => {
      try {
        const response = await axiosInstance.get(`Restaurants/top_rated_restaurants/`);
        setTopRatedRestaurants(response.data);
        setLoading(false);

        console.log(response.data,"--------------------data---------------");
      } catch (error) {
        console.error('Error fetching top-rated restaurants:', error);
        setLoading(false);
        setFetchError(true)
      }
    };

    // Call the fetch function
    fetchTopRatedRestaurants();
  }, []);

  if (loading) {
    return <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
    <span className='visually-hidden'>Loading...</span>
  </MDBSpinner></div>;
  }
else if (fetchError) {
    return <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
    <span className='visually-hidden'>Loading...</span>
  </MDBSpinner></div>;
}


  return (
    <div className="tab-content">
      <div id="tab-1" className="tab-pane fade show p-0 active">
        <div className="row g-4 p-5">
          {topRatedRestaurants.map((restaurant) => (
            <div className="col-lg-6" key={restaurant.id}>
              {/* Wrap the content inside the Link component */}
              <Link to={`/restaurant/${restaurant.id}`}>
                <div className="d-flex align-items-center">
                  <img
                    className="flex-shrink-0 img-fluid rounded"
                    src={`${axiosInstance.defaults.baseURL}${restaurant.image}`}
                    alt={restaurant.name}
                    style={{ width: "100px" }}
                  />
                  <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                      <span>{restaurant.name}</span>
                      <span className="text-primary">
                        <i className="fa fa-star" aria-hidden="true"></i> {restaurant.ratings}
                      </span>
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
  );
}

export default TopRated;
