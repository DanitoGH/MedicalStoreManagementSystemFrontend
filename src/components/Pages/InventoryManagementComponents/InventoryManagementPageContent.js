import React, { useState , useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit2, Trash2 } from 'react-feather';
import Moment from 'react-moment';
import 'moment-timezone';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import  $  from 'jquery';

import activityTracker from '../../activityTracker';


const PageContent = () => {

  
 const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

 const [inventoryData, setInventoryData] = useState({})
 const [newActivity, setNewActivity] = useState(false)


  useEffect(() => {
     getStockItem()
  }, [])


  // Trigger activity tracker
  useEffect(() => {
    if(newActivity){
       activityTracker(`Stock item has been deleted!`, 'CRUD')
    }
  },[newActivity])


  const getStockItem = () => {
     axios.get(`${baseUrl}/stock-item/get-stock-item`)
    .then(res => {
      if(res.data.length > 0){
         setInventoryData(res.data)
         $('#dataTable').DataTable({})
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


  const deleteItem = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: `Are you sure you want do delete this item?`,
      buttons: [{
          label: 'Yes',
          onClick: () => {
              axios.delete(`${baseUrl}/stock-item/delete-stock-item/${id}`)
              .then(res => {
                if(res.data.success !== undefined){
                   toast.success(res.data.success, {
                      position: "bottom-right",
                      autoClose: 3000
                    }) 

                    //Set new activity to true
                    setNewActivity(true)

                    // Reload page 
                    window.location.reload()
                }
              }).catch(err => {
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


  return (
      <div className="container mt-n10">
         {/* Init react-toastify */}
         <ToastContainer />
          <div className="card card-header-actions  table-min-height">
              <div className="card-header">
                  Inventory Summery
                  <Link  className="btn btn-sm btn-primary" type="button" to="/add-stock-item"><i data-feather="plus" className="mr-2"></i>  Add New Item</Link>
              </div>
              <div className="card-body">
                  <div className="datatable">
                      <table className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                      <thead>
                          <tr>
                            <th>Item</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Qty</th>
                            <th>Reorder qty</th>
                            <th>Supplier</th>
                            <th>Last updated</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                          </thead>
                          <tbody>
                          {Array.from(inventoryData).map((inv, index) => (
                            <tr key={index}>
                            <td>{inv.name}</td>
                            <td>{inv.cat}</td>
                            <td>{inv.subcat}</td>
                            <td>{inv.quantity} {inv.unit}</td>
                            <td>{inv.reorder} {inv.unit}</td>
                            <td>{inv.supplier}</td>
                            <td>
                              <Moment format="YYYY/MM/DD HH:mm A">
                                 {inv.updated}
                              </Moment>
                            </td>
                            <td>
                            <div className={`badge badge-pill ${
                                     (parseInt(inv.quantity) > parseInt(inv.reorder)? 'badge-success'
                                    : parseInt(inv.quantity) > 1 && parseInt(inv.quantity) <= parseInt(inv.reorder)? 'badge-warning'
                                    : parseInt(inv.quantity) === 0? 'badge-danger': '')}`}>

                                 { parseInt(inv.quantity) > parseInt(inv.reorder) && "In stock" }
                                 { parseInt(inv.quantity) > 1 && parseInt(inv.quantity) <= parseInt(inv.reorder) && "Few stock left"}
                                 { parseInt(inv.quantity) === 0 && "Out of stock" }
                             </div>
                            </td>
                            <td>
                              <Link className="btn btn-datatable btn-icon mr-4" 
                                to={`/update-stock-item/${inv.id}/${inv.name}/${inv.quantity}/${inv.cat_id}/${inv.cat}/${inv.subcat_id}/${inv.subcat}/${inv.unit}/${inv.supplier_id}/${inv.supplier}`}>
                                  <Edit2 size={22}/>
                               </Link>
                               <button className="btn btn-datatable btn-icon btn-transparent-dark"  onClick={() => deleteItem(inv.id)}>{<Trash2 size={22} />}</button>
                            </td>
                            </tr>
                           ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    )
 }


export default PageContent;
