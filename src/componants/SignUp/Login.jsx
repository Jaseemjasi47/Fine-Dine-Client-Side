import React, { useState } from 'react';
import './SignUp.css';
import { axiosInstance } from '../../api/apiConfigurations';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../../store/userSlice';




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  // -----------------------------------Google--------------------


  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};

// ---------------------------end-----------------------------------------

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post('/api/token/', data);

      // Handle success response
      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const user = response.data.user;
        // Save the token in local storage
        // Replace this with the actual JWT token received from the backend
        console.log(user,"------------------------user------------------------");
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser(user));
        // Redirect to home page or perform other actions
        toast.success("Login Success")
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error response

        toast.error("Invalid email or password")
        console.error('Error:', error.response.data.message);
      } else {
        // Handle other errors
        toast.error("Login Failed")
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <div className="container col-sm-12">
        <div className="d-flex justify-content-center">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fab fa-google"></i>
                </span>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />Remember Me
                </div>
                <div className="form-group">
                  <input type="submit" value="Login" className="btn float-right login_btn" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?
                <Link to="/signup">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center links">
                <a href="/">Forgot your password?</a>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
