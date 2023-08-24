import React, { useState } from "react";
import { axiosInstance } from "../../api/apiConfigurations";
import { toast } from "react-toastify";

function AddFoodModal({ restaurantId, onClose, onAddFood }) {
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
    restaurant: restaurantId,
  });

  const handleInputChange = (event, field) => {
    const newValue = event.target.value;
    setNewFood({ ...newFood, [field]: newValue });
  };

  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    setNewFood({ ...newFood, image: newImage });
  };

  const handleAddFood = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object and append form fields
    const formData = new FormData();
    formData.append("name", newFood.name);
    formData.append("price", newFood.price);
    formData.append("image", newFood.image);
    formData.append("description", newFood.description);
    formData.append("restaurant", restaurantId);

    try {
      const response = await axiosInstance.post(`Restaurants/create-food/`, formData); // Adjust the API URL

      if (response.status === 201) {
        onAddFood(response.data);
        setNewFood({
          name: "",
          price: "",
          image: null,
          description: "",
        });
        onClose();
      }

      toast.success('Added Successfully')
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error('Added Failed')
      // Handle error if needed
    }
  };

  // ...

  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content shadow-lg">
          <form onSubmit={handleAddFood}> {/* Change to form element */}
            <div className="modal-header">
              <h5 className="modal-title">Add Food</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Food Name"
                value={newFood.name}
                onChange={(e) => handleInputChange(e, "name")}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Food Price"
                value={newFood.price}
                onChange={(e) => handleInputChange(e, "price")}
                required
              />
              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <textarea
                className="form-control mb-3"
                placeholder="Food Description"
                value={newFood.description}
                onChange={(e) => handleInputChange(e, "description")} 
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Food</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFoodModal;