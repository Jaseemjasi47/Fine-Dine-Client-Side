import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { axiosInstance } from '../../api/apiConfigurations';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal';
import '../../pages/Login.css'

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [sendedotp, setSendedotp] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordError(false); 
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  
    setPasswordError(password !== value || value.trim() === '');
  };

  //-----------------------------------otp modal---------------

    

  const handleOpenModal = () => {
      setIsModalOpen(true);
    };

  const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
      if (otp === sendedotp){

        const data = {
          name: username,
          email: email,
          password: password,
        };
        
        try {
          const response = await axiosInstance.post('/accounts/signup/', data);
          if (response.status === 201) {
        toast.success('Sign up successful!');
        setIsModalOpen(false);
        navigate('/login');
          }
        }
        catch (error) {
          toast.error('Sign up Failed')
        };
      }
      else{
      toast.error('OTP Is Not Valid!')
    }
    };

  const handleResendOtp = () => {
        toast.success('OTP Resended')
    };

  //----------------------------end-------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error('Passwords does not match!');
      setPasswordError(true); 
      return;
    }
  
    const data = {
      name: username,
      email: email,
      password: password,
    };

    

    console.log(data,'-----------------------data-----------------s');
  
    try {
      const response = await axiosInstance.post('/accounts/sendotp/', data);
  
      // Handle success response
      if (response.status === 201) {

        console.log(response.data,'-------------------------signup-------------------');

        setSendedotp(response.data)

        setIsModalOpen(true);

        // toast.success('Sign up successful!');
        // Redirect to login page or perform other actions
        // navigate('/login');
      }
    } catch (error) {
      console.log(error.response.data,'---------------------------error--------------------------------');
      if (error.response.status === 400 && error.response.data.message === 'Email is already registered') {
        toast.error(error.response.data.message);
      } else if(error.response.status === 400 && error.response.data.message === 'Email is Not Found!'){
        toast.error('Email is Not Found!');
      }
      else{
        toast.error('Sign up failed.');
      }
      console.error('Error:', error);
    }
  };
  

  return (
    <div className='container'>
      <div className={`${ isModalOpen ? 'bddy' : ''}`}></div>
      <div className="d-flex justify-content-center">
        <div className="card mb-5">
          <div className="card-header">
            <h3>Sign Up</h3>
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
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-at"></i>
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
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input
                  type="password"
                  className={`form-control ${passwordError ? 'error' : ''}`}
                  placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-retweet"></i></span>
                </div>
                <input
                  type="password"
                  className={`form-control ${passwordError ? 'error' : ''}`}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              <div className="row align-items-center remember">
                <input type="checkbox" />Remember Me
              </div>
              <div className="form-group">
                <input type="submit" value="Sign Up" className="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Already have an account?
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="content">
          <h2 className='mb-3'>Enter The OTP</h2>
          <input type='text' placeholder="Enter OTP Here"
                  value={otp}
                  onChange={handleOtpChange}
                  className='my-4'
                  required ></input>
          <div className="rs m-2">
          <button onClick={handleResendOtp} className='resend-btn' >Resend OTP?</button>
          <button onClick={handleOtpSubmit} className='submit-btn'>SUBMIT</button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
