import React, { useState, useEffect } from "react";
import Navbar from "../componants/Navbar/Navbar";
import { axiosInstance } from "../api/apiConfigurations";
import { MDBSpinner } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function BookingPage() {
  const [selectedTable, setSelectedTable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [resName, setResName] = useState("");
  const [id, setId] = useState(null);
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedData } = location.state;
  

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [selectedFoodsWithQuantity, setSelectedFoodsWithQuantity] = useState(
    []
  );
  const getSelectedFoodQuantity = (foodId) => {
    const selectedFood = selectedFoodsWithQuantity.find(
      (item) => item.foodId === foodId
    );
    return selectedFood ? selectedFood.quantity : 1;
  };

  // Handler for food selection
  const handleFoodSelection = (event, food) => {
    const foodId = food.id;

    if (event.target.checked) {
      // Add food to selected foods
      setSelectedFoodsWithQuantity((prevState) => [
        ...prevState,
        { foodId, quantity: 1 },
      ]);
    } else {
      // Remove food from selected foods
      const newSelectedFoods = selectedFoodsWithQuantity.filter(
        (item) => item.foodId !== foodId
      );
      setSelectedFoodsWithQuantity(newSelectedFoods);
    }
  };

  // Handler for quantity change
  const handleQuantityChange = (event, food) => {
    const foodId = food.id;
    const newQuantity = parseInt(event.target.value, 10);

    setSelectedFoodsWithQuantity((prevState) =>
      prevState.map((item) =>
        item.foodId === foodId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
      // Set the selected data to the component state
      setSelectedTable(selectedData.selectedTables);
      setSelectedDate(selectedData.selectedDate);
      setSelectedTime(selectedData.selectedTime);
      setSelectedFoods(selectedData.selectedFoods);
      setResName(selectedData.resname);

      const handleSelectedTables = async (selectedTables) => {
        try {
          // Assuming your Django API endpoint is at /api/tables/
          const response = await axiosInstance.post(
            "Restaurants/selectedtables/",
            { tableIds: selectedTables }
          );
          // Assuming the API returns an array of table data
          const tableData = response.data;
          setSelectedTable(tableData);
          console.log(tableData, "0000000000000000000000000000000000000");
          setId(tableData[0].restaurant_id);
          // Do something with the table data received from the backend
          // setSelectedTable(selectedTables);
        } catch (error) {
          // Handle errors if the request fails
          console.error("Error fetching table data:", error);
        }
      };

      handleSelectedTables(selectedData.selectedTables); // Call the function with selectedTables

  }, []);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoodsData = async () => {
      try {
        const response = await axiosInstance.get(
          `Restaurants/restaurant_foods/${id}/`
        );
        setFoods(response.data);
        console.log(
          response.data,
          "------------------------foods----------------------"
        );
      } catch (error) {
        console.error("Error fetching foods data:", error);
      }
    };

    fetchFoodsData();
  }, [id]);

  const getTotalAmount = () => {
    let totalAmount = 0;
    selectedFoodsWithQuantity.forEach((item) => {
      const food = foods.find((f) => f.id === item.foodId);
      const totalPrice = food.price * item.quantity;
      totalAmount += totalPrice;
    });
    return totalAmount;
  };

  const [reservationId, setReservationId] = useState(null);

  const handleConfirmation = async () => {
    const totalAmount = getTotalAmount();
    // Prepare the selected food data for backend
    const selectedFoodData = selectedFoodsWithQuantity.map((item) => ({
      foodId: item.foodId,
      quantity: item.quantity,
    }));

    try {
      // Send the selected food data to your backend API
      const response = await axiosInstance.post(
        "Restaurants/create-reservation/",
        {
          selectedTable,
          selectedDate,
          selectedTime,
          selectedFoodData, // Pass the selected food data here
          user,
          totalAmount,
        }
      );

      // Handle success or show a confirmation message
      console.log("Booking confirmed!", response.data);
      setReservationId(response.data.id);
      toast.success("Booking confirmed!");
      if (hasSelectedFoods) {
        setIsBookingConfirmed(true);
      } else {
        navigate("/profile");
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error confirming booking:", error);
      toast.error("Booking Not Success");
    }
  };

  const isSelectedFood = (foodId) => {
    return selectedFoodsWithQuantity.some((item) => item.foodId === foodId);
  };

  const handleQuantityChangeCustom = (food, change) => {
    const foodId = food.id;
    const newQuantity = Math.max(1, getSelectedFoodQuantity(foodId) + change);

    setSelectedFoodsWithQuantity((prevState) =>
      prevState.map((item) =>
        item.foodId === foodId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const hasSelectedFoods = selectedFoodsWithQuantity.length > 0;
  return (
    <>
      <Navbar />
      <div className=" bg-white overflow-hidden">
        <div className="row col-lg-12 justify-content-center mb-5">
          <div className="text-center m-3">
            <h1 className="section-title ff-secondary text-primary">
              Booking Details
            </h1>
          </div>
          <div className="booking-form ml-3 text-uppercase col">
            <h3 className="my-3 text-center"> {resName}</h3>
            <div className="selected-table-details text-uppercase">
              <h4 className="mb-3 ">Selected Tables :</h4>
              <div className="row ">
                {selectedTable.length > 0 ? (
                  selectedTable.map((table) => (
                    <div
                      key={table.id}
                      className="col ml-3 mb-2 table-card pt-4 text-center "
                      style={{ userSelect: 'none' }}
                    >
                      <h6>Table Number:</h6>
                      <p className="">{table.table_number}</p>
                      <h6>Seat Capacity:</h6>
                      <p className="">{table.seat_capacity}</p>
                    </div>
                  ))
                ) : (
                  <div>No tables selected</div>
                )}
              </div>
            </div>
            <div className="my-3">
              <h4 className="my-3">Date and Time</h4>
              <div className="date-time-selection mt-3">
                <div className="row">
                  <h6 className="col ml-5">Date:</h6>
                  <p className="col mr-5">{selectedDate}</p>
                </div>
                <div className="row">
                  <h6 className="col ml-5">Time_slot:</h6>
                  <p className="col mr-5">{selectedTime}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className=" mx-5 py-5 text-center">
              {/* Payment component */}
              <h2 className="section-title ff-secondary text-primary">
                Pre book your foods
              </h2>
            </div>
            <div className="restaurant-foods">
              {foods ? (
                <div className="tab-content">
                  <div id="tab-1" className="tab-pane fade show p-0 active">
                    <div className="row g-4 px-5 pb-5">
                      {foods.map((food) => (
                        <div className="col-lg-6" key={food.id}>
                          <div className="d-flex align-items-center">
                            {/* Checkbox for food selection */}
                            <label htmlFor={`food-${food.id}`}>
                              <input
                                type="checkbox"
                                id={`food-${food.id}`}
                                checked={isSelectedFood(food.id)}
                                onChange={(e) => handleFoodSelection(e, food)}
                              />
                              <img
                                className="flex-shrink-0 img-fluid rounded"
                                src={food.image}
                                alt={food.name}
                                style={{ width: "100px", cursor: "pointer" }}
                              />
                            </label>
                            <div className="w-100 d-flex flex-column text-start ps-4">
                              <h5 className="d-flex justify-content-between border-bottom pb-2">
                                <span>{food.name}</span>
                              </h5>
                            </div>
                          </div>
                          <span className="text-primary">₹{food.price}</span>

                          {isSelectedFood(food.id) && (
                            <div className="mt-2">
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  handleQuantityChangeCustom(food, -1)
                                }
                              >
                                -
                              </button>
                              <input
                                className="w-50"
                                type="number"
                                min="1"
                                value={getSelectedFoodQuantity(food.id)}
                                onChange={(e) => handleQuantityChange(e, food)}
                                onKeyDown={(e) => e.preventDefault()} // Prevent manual typing
                                onWheel={(e) => e.preventDefault()} // Prevent scrolling
                                step="1" // Increment or decrement by one
                              />

                              {/* <span>{getSelectedFoodQuantity(food.id)}</span> */}
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  handleQuantityChangeCustom(food, 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="selected-foods">
                    <h4 className="mt-3">Selected Foods:</h4>

                    <ul>
                      {selectedFoodsWithQuantity.map((item) => {
                        const food = foods.find((f) => f.id === item.foodId);
                        const totalPrice = food.price * item.quantity;

                        return (
                          <li key={food.id}>
                            {food.name} - Quantity: {item.quantity}, Total
                            Price: ₹{totalPrice}
                          </li>
                        );
                      })}
                      <li>
                        <strong>Total Amount: ₹{getTotalAmount()}</strong>
                      </li>
                    </ul>
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
            </div>
            {/* --------- show if the user dose not prebook any foods -------- */}
            {isBookingConfirmed && hasSelectedFoods ? (
              <form
                action={`${axiosInstance.defaults.baseURL}/Restaurants/payment/`}
                method="post"
              >
                <input
                  type="hidden"
                  name="totalAmount"
                  value={getTotalAmount()}
                />{" "}
                {/* Pass the total amount */}
                <input type="hidden" name="id" value={reservationId} />
                <button
                  className="btn btn-primary d-flex m-5 justify-content-center"
                  type="submit"
                >
                  Make Payment
                </button>
              </form>
            ) : (
              <button
                className=" btn btn-primary d-flex m-5 justify-content-center"
                onClick={handleConfirmation}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
