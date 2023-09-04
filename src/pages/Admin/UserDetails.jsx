import React, { useState, useEffect } from "react";
import { axiosAuthorized } from "../../api/apiConfigurations";
import Sidebar from "../../componants/Admin/Sidebar";
import { MDBSpinner } from "mdb-react-ui-kit";
import "../../componants/Admin/Style.css";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosAuthorized.get(`Restaurants/users/`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination button clicks
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <Sidebar />
      <div className="admin-content bg-white overflow-hidden">
        <div className="m-3">
          <h1 className="text-uppercase text-center">User Details</h1>
          <table className="table table-striped table-dark">
            <thead>
              <tr className="text-uppercase">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {loading && (
              <>
                  <th scope="row">
                    <div className="text-center d-flex justify-content-center align-items-center my-5">
                      <MDBSpinner grow className="" color="warning">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  </th>
                  <th>
                    <div className="text-center d-flex justify-content-center align-items-center my-5">
                      <MDBSpinner grow className="mx-2" color="warning">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  </th>
                  <th>
                    <div className="text-center d-flex justify-content-center align-items-center my-5">
                      <MDBSpinner grow className="mx-2" color="warning">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  </th>
                  <th>
                    <div className="text-center d-flex justify-content-center align-items-center my-5">
                      <MDBSpinner grow className="mx-2" color="warning">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  </th>
                  <th>
                    <div className="text-center d-flex justify-content-center align-items-center my-5">
                      <MDBSpinner grow className="mx-2" color="warning">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  </th>
              </>
            )}
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.is_admin ? "Admin" : user.is_staff ? "Owner" : "User"}
                  </td>
                  <td>
                    {user.is_admin ? (
                      ""
                    ) : user.is_staff ? (
                      <>
                        {" "}
                        <div className="btn btn-danger">
                          <i className="fa fa-ban" aria-hidden="true"></i>
                        </div>{" "}
                        <div className="btn btn-success">
                          <i className="fa fa-building" aria-hidden="true"></i>
                        </div>{" "}
                      </>
                    ) : (
                      <div className="btn btn-danger">
                        <i className="fa fa-ban" aria-hidden="true"></i>
                      </div>
                    )}{" "}
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
              disabled={indexOfLastItem >= users.length}
            >
              Next
            </button>
          </div>
        </div>
        <div style={{ height: "100px" }} />
      </div>
    </>
  );
}

export default UserDetails;
