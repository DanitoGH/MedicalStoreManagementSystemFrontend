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

  const [categoriesData, setCategoriesData] = useState({})
  const [newActivity, setNewActivity] = useState(false)
  const [catdId, setCatdId] = useState('')


  useEffect(() => {
      fetchCategories()
  }, [])


  // Trigger activity tracker
  useEffect(() => {
    if(newActivity){
       activityTracker(`Cat. with an ID of '${catdId}' has been deleted!`, 'Del')
     }
  },[newActivity])
  

  const fetchCategories = () => {
       axios.get(`${baseUrl}/categories/get-category`)
      .then(res => {
        if(res.data.length > 0){
           setCategoriesData(res.data)
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
        message: `Are you sure you want do delete this category?`,
        buttons: [{
            label: 'Yes',
            onClick: () => {
                axios.delete(`${baseUrl}/categories/delete-category/${id}`)
                .then(res => {
                  if(res.data.success !== undefined){
                     toast.success(res.data.success, {
                        position: "bottom-right",
                        autoClose: 3000
                      }) 
                       
                      // Set this category ID to state
                      setCatdId(id)

                      //Set new activity to true
                      setNewActivity(true)

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

    return (
      <div className="container mt-n10">
        {/* Init react-toastify */}
         <ToastContainer />
          <div className="card card-header-actions  table-min-height">
              <div className="card-header">
                  Category Summery
                  <Link className="btn btn-sm btn-primary" type="button"  to="/add-stock-category">
                      <i className="mr-1" data-feather="plus"></i>  Add New Category
                  </Link>
              </div>
              <div className="card-body">
                  <div className="datatable">
                      <table className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                            <tr>
                              <th>Category Name</th>
                              <th>Reorder Alert Quantity</th>
                              <th>Created At</th>
                              <th>Updated At</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                          {Array.from(categoriesData).map((catData, index) => (
                            <tr key={index}>
                            <td>{catData.name}</td>
                            <td>{catData.quantity}</td>
                            <td>
                              <Moment format="YYYY/MM/DD HH:mm A">
                                 {catData.date_created}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="YYYY/MM/DD HH:mm A">
                                 {catData.updated}
                              </Moment>
                            </td>
                            <td>
                              <Link className="btn btn-datatable btn-icon mr-4" to={`/update-stock-category/${catData.id}/${catData.name}/${catData.quantity}`}>{<Edit2 />}</Link>
                              <button className="btn btn-datatable btn-icon btn-transparent-dark"  onClick={() => deleteItem(catData.id)}>{<Trash2/>}</button>
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
