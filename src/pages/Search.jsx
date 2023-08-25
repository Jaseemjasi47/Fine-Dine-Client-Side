import React, {useState} from 'react'
import Navbar from '../componants/Navbar/Navbar';
import Modal from '../componants/Modal';
import './Login.css'
import { toast } from 'react-toastify';
import AvailableTables from '../componants/AvailableTables';


function Search() {

  const [reservations, setReservations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');

  const handleReservation = (event) => {
    event.preventDefault();

    const newReservation = {
      status: 'Pending',
    };

    setReservations([...reservations, newReservation]);
    event.target.reset();
  };



  return (
    <>
    <Navbar />
    <div className='bg-white overflow-hidden'>
      <div className='row col-lg-12 '>
        <div className="col">
        {reservations.length > 0 && (
          <AvailableTables
            location={selectedLocation}
            hotel={selectedHotel}
          />
        )}
        </div>
        <div className={`container-xxl my-5 mt-5 ${reservations.length > 0 ? 'col' : ''}`}>
          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-8">
              <h2 className="text-center">Search Your Restaurants Here</h2>
              <form onSubmit={handleReservation}>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Search Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="hotel" className="form-label">
                    Search Hotel
                  </label>
                  <input
                    type="text"
                    id="hotel"
                    name="hotel"
                    className="form-control"
                    value={selectedHotel}
                    onChange={(e) => setSelectedHotel(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary float-right mt-3">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div> 
    </>
  );
}

export default Search;

