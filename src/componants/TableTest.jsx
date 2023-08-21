import React, { useState } from 'react';
import '../pages/Login.css';
import 'react-toastify/dist/ReactToastify.css';

function TableTest() {
  // Assuming you have information about the restaurant tables
  const tables = [
    { tableNumber: 1, seatCapacity: 4 },
    { tableNumber: 2, seatCapacity: 2 },
    { tableNumber: 3, seatCapacity: 6 },
    { tableNumber: 4, seatCapacity: 6 },
    { tableNumber: 5, seatCapacity: 6 },
    // Add more tables here as needed...
  ];

  const [selectedTables, setSelectedTables] = useState([]);

  const handleTableClick = (tableNumber) => {
    setSelectedTables((prevSelectedTables) => {
      // Check if the table is already selected
      const isTableSelected = prevSelectedTables.includes(tableNumber);

      if (isTableSelected) {
        // If the table is already selected, remove it from the selectedTables array
        return prevSelectedTables.filter((selectedTable) => selectedTable !== tableNumber);
      } else {
        // If the table is not selected, add it to the selectedTables array
        return [...prevSelectedTables, tableNumber];
      }
    });
  };

  return (
    <>
      <div className='bg-white text-align-centre'>
        <h1>Tables</h1>
        {/* Display the tables */}
        <div className="container">
          <div className="row m-5">
            {tables.map((table) => (
              <div
                key={table.tableNumber}
                className={`col-md-4 mb-5 ${selectedTables.includes(table.tableNumber) ? 'selected-table' : ''}`}
                onClick={() => handleTableClick(table.tableNumber)}
              >
                <div className={`table-card ${selectedTables.includes(table.tableNumber) ? 'selected' : ''}`}>
                  <p>Table Number: {table.tableNumber}</p>
                  <p>Seat Capacity: {table.seatCapacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TableTest;
