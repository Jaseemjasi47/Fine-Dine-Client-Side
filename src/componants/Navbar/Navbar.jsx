import React from "react";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import { NavDropdown } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    dispatch(clearUser());
    navigate("/login");
  };

  // const handleBookingClick = () => {
  //   // console.log(users.name, "----------------user---------------------");
  //   navigate("/booking");
  // };

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const isLoginPage = location.pathname === "/login";
  console.log(user, "===================================");

  return (
    <div className="sticky">
      <nav className="navbar navbar-expand-lg navbar-dark nav-bg px-4 px-lg-5 py-3 py-lg-0 ">
        <a href="" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <i className="fa fa-utensils me-3"></i>FineDine
          </h1>
          {/* <img src="img/logo.png" alt="Logo"> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <Link
              to="/"
              className={`nav-item nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
            {/* <Link to="/" className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Service
              </Link> */}
            <Link
              to="/menu"
              className={`nav-item nav-link ${
                location.pathname === "/menu" ? "active" : ""
              }`}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className={`nav-item nav-link ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`nav-item nav-link ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>
            {isLoginPage && !token ? null : (
              <>
                {token ? (
                  <Link to="/Search" className="btn nav-btn btn-primary">
                    Find Table
                  </Link>
                ) : (
                  <Link to="/login" className="btn nav-btn btn-primary">
                    Find Table
                  </Link>
                )}
                {token && (
                  <NavDropdown title={user.name} id="pages-dropdown">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    {user.admin === "True" && (
                      <NavDropdown.Item as={Link} to="/admin/restaurants">
                        Admin Dashboard
                      </NavDropdown.Item>
                    )}
                    {user.staff === "True" && (
                      <NavDropdown.Item as={Link} to="/owner">
                        Owner Page
                      </NavDropdown.Item>
                    )}
                    {/* <NavDropdown.Item onClick={handleBookingClick}>
                      Booking
                    </NavDropdown.Item> */}
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
