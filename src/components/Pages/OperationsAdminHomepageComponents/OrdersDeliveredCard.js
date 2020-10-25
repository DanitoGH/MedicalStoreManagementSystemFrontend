import React from 'react';

const OrdersDeliveredCard = (props) => {
    return (
      <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-top-0 border-bottom-0 border-right-0 border-left-lg border-warning h-100">
              <div className="card-body">
                  <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                          <div className="small font-weight-bold text-warning mb-1">ORDERS DELIVERED</div>
                           <div className="h4">{props.delivered_orders}</div>
                      </div>
                      <div className="ml-2">
                         <span  className="material-icons md-32 text-gray-200">assignment_turned_in</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
 }
 

export default OrdersDeliveredCard;
