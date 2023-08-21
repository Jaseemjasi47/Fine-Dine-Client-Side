import React from 'react'
import Navbar from '../componants/Navbar/Navbar'

function Contact() {
  const iconStyle = {
    color: '#ff9500',
  };
  return (
    <>
    <Navbar/>
    <div className="overflow-hidden" >
      <div className="container-xxl bg-white p-0">
      {/* Spinner Start */}
      {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
      {/* Spinner End */}

      {/* Navbar & Hero Start */}
      <div className="container-xxl position-relative p-0">

        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">Contact Us</h1>
          </div>
        </div>
      </div>
      {/* Navbar & Hero End */}

      {/* Contact Start */}
      <div className="container-xxl py-5">
        <div className="">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Contact Us</h5>
            <h1 className="mb-5">Contact For Any Query</h1>
          </div>
          <div className="row g-4">
            <div className="col-12 mx-5 ">
              <div className="row  gy-4">
                <div className="col-md-4">
                  <h5 className="section-title ff-secondary fw-normal text-start text-primary">Email</h5>
                  <p><i className="fa fa-envelope-open text-primary me-2"></i>jaseemjasi0047@gmail.com</p>
                </div>
                <div className="col-md-4">
                <a href="https://www.linkedin.com/in/mohammad-jaseem-k-j-8b150422a" target="_blank" rel="noopener noreferrer">
                  <h5 className="section-title ff-secondary fw-normal text-start text-primary">LinkedIn</h5>
                  <p><i class="fa-brands fa-linkedin text-primary me-2" style={iconStyle}></i>Mohammad Jaseem K J</p>
                  </a>
                </div>
                <div className="col-md-4">
                <a href="https://instagram.com/jaseemjasijs?igshid=ZDc4ODBmNjlmNQ==" target="_blank" rel="noopener noreferrer">
                  <h5 className="section-title ff-secondary fw-normal text-start text-primary">Instagram</h5>
                  <p><i class="fa-brands fa-instagram text-primary me-2" style={iconStyle}></i>jaseemjasijs</p>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-12 ">
              <div className="wow fadeInUp d-flex justify-content-center" data-wow-delay="0.2s">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="Your Name" />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" placeholder="Your Email" />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="subject" placeholder="Subject" />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: "150px" }}></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </div>
    </div>
    </>
  )
}

export default Contact
