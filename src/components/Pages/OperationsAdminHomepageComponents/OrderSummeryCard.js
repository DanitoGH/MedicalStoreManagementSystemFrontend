import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'react-feather';

import Moment from 'react-moment';
import 'moment-timezone';



const OrderSummeryCard = (props) =>{
  
   const orderSummery = props.orders

   return(
      <div className="card mb-4">
        <div className="card-header">Order Summary</div>
            <div className="card-body">
              <div className="datatable">
              <table className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr> 
                      <th>Client</th>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Qty Ordered</th>
                      <th>Qty Delivered</th>
                      <th>Urgency Level</th>
                      <th>Ordered Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Array.from(orderSummery).map((ord, index) => (
                    <tr key={index}>
                    <td>{ord.hospital_name}</td>
                    <td>{ord.item}</td>
                    <td>{ord.category}</td>
                    <td>{ord.ordered_qty} {ord.unit}</td>
                    <td>{ord.delivered_qty} {ord.unit}</td>
                    <td>
                     <div className={`badge  badge-pill ${(ord.urgency_level === 'Low'?'badge-success': ord.urgency_level === 'Normal'? 'badge-info': ord.urgency_level === 'High'?'badge-warning':'badge-danger')}`}>
                        {ord.urgency_level}
                     </div>
                    </td>
                    <td>
                       <Moment format="YYYY/MM/DD HH:mm A">
                          {ord.date_ordered}
                       </Moment>
                    </td>
                    <td>
                     <div className={`badge  badge-pill ${(ord.status === 'Pending'? 'badge-secondary': ord.status === 'Delivered'? 'badge-success': 'badge-warning')}`}>
                        {ord.status}
                     </div>
                     </td>
                     <td>
                       <Link className="btn btn-datatable btn-icon ml-3" to={`/fulfil-order/${ord.id}/${ord.hospital_name}/${ord.item_id}/${ord.item}/${ord.stock_qty}/${ord.urgency_level}/${ord.unit}/${ord.ordered_qty}/${ord.delivered_qty}/${ord.status}`}><Edit2 /></Link>
                     </td>
                    </tr>
                  ))}     
                </tbody>
              </table>
          </div>
       </div>
     </div>
    )
 }

export default OrderSummeryCard;
