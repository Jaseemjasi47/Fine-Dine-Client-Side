import React, { useState, useEffect } from 'react'
import {axiosInstance} from '../../api/apiConfigurations';
import { MDBSpinner } from 'mdb-react-ui-kit';


function TopRatedFoods() {

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchFoodsData = async () => {
            try {
              const response = await axiosInstance.get(`Restaurants/topratedfoods/`);
              console.log(response, 'response');
              setFoods(response.data);
              console.log(response.data, "------------------------foods----------------------");
              setLoading(false);
            } catch (error) {
              console.error('Error fetching foods data:', error);
              setLoading(false);
                setFetchError(true)
            }
          };
          fetchFoodsData();

    },[]);

    if (loading && foods.length === 0 ) {
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
    <>
    <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-4 p-5">
            {foods.map((food) => (
              <div className="col-lg-6" key={food.id}>
                <div className="d-flex align-items-center">
                  <img
                    className="flex-shrink-0 img-fluid rounded"
                    src={`${axiosInstance.defaults.baseURL}${food.image}`}
                    alt={food.name}
                    style={{ width: "100px" }}
                  />
                  <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                      <span>{food.name}</span>
                      <span className="text-primary"><i className="fa fa-star" aria-hidden="true"></i>{food.ratings}</span>
                    </h5>
                    <small className="fst-italic">₹{food.price}</small>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
    </div>
    </>
  )
}

export default TopRatedFoods
