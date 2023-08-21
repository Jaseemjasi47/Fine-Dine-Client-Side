import React, { useEffect, useState } from "react";
import "../Admin/Style.css";
import { axiosAuthorized } from "../../api/apiConfigurations";
import { toast } from "react-toastify";

function Bookings({ restaurantId, handleShowDetails }) {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from localStorage
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [confirmDecline, setConfirmDecline] = useState(false);
  const [reservationConfirmations, setReservationConfirmations] = useState({});

  

  const toggleConfirmDecline = (reservationId) => {
    setReservationConfirmations((prevState) => ({
      ...prevState,
      [reservationId]: !prevState[reservationId]
    }));
  };

  const fetchRestaurantsData = async () => {
    try {
      const response = await axiosAuthorized.get(
        `Restaurants/restaurants_bookings/${restaurantId}/`
      );
      setRestaurants(response.data);
      console.log(
        response.data,
        "------------------------res----------------------"
      );
    } catch (error) {
      console.error("Error fetching bookings data:", error);
    }
  };


  useEffect(() => {
    fetchRestaurantsData();
  }, [restaurantId]);


  const handleApproval = async (reservationId, newStatus) => {

    try {
      const response = await axiosAuthorized.post('Restaurants/update_reservation_status/', {
        reservation_id: reservationId,
        new_status: newStatus,
      });

      // Handle success or show a message to the user
      console.log(response.data.message);
      toast.success(response.data.message);
      fetchRestaurantsData();
    } catch (error) {
      // Handle error or show an error message
      toast.error('Status Update Failed');
      console.error('An error occurred:', error);
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination button clicks
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-content bg-white overflow-hidden">
      <div className="d-flex align-items-center justify-content-between">
        <div className="btn btn-primary m-3" onClick={handleShowDetails}>
          back
        </div>
        <h1 className="text-uppercase mr-5 mt-3 text-center">Bookings</h1>
        <div></div> {/* Empty div for spacing */}
      </div>
      <div className="m-3 ">
        <table className="table table-striped table-dark table-scroll">
          <thead>
            <tr className="text-uppercase">
              {/* <th scope='col'>Restaurant</th> */}
              <th scope="col">name</th>
              <th scope="col">Table no.</th>
              <th scope="col">date</th>
              <th scope="col">time</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment</th>
              <th scope="col">Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((restaurant) => (
              <tr key={restaurant.id}>
                {/* <th scope='row'>{restaurant.restaurant}</th> */}
                <td>{restaurant.user.name}</td>
                <td className="d-flex">
                  {restaurant.tables.map((table, index) => (
                    <p key={index}>({table.table_no})</p>
                  ))}
                </td>
                <td>{restaurant.tables[0].date}</td>
                <td>{restaurant.tables[0].time_slot}</td>
                <td>
                  {restaurant.totalAmount !== null &&
                  restaurant.totalAmount !== 0 ? (
                    `₹${restaurant.totalAmount}`
                  ) : (
                    <span>No Foods</span>
                  )}
                </td>
                <td>{restaurant.payment_status}</td>
                <td>
                  {restaurant.status === "pending" ? (
                    <>
                    <div
                  className="btn btn-success mr-3"
                  onClick={() => handleApproval(restaurant.id, 'Confirmed')}
                >
                  <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                </div>
                <div
                  className="btn btn-danger"
                  onClick={() => toggleConfirmDecline(restaurant.id)}
                >
                  <i className="fa fa-ban" aria-hidden="true"></i>
                </div>
                {reservationConfirmations[restaurant.id] && (
                      <div className="card-body">
                        <p className="card-text">
                          Are you sure you want to decline this reservation?
                        </p>
                        <button className="btn ml-2" onClick={() => toggleConfirmDecline(restaurant.id)}>No</button>
                        <button className="btn " onClick={() => handleApproval(restaurant.id, 'Declined')}>yes</button>
                      </div>
                )}
                  </>
                  ) : (
                    <>{restaurant.status}</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastItem >= restaurants.length}
          >
            Next
          </button>
        </div>
      </div>
      <div style={{ height: "100px" }} />
    </div>
  );
}

export default Bookings;
