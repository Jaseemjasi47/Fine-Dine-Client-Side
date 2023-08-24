import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../api/apiConfigurations";
import EditRestaurant from "./EditRestaurant";
import "../Admin/Style.css";

function Details({ handleShowBookings }) {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from localStorage
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const [showBookings, setShowBookings] = useState(false);

  const handleBookingsClick = (restaurantId) => {
    handleShowBookings(restaurantId); // Call the parent component's function to show Bookings
    setShowBookings(true); // Set showBookings to true here if needed
  };

  const [editingRestaurantId, setEditingRestaurantId] = useState(null);

  const handleEditClick = (restaurantId) => {
    setEditingRestaurantId(restaurantId);
  };

  const fetchRestaurantsData = async () => {
    console.log(
      user,
      "--------------------------------user--------------------"
    );
    try {
      const response = await axiosInstance.get(
        `Restaurants/user_restaurants/${user.email}/`
      );
      setRestaurants(response.data);
      console.log(
        response,
        "------------------------res----------------------"
      );
    } catch (error) {
      console.error("Error fetching restaurants data:", error);
    }
  };

  const handleGoBackFromEdit = () => {
    fetchRestaurantsData();
    setEditingRestaurantId(null);
  };

  useEffect(() => {
    fetchRestaurantsData();
  }, [user.id]);

  return (
    <div className="admin-content bg-white">
      {editingRestaurantId ? (
        <EditRestaurant
          restaurantId={editingRestaurantId}
          handleGoBack={handleGoBackFromEdit}
        />
      ) : (
        <>
          <h1 className="text-center text-uppercase mt-3">Restaurants
          <button className="btn btn-primary mr-3 float-end" onClick={() => {
      navigate('/owner/register');
    }}>
      Add Restaurant
    </button>
          </h1>
          <div
            id="tab-1"
            className="tab-pane fade show p-0 restaurant-container"
          >
            <div className="row g-4 p-5">
              {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                  <div key={restaurant.id} className="col-lg-6">
                    <div className="w-100 d-flex flex-column text-start ps-4">
                      <h5 className="d-flex justify-content-between border-bottom pb-2">
                        <span>{restaurant.name}</span>
                        <span className="text-primary">
                          <i className="fa fa-star" aria-hidden="true"></i>{" "}
                          {restaurant.ratings}
                        </span>
                      </h5>
                      <small className="fst-italic">
                        Location : {restaurant.place}
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid rounded"
                        src={restaurant.image}
                        alt={restaurant.name}
                        style={{ width: "150px" }}
                      />
                      <div className="description-container">
                        <p className="restaurant-description">
                          {restaurant.description}
                        </p>
                      </div>
                    </div>
                    {restaurant.status === "Approved" ? (
                      <div
                        className="btn btn-primary my-2"
                        onClick={() => handleBookingsClick(restaurant.id)}
                      >
                        Bookings
                      </div>
                    ) : (
                      <div className="btn btn-secondary my-2">
                        Restaurant is Not Approved
                      </div>
                    )}
                    <div
                      className="btn border my-2 float-end mr-2"
                      onClick={() => handleEditClick(restaurant.id)}
                    >
                      Edit
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
