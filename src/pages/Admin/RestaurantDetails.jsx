import React, { useState, useEffect } from "react";
import { axiosAuthorized, axiosInstance } from "../../api/apiConfigurations";
import Sidebar from "../../componants/Admin/Sidebar";
import { MDBSpinner } from 'mdb-react-ui-kit';
import "../../componants/Admin/Style.css";
import { toast } from "react-toastify";

function RestaurantDetails() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const itemsPerPage = 3; // Number of items to display per page
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosAuthorized.get(`Restaurants/restaurants/`);
      setRestaurants(response.data);
      setLoading(false);
      console.log(response.data, "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[---");
    } catch (error) {
      console.error("Error fetching restaurants:", error);
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

  const handleApproval = async (restaurantId, status) => {
    try {
      const response = await axiosAuthorized.patch(
        `Restaurants/change-status/${restaurantId}/`,
        {
          status: status,
          approved_by: user.email, // Replace with actual admin user
        }
      );
      toast.success("Modified");
      // Update the restaurants list or handle the response as needed
      fetchRestaurants();
    } catch (error) {
      console.error("Error updating restaurant status:", error);
      toast.error("ERROR");
    }
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <>
      <Sidebar />
      <div className="admin-content bg-white overflow-hidden">
        <div className="m-3">
          <h1 className="text-uppercase text-center">Restaurants</h1>
          <table className="table table-striped table-dark">
            <thead>
              <tr className="text-uppercase">
                <th scope="col">ID</th>
                <th scope="col">Restaurant</th>
                <th scope="col">Owner</th>
                <th scope="col">Location</th>
                <th scope="col">Approver</th>
              </tr>
            </thead>
            {loading && 
            <div className='text-center my-5' > <MDBSpinner grow className='mx-2' color='warning'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner></div>
}
            <tbody>
              {currentItems?.map((restaurant) => (
                <tr key={restaurant.id}>
                  <th scope="row">{restaurant.id}</th>
                  <td style={{ cursor: "pointer" }}>
                    <a
                      className="text-primary"
                      onClick={() => handleRestaurantClick(restaurant)}
                    >
                      {restaurant.name}
                    </a>
                  </td>
                  <td>{restaurant.owner.email}</td>
                  <td>{restaurant.place}</td>
                  <td>
                    {restaurant.approved_by ? (
                      restaurant.approved_by.name
                    ) : (
                      <>
                        <div
                          className="btn btn-success mr-3"
                          onClick={() =>
                            handleApproval(restaurant.id, "Approved")
                          }
                        >
                          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                        </div>
                        <div
                          className="btn btn-danger"
                          onClick={() =>
                            handleApproval(restaurant.id, "Declined")
                          }
                        >
                          <i className="fa fa-ban" aria-hidden="true"></i>
                        </div>
                      </>
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
      {selectedRestaurant && (
        <div className="">
          <div
            className="position-absolute"
            style={{ bottom: "5vh", left: "55%", transform: "translate(-50%)" }}
          >
            <div className="card w-100 mb-5 shadow-lg bg-white">
              <div
                className="card-body w-100"
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  backgroundColor: "white",
                }}
              >
                <span
                  className="position-fixed top-1 end-0 pr-3"
                  onClick={() => setSelectedRestaurant(null)}
                >
                  <i className="fa fa-close"></i>
                </span>
                {/* Render detailed card content */}
                <div>
                  <span className="h6">Name:</span> {selectedRestaurant.name}
                </div>
                <div>
                  <span className="h6">Owner:</span>{" "}
                  {selectedRestaurant.owner.name}
                </div>
                <div>
                  <span className="h6">Owner email:</span>{" "}
                  {selectedRestaurant.owner.email}
                </div>
                <div>
                  <span className="h6">Location:</span>{" "}
                  {selectedRestaurant.place}
                </div>
                <div>
                  <span className="h6">Status:</span>{" "}
                  {selectedRestaurant.status}
                </div>
                <div>
                  <span className="h6">Created Date and Time:</span>{" "}
                  {selectedRestaurant.created_date}
                </div>
                <div className="h6 mt-2">Description:</div>
                <div className="restaurant-description">
                  {" "}
                  {selectedRestaurant.description}
                </div>
                <div className="h6 my-2">
                  Restaurant:{" "}
                  <img
                    className="flex-shrink-0 img-fluid rounded"
                    src={selectedRestaurant.license}
                    alt={selectedRestaurant.name}
                    style={{ width: "200px" }}
                  />
                </div>
                {/* <div className="h6 my-2"> Restaurant: <img
                    className="flex-shrink-0 img-fluid rounded"
                    src={`${axiosInstance.defaults.baseURL}${selectedRestaurant.image}`}
                    alt={selectedRestaurant.name}
                    style={{ width: "200px" }}
                  /></div> */}
                {/* Include other restaurant details here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantDetails;
