import React from 'react'

function Breakfast() {
  return (
    <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-4 p-5">
            <div className="col-lg-6 ">
                <div className="d-flex align-items-center">
                <img className="flex-shrink-0 img-fluid rounded" src="img/menu-1.jpg" alt="" style={{ width: "80px" }} />
                <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                    <span>Chicken Burger</span>
                    <span className="text-primary">$115</span>
                    </h5>
                    <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="d-flex align-items-center">
                <img className="flex-shrink-0 img-fluid rounded" src="img/menu-2.jpg" alt="" style={{ width: "80px" }} />
                <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                    <span>Chicken Burger</span>
                    <span className="text-primary">$115</span>
                    </h5>
                    <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                </div>
                </div>
            </div>
            <div className="col-lg-6 ">
                <div className="d-flex align-items-center">
                <img className="flex-shrink-0 img-fluid rounded" src="img/menu-1.jpg" alt="" style={{ width: "80px" }} />
                <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                    <span>Chicken Burger</span>
                    <span className="text-primary">$115</span>
                    </h5>
                    <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="d-flex align-items-center">
                <img className="flex-shrink-0 img-fluid rounded" src="img/menu-2.jpg" alt="" style={{ width: "80px" }} />
                <div className="w-100 d-flex flex-column text-start ps-4">
                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                    <span>Chicken Burger</span>
                    <span className="text-primary">$115</span>
                    </h5>
                    <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
                </div>
                </div>
            </div>
            {/* Other menu items go here */}
            </div>
        </div>
        {/* Other tabs' content goes here */}
    </div>
  )
}

export default Breakfast
