import React, { useState } from 'react';
import TopRated from './TopRated';

function PopularRestaurants() {

    const [activeTab, setActiveTab] = useState('tab-1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };


  return (
    <div>
      <div className="container-xxl my-2 bg-white">
        <div className=" ">
          <div className="text-center w-100 wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Restaurants</h5>
            <h1 className="mb-5">Most Popular</h1>
          </div>
          <div className="tab-class text-center w-100 wow fadeInUp" data-wow-delay="0.1s">
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-3">
              <li className="nav-item">
                <a
                  className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'tab-1' ? 'active' : ''}`}
                  onClick={() => handleTabClick('tab-1')}
                >
                  <i class="fa-solid fa-ranking-star fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Top</small>
                    <h6 className="mt-n1 mb-0">Rated</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'tab-2' ? 'active' : ''}`}
                  onClick={() => handleTabClick('tab-2')}
                >
                  <i className="fa fa-star fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Five</small>
                    <h6 className="mt-n1 mb-0">Star</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`d-flex align-items-center text-start mx-3 me-0 pb-3 ${activeTab === 'tab-3' ? 'active' : ''}`}
                  onClick={() => handleTabClick('tab-3')}
                >
                  <i className="fa fa-award fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Award</small>
                    <h6 className="mt-n1 mb-0">winning</h6>
                  </div>
                </a>
              </li>
            </ul>
            {/* Render corresponding components based on activeTab */}
            {activeTab === 'tab-1' && <TopRated/>}
            {activeTab === 'tab-2' &&  <TopRated/>}
            {activeTab === 'tab-3' &&  <TopRated/>}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default PopularRestaurants
