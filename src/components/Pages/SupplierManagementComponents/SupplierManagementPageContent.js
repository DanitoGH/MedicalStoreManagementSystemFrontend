import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'react-feather';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import  $ from 'jquery';


const PageContent = () => {
     

    const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'
    const [suppliersData, setSupplierData] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        fetchSuppliers()
    }, [])
    
    const fetchSuppliers = () => {
         axios.get(`${baseUrl}/suppliers/get-supplier`)
        .then(res => {
          if(res.data.length > 0){
             setSupplierData(res.data)
             setDataLoaded(true)
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
       message: `Are you sure you want do delete this supplier?`,
       buttons: [{
           label: 'Yes',
           onClick: () => {
               axios.delete(`${baseUrl}/suppliers/delete-supplier/${id}`)
               .then(res => {
                 if(res.data.success !== undefined){
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

   
   return (
      <div className="container mt-n10">
          <div className="card card-header-actions  table-min-height">
              <div className="card-header">
                 Supplier Summery
                <Link  className="btn btn-sm btn-primary" type="button" to="/add-stock-item-supplier"><i data-feather="plus" className="mr-2"></i>  Add New Supplier</Link>
              </div>
              <div className="card-body">
                  <div className="datatable">
                      <table className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                      <thead>
                        <tr>
                          <th>Supplier Name</th>
                          <th>Supplied Item</th>
                          <th>Email Address</th>
                          <th>Phone</th>
                          <th>City</th>
                          <th>Country</th>
                          <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                         {Array.from(suppliersData).map((supp, index) => (
                          <tr key={index}>
                          <td>{supp.name}</td>
                          <td>{supp.item}</td>
                          <td>{supp.email}</td>
                          <td>{supp.phone}</td>
                          <td>{supp.city}</td>
                          <td>{supp.country}</td>
                          <td>
                             <Link className="btn btn-datatable btn-icon mr-4" 
                                   to={`/update-stock-item-supplier/${supp.id}/${supp.name}/${supp.item}/${supp.email}/${supp.phone}/${supp.city}/${supp.country}`}>
                               {<Edit2 />}
                             </Link>
                             <button className="btn btn-datatable btn-icon btn-transparent-dark" onClick={() => deleteItem(supp.id)}>{<Trash2/>}</button>
                         </td>
                         </tr>
                         ))}   
                        </tbody>
                      </table>
                  </div>
              </div>
          </div>
         {/* Init  react-toastify */}
        <ToastContainer />
      </div>
    )
 }

export default PageContent;
