import React, { useState } from 'react';
import PopularRestaurants from './Menu/PopularRestaurants';
import PopularFoods from './Menu/PopularFoods';

function Menu() {
  const [activeTab, setActiveTab] = useState('tab-1');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Restaurants And Foods</h1>
        </div>
      </div>
      <PopularRestaurants/>
      <PopularFoods/>
      {/* <div className='bg-blue m-3 w-96'>footer</div> */}
    </div>
  );
}

export default Menu;
