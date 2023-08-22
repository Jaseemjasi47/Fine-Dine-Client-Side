import React, { useState, useEffect } from 'react';
import {axiosInstance} from '../api/apiConfigurations';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useParams
import Navbar from '../componants/Navbar/Navbar';
import { toast } from 'react-toastify';
import './Login.css'
import { MDBSpinner } from 'mdb-react-ui-kit';



function RestaurantPage() {
  const { id } = useParams(); // Use useParams to get the restaurant ID
  const [restaurant, setRestaurant] = useState(null);
  const [resname, setResname] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  const navigate = useNavigate();

  const handleTableClick = (tableId) => {
    setSelectedTables((prevSelectedTables) => {
      // Check if the tableId is already in the selectedTables state
      const isTableSelected = prevSelectedTables.includes(tableId);
  
      if (isTableSelected) {
        // If the table is already selected, remove it from the state
        return prevSelectedTables.filter((id) => id !== tableId);
      } else {
        // If the table is not selected, add it to the state
        return [...prevSelectedTables, tableId];
      }
    });
    console.log(selectedTables,'===================selectedTables===========');
  };

  const handleDateTimeChange = (event) => {
    const { name, value } = event.target;
    if (name === 'date') {
      setSelectedDate(value);
    } else if (name === 'time') {
      setSelectedTime(value);
    }
  };



  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axiosInstance.get(`Restaurants/restaurant_detail/`,{params: { id: id },});
        setRestaurant(response.data); // Assuming the API response returns the restaurant data
        setResname(response.data['name']);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoodsData = async () => {
      try {
        const response = await axiosInstance.get(`Restaurants/restaurant_foods/${id}/`);
        setFoods(response.data);
        console.log(response.data, "------------------------foods----------------------");
      } catch (error) {
        console.error('Error fetching foods data:', error);
      }
    };

    fetchFoodsData();

  }, [id]);

    useEffect(() => {

    const fetchTablesData = async () => {
      try {
        if (selectedDate && selectedTime) {
          const response = await axiosInstance.get(`Restaurants/restaurants_tables/${id}/`, {
            params: { date: selectedDate, time: selectedTime },
          });
          setTables(response.data);
          setSelectedTables([]);
          console.log('==================its working======================');
        } else {
          // Fetch tables for the current time (1 hour after the current time) as the default behavior
          const currentTime = new Date();
          currentTime.setHours(currentTime.getHours() + 6); // Add 5 hours to the current time
          currentTime.setMinutes(currentTime.getMinutes() + 30);
          const formattedTime = currentTime.toISOString().slice(0, 16);
          const response = await axiosInstance.get(`Restaurants/restaurants_tables/${id}/`, {
            params: { date: formattedTime.slice(0, 10), time: formattedTime.slice(11) },
          });
          setTables(response.data);
          setSelectedDate(formattedTime.slice(0, 10)); // Set the default date
          setSelectedTime(formattedTime.slice(11)); // Set the default time
        }
      } catch (error) {
        console.error('Error fetching tables data:', error);
      }
    };

    fetchTablesData();
  }, [id, selectedDate, selectedTime]);


  const handleBookTable = () => {
    if (!user) {
      // Show a toast message if selectedTables is empty
      toast.error('Please Login');
      navigate('/login')
      return; // Return early and do not proceed further
    }

    if (selectedTables.length === 0) {
      // Show a toast message if selectedTables is empty
      toast.error('Please select a table');
      return; // Return early and do not proceed further
    }
    // You can create an object containing the selected data
    const selectedData = {
      selectedTables,
      selectedDate,
      selectedTime,
      resname,
      // selectedFoods,
    };
    navigate('/booking', { state: { selectedData } });
  };

 

  return (
    <>  
    <Navbar />
    <div className='bg-white overflow-hidden'>
      <div className='my-5 restaurant-details'>
        {restaurant ? (
            <>
            {/* <h1 className='restaurant-name m-5'>{restaurant.name}</h1> */}
          <div className='restaurant-image'>
            <img
              className='img-fluid rounded'
              src={restaurant.image}
              alt={restaurant.name}
            />
          </div>
              <div className='d-flex justify-content-between w-100 border-bottom py-2'>
                <h4 className='restaurant-name'>{restaurant.name}</h4>
                <span className='text-primary mr-5'>
                  <i className='fa fa-star' aria-hidden='true'></i> {restaurant.ratings}
                </span>
              </div>
              <div className='restaurant-place'>{restaurant.place}</div>
            </>
          ) : (
            <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner></div>
          )}
        
        <div className='restaurant-description mx-3 '>
          {restaurant ? <small className='fst-italic'>{restaurant.description}</small> : null}
        </div>
        <div className="text-center mt-3 w-100 wow fadeInUp" data-wow-delay="0.2s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Our </h5>
            <h1 className="">Foods</h1>
          </div>
          </div>
          {restaurant ? (
          <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">
          <div className="row g-4 px-5 pb-5">
            {/* Map through the foods */}
            {foods.map((food) => (
              <div className="col-lg-6" key={food.id}>
                <div className="d-flex align-items-center">
                  <img
                    className="flex-shrink-0 img-fluid rounded"
                    src={food.image}
                    alt={food.name}
                    style={{ width: "100px" }}
                  />
                  <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                      <span>{food.name}</span>
                      <span className="text-primary">₹{food.price}</span>
                    </h5>
                    <div className="restaurant-description">
                    <small className="fst-italic">{food.description}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
       ) : (
        <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
    <span className='visually-hidden'>Loading...</span>
  </MDBSpinner></div>
      ) }
      {/* table section  */}
      <div className=' mt-5'>
            <div className="text-center w-100  wow fadeInUp" data-wow-delay="0.2s">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">Choose Your</h5>
              <h1 className="">Tables</h1>
            </div>
            <div className='text-center mt-3 wow fadeInUp row' data-wow-delay='0.2s'>
              <div className='col mx-5 '>
            <label htmlFor="date" className="form-label">
                    Date
                  </label>
            <input type='date' name='date' value={selectedDate} className="form-control " onChange={handleDateTimeChange}  min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className='col mx-5' >
            <label htmlFor="time" className="form-label ">
                    Time
                  </label>
            <input type='time' name='time' value={selectedTime} className="form-control" onChange={handleDateTimeChange} />
            </div>
          </div>
            {/* Display the tables */}
            {restaurant ? (
            <div className="text-center row m-5">
              {tables.map((table) => (
                <div key={table.table_id} // Use the unique 'id' or primary key as the key
                className={`col-md-4 w-50 mb-3 ${selectedTables.includes(table.table_id) ? 'selected-table' : ''}`}>
                  {table.is_available ?
                    <div
                  onClick={() => handleTableClick(table.table_id)} // Pass 'id' to the handleTableClick function
                >
                  <div className={`table-card p-3 ${selectedTables.includes(table.table_id) ? 'selected' : ''}`}>
                    <h5>Table Number: {table.table_number}</h5>
                    <h6>Seat Capacity: {table.seat_capacity}</h6>
                     <h6>Available</h6> 
                  </div>
                  </div> :
                  <div>
                  <div className='not-available p-3 '>
                  <h5>Table Number: {table.table_number}</h5>
                  <h6>Seat Capacity: {table.seat_capacity}</h6>
                   <h6> Not Available</h6> 
                </div>
                </div>
                  }
                  </div>
              ))}
            </div>
            ) : (
              <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
              <span className='visually-hidden'>Loading...</span>
            </MDBSpinner></div>
          ) }
          </div>
          {/* table section end  */}
          <div className='mb-5 d-flex justify-content-center'>
          <a className="btn btn-primary" onClick={handleBookTable}>
          Book Table
        </a>
        </div>
    </div>
    </>
  );
}

export default RestaurantPage;
