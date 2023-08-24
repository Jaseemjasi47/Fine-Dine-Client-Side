import React, { useState } from 'react'
import { axiosInstance } from "../../api/apiConfigurations";
import { toast } from "react-toastify";

function AddTableModal({ restaurantId, onClose, onAddTable }) {


    const [newTable, setNewTable] = useState({
        table_number: "",
        seat_capacity: "",
        description: "",
        restaurant: restaurantId,
      });
    
      const handleInputChange = (event, field) => {
        const newValue = event.target.value;
        setNewTable({ ...newTable, [field]: newValue });
      };

    const handleAddTable = async (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        // Create a FormData object and append form fields
        const formData = new FormData();
        formData.append("table_number", newTable.table_number);
        formData.append("seat_capacity", newTable.seat_capacity);
        formData.append("description", newTable.description);
        formData.append("restaurant", restaurantId);
    
        try {
          const response = await axiosInstance.post(`Restaurants/create-table/`, formData); // Adjust the API URL
    
          if (response.status === 201) {
            onAddTable(response.data);
            setNewTable({
                table_number: "",
                seat_capacity: "",
                description: "",
                restaurant: restaurantId,
            });
            onClose();
          }
    
          toast.success('Added Successfully')
        } catch (error) {
          console.error("Error adding Table:", error);
          toast.error(error.response.data.error)
          // Handle error if needed
        }
      };
    




  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content shadow-lg">
          <form onSubmit={handleAddTable}> {/* Change to form element */}
            <div className="modal-header">
              <h5 className="modal-title">Add Table</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Table Numder"
                value={newTable.table_number}
                onChange={(e) => handleInputChange(e, "table_number")}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Seat Capacity"
                value={newTable.seat_capacity}
                onChange={(e) => handleInputChange(e, "seat_capacity")}
                required
              />
              <textarea
                className="form-control mb-3"
                placeholder="Table Description"
                value={newTable.description}
                onChange={(e) => handleInputChange(e, "description")} 
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Table</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTableModal
