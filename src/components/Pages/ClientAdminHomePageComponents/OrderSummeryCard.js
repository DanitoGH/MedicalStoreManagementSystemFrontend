import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'react-feather';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Moment from 'react-moment';
import 'moment-timezone';

import axios from 'axios'



const OrderSummeryCard = (props) =>{

   const baseUrl = 'http://127.0.0.1:8000/api'
   const orderSummery = props.orders


   const deleteItem = (id) => {
       confirmAlert({
        title: 'Confirm to delete',
        message: `Are you sure you want do delete this order?`,
        buttons: [{
            label: 'Yes',
            onClick: () => {
                axios.delete(`${baseUrl}/orders/delete-order/${id}`)
                .then(res => {
                  if(res.data !== undefined){
                    toast.success(res.data.success, {
                        position: "bottom-right",
                        autoClose: 3000
                      }) 
                    // Reload page 
                    window.location.reload()
                  }
                })
                .catch(err => {
                  if(err){
                      toast.error(`Error: ${err.message}`, {
                        position: "bottom-right",
                        autoClose: 3000
                    })         
                  }   
              })
           }
        },{
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

  return(
      <div className="card mb-4">
        <div className="card-header">Order Summary</div>
            <div className="card-body">
              <div className="datatable">
              <table className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr> 
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
                    <td>{ord.item}</td>
                    <td>{ord.category}</td>
                    <td>{ord.ordered_qty} {ord.unit}</td>
                    <td>{ord.delivered_qty} {ord.unit} </td>
                    <td>
                     <div className={`badge  badge-pill ${(ord.urgency_level === 'Low'?'badge-success': ord.urgency_level === 'Normal'? 'badge-info': ord.urgency_level === 'High'?'badge-warning':'badge-danger')}`}>
                        {ord.urgency_level}
                     </div>
                    </td>
                    <td>
                       <Moment format="DD/MM/YYYY HH:mm A">
                          {ord.date_ordered}
                       </Moment>
                    </td>
                    <td>
                     <div className={`badge  badge-pill ${(ord.status === 'Pending'? 'badge-secondary': ord.status === 'Delivered'? 'badge-success': 'badge-warning')}`}>
                        {ord.status}
                     </div>
                     </td>
                     <td>
                       <Link className="btn btn-datatable btn-icon mr-3" to={`/update-order/${ord.id}/${ord.item_id}/${ord.item}/${ord.ordered_qty}/${ord.unit}/${ord.urgency_level}`}>
                           <Edit2 />
                       </Link>
                       <button className="btn btn-datatable btn-icon btn-transparent-dark" onClick={() => deleteItem(ord.id)}>{<Trash2/>}</button>
                     </td>
                    </tr>
                  ))}     
                </tbody>
              </table>
          </div>
       </div>
       <ToastContainer />
     </div>
    )
 }

export default OrderSummeryCard;
