import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api/apiConfigurations";
import { MDBSpinner } from "mdb-react-ui-kit";
import { toast } from "react-toastify";

function UserBookings() {
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  useEffect(() => {
    fetchUserReservations();
  }, []);

  const fetchUserReservations = async () => {
    try {
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);
      const email = user.email;

      const response = await axiosInstance.get(
        `Restaurants/user_reservations/?email=${email}`
      );
      setUserReservations(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user reservations:", error);
      setLoading(false);
      setFetchError(true);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReservations = userReservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle pagination button clicks
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleCancel = async (id) => {
    // Show an alert to confirm cancellation
    const confirmCancel = window.confirm("Are you sure you want to cancel this reservation?");
    
    if (confirmCancel) {
      try {
        const response = await axiosInstance.patch(`Restaurants/cancel_reservations/${id}/`);
        toast.success("Your Reservation is Cancelled");
        fetchUserReservations();
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user reservations:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5 ">
        {" "}
        <MDBSpinner grow className="mx-2 mt-5" color="warning">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  } else if (fetchError) {
    return (
      <div className="text-center my-5">
        {" "}
        <MDBSpinner grow className="mx-2 mt-5" color="warning">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }
  console.log(axiosInstance.defaults.baseURL, '\sdfsdf');
  return (
    <div className="tab-content">
      <div id="tab-1" className="tab-pane fade show p-0 active">
        <div className="row g-4 p-5">
          {currentReservations.map((reservation, index) => (
            <div key={index} className="col-lg-6">
              <div className="d-flex align-items-center">
                {/* Render the reservation details */}
                <img
                  className="flex-shrink-0 img-fluid rounded"
                  src={reservation.restaurant_image[0]}
                  alt={reservation.restaurant_image[1]}
                  style={{ width: "80px" }}
                />
                <div className="w-100 d-flex flex-column text-start ps-4">
                  <h5 className="d-flex justify-content-between border-bottom pb-2">
                    <span>{reservation.restaurant_image[1]}</span>
                    <span className="text-primary">{reservation.status}</span>
                  </h5>
                  {reservation.tables.map((table, index) => (
                    <div key={index}>
                      <small className="fst-italic">Date: {table.date}</small>
                      <small className="fst-italic mx-3">
                        Time: {table.time_slot}
                      </small>
                      <br />
                      <small className="fst-italic">
                        Table No.: {table.table_no}
                      </small>
                    </div>
                  ))}
                  {reservation.totalAmount === 0 ?  <> No Pre Booked Foods </> : <>

                  {reservation.payment_status === "pending" &&
                  !(reservation.status === "Cancelled") ? (
                    <>
                      <p>Amount: ₹{reservation.totalAmount}</p>
                      <form
                        action={`${axiosInstance.defaults.baseURL}/Restaurants/payment/`}
                        method="post"
                      >
                        <input
                          type="hidden"
                          name="totalAmount"
                          value={reservation.totalAmount}
                        />
                        <input type="hidden" name="id" value={reservation.id} />
                        <button
                          className="btn btn-primary d-flex justify-content-center"
                          type="submit"
                        >
                          Make Payment
                        </button>
                      </form>
                    </>
                  ) : (
                    <p>Amount: {reservation.payment_status}</p>
                  )}
                  </>}

                  {reservation.status === "pending" ? (
                    <>
                      <div
                        className="btn w-50 border m-2 d-flex justify-content-center"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        Cancel
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center pb-5">
        <button
          className="btn btn-primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="mx-3 pt-1">{currentPage}</span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={indexOfLastItem >= userReservations.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserBookings;
