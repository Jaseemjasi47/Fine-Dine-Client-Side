import React, { useEffect, useState } from "react";
import { axiosAuthorized, axiosInstance } from "../../api/apiConfigurations";
import { MDBSpinner } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import AddFoodModal from "./AddFoodModal";

function EditRestaurant({ restaurantId, handleGoBack }) {
  const [restaurant, setRestaurantDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [originalRestaurant, setOriginalRestaurant] = useState(null);
  const [addFoodModalVisible, setAddFoodModalVisible] = useState(false);

  const handleAddFood = (newFood) => {
    setFoods([...foods, newFood]);
  };


  const fetchFoodsData = async () => {
    try {
      const response = await axiosInstance.get(
        `Restaurants/restaurant_foods/${restaurantId}/`
      );
      setFoods(response.data);
      setOriginalFoods(response.data);
      console.log(
        response.data,
        "------------------------foods----------------------"
      );
    } catch (error) {
      console.error("Error fetching foods data:", error);
    }
  };


  const fetchRestaurantDetails = async () => {
    try {
      const response = await axiosAuthorized.get(
        `Restaurants/restaurant_detail/`,
        { params: { id: restaurantId } }
      );
      setRestaurantDetails(response.data);
      setOriginalRestaurant(response.data);
      console.log(
        response.data,
        "------------------------restaurant details----------------------"
      );
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };


  useEffect(() => {
    

    fetchRestaurantDetails();
    fetchFoodsData();
  }, [restaurantId]);

  const [foods, setFoods] = useState([]);
  const [originalFoods, setOriginalFoods] = useState([]);


  const handleEditModeToggle = () => {
    if (editMode) {
      // If exiting edit mode, reset the data to original
      setRestaurantDetails(originalRestaurant);
      setFoods(originalFoods);
    }
    setEditMode(!editMode);
  };
  const handleRestaurantInputChange = (event, field) => {
    const newValue = event.target.value;
    setRestaurantDetails({ ...restaurant, [field]: newValue });
  };

  const handleFoodInputChange = (event, index, field) => {
    const updatedFoods = [...foods];
    updatedFoods[index][field] = event.target.value;
    setFoods(updatedFoods);
  };

  const handleFoodImageChange = (event, index) => {
    const newImage = event.target.files[0];

    // Perform additional validation if needed

    const updatedFoods = [...foods];
    updatedFoods[index].image = newImage;
    setFoods(updatedFoods);
  };

  const handleRestaurantImageChange = (event) => {
    const newImage = event.target.files[0];

    // Perform additional validation if needed

    setRestaurantDetails({ ...restaurant, image: newImage });
    console.log(restaurant,'pppppppppppppppppppppppppppppppppppp');
  };

  const handleSaveChanges = async () => {
    try {
      const updatedRestaurant = {
        id: restaurantId,
        name: restaurant.name,
        place: restaurant.place,
        description: restaurant.description,
      };
  
      // Append the restaurant image if it's changed
      if (restaurant.image) {
        updatedRestaurant.image = restaurant.image;
      }
  
      const updatedFoods = foods.map((food) => ({
        id: food.id,
        name: food.name,
        price: food.price,
        description: food.description,
      }));
  
      const formData = new FormData();
      formData.append('restaurant', JSON.stringify(updatedRestaurant));
  
      // Append the restaurant image file if it's changed
      if (restaurant.image) {
        formData.append('restaurant_image', restaurant.image);
      }
  
      updatedFoods.forEach((food) => {
        formData.append('foods[]', JSON.stringify(food)); // Use 'foods[]' instead of `foods[${food.id}]`
        if (food.image) {
          formData.append(`food_image_${food.id}`, food.image);
        }
      });
  
      const response = await axiosInstance.patch(
        `Restaurants/update_restaurant/${restaurantId}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status === 200) {
        toast.success('Edited Successfully');
        setEditMode(false);
        // Handle success, redirect or update UI as needed
      } else {
        toast.error('Error editing restaurant');
      }
    } catch (error) {
      console.error('Error editing restaurant:', error);
      toast.error('Error editing restaurant');
    }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        // Perform the delete operation
        await axiosAuthorized.delete(`Restaurants/delete-food/${id}/`);
        toast.success('Food Deleted Successfully')
        fetchRestaurantDetails();
        fetchFoodsData();
        // Optionally, you can also update your state or take other actions
      } catch (error) {
        console.error("Error deleting food:", error);
        toast.error('Delete Failed')
        // Handle error if needed
      }
    }
  };

  if (!restaurant) {
    return (
      <div>
        {" "}
        <div className="text-center my-5">
          {" "}
          <MDBSpinner grow className="mx-2" color="warning">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>{" "}
        <button
          className="btn btn-primary position-fixed bottom-0 end-0 m-3"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="restaurant-container">
      {/* Display the restaurant details for editing */}
      <h2 className="text-center mt-3">
        Edit Restaurant: {restaurant?.name}
        <button className="btn btn-primary ml-3" onClick={handleEditModeToggle}>
          {editMode ? "Cancel" : "Edit"}
        </button>
      </h2>




      {/* Editable mode */}
      {editMode ? (
        <>

{addFoodModalVisible && (
        <AddFoodModal
          onClose={() => setAddFoodModalVisible(false)}
          onAddFood={handleAddFood}
          restaurantId={restaurant?.id}
        />
      )}
          <div className="my-5 w-50 mx-auto text-center ">
            {/* Restaurant Details */}
            <div className="mb-3">
              <label htmlFor="restaurantName" className="form-label">
                Restaurant Name
              </label>
              <input
                type="text"
                className="form-control"
                id="restaurantName"
                value={restaurant?.name}
                onChange={(e) => handleRestaurantInputChange(e, "name")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="restaurantImage" className="form-label">
                Restaurant Image
              </label>
              <input
                type="file"
                className="form-control"
                id="restaurantImage"
                accept="image/*"
                onChange={handleRestaurantImageChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="restaurantPlace" className="form-label">
                Restaurant Loction
              </label>
              <input
                type="text"
                className="form-control"
                id="restaurantPlace"
                value={restaurant?.place}
                onChange={(e) => handleRestaurantInputChange(e, "place")}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="restaurantDescription" className="form-label">
                Restaurant Description
              </label>
              <textarea
                className="form-control"
                id="restaurantDescription"
                rows="6" // Adjust the number of rows as needed
                value={restaurant?.description}
                onChange={(e) => handleRestaurantInputChange(e, "description")}
              />
            </div>

            {/* Add more input fields for other restaurant details */}
            {/* ... */}
            <h3 className="" >Foods</h3>
            <div
            className="btn btn-primary"
            onClick={() => setAddFoodModalVisible(true)}
          >
            Add Food
          </div>
          </div>
          {/* Food Details */}
          <div className="row w-100">
            {foods.map((food, index) => (
              <div key={index} className="mb-3 col-lg-3 ">
                <label htmlFor={`foodName${index}`} className="form-label">
                  {index + 1}) Food Name
                </label>
                <span className="float-end" onClick={()=>handleDeleteFood(food.id)}><i className="fa fa-close"></i></span>
                <input
                  type="text"
                  className="form-control"
                  id={`foodName${index}`}
                  value={food.name}
                  onChange={(e) => handleFoodInputChange(e, index, "name")}
                />
                <label htmlFor={`foodPrice${index}`} className="form-label">
                  Food Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`foodPrice${index}`}
                  value={food.price}
                  onChange={(e) => handleFoodInputChange(e, index, "price")}
                />
                <div className="mb-3">
                  <label htmlFor={`foodImage${index}`} className="form-label">
                    Food Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id={`foodImage${index}`}
                    accept="image/*"
                    onChange={(e) => handleFoodImageChange(e, index)}
                  />
                </div>
                <label
                  htmlFor={`foodDescription${index}`}
                  className="form-label"
                >
                  Food Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id={`foodDescription${index}`}
                  value={food.description}
                  rows="4"
                  onChange={(e) =>
                    handleFoodInputChange(e, index, "description")
                  }
                />
                {/* Add more input fields for other food details */}
                {/* ... */}
              </div>
            ))}
          </div>
        </>





      ) : (
        <>
          <div className="my-5 restaurant-details">
            {restaurant ? (
              <>
                {/* <h1 className='restaurant-name m-5'>{restaurant.name}</h1> */}
                <div className="restaurant-image">
                  <img
                    className="img-fluid rounded"
                    src={restaurant.image}
                    alt=""
                  />
                </div>
                <div className="d-flex justify-content-between w-100 border-bottom py-2">
                  <h4 className="restaurant-name">{restaurant.name}</h4>
                  <span className="text-primary mr-5">
                    <i className="fa fa-star" aria-hidden="true"></i>{" "}
                    {restaurant.ratings}
                  </span>
                </div>
                <div className="restaurant-place">{restaurant.place}</div>
              </>
            ) : (
              <div className="text-center my-5">
                {" "}
                <MDBSpinner grow className="mx-2" color="warning">
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
              </div>
            )}

            <div className="restaurant-description mx-3 ">
              {restaurant ? (
                <small className="fst-italic">{restaurant.description}</small>
              ) : null}
            </div>
            <div
              className="text-center mt-3 w-100 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Restaurant
              </h5>
              <h1 className="">Foods</h1>
            </div>
          </div>
          {restaurant ? (
            <div className="tab-content overflow-hidden">
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
                            <small className="fst-italic">
                              {food.description}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center my-5">
              {" "}
              <MDBSpinner grow className="mx-2" color="warning">
                <span className="visually-hidden">Loading...</span>
              </MDBSpinner>
            </div>
          )}
        </>
      )}
      {editMode && (
        <button
          className="btn btn-primary position-fixed bottom-0 left-0 m-3"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      )}
      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-3"
        onClick={handleGoBack}
      >
        Go Back
      </button>
    </div>
  );
}

export default EditRestaurant;
