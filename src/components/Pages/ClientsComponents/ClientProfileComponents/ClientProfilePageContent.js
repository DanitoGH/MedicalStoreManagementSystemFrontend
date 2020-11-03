import React, { useState , useEffect} from 'react';

import Moment from 'react-moment';
import 'moment-timezone';

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import  $ from 'jquery'

import { MapPin, Mail, Phone } from 'react-feather';




const ClientProfilePageContent = (props) => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com'

  const [clientData, setClientData] = useState({})
  const [clientOrders, setClientOrders] = useState({})
  const [infoLoaded, setInfoLoaded] = useState(false)
  const cliendId = props.id
  const clientPlaceholder = 'https://i7.pngguru.com/preview/501/90/524/video-game-gaymer-gamer-queer-red-cross-hospital-icon.jpg';


  useEffect(() => {
    getClientDetails()
  }, [])

  const getClientDetails = () => {
    axios.all([
      axios.get(`${baseUrl}/api/clients/get-single-client/${cliendId}`),
      axios.get(`${baseUrl}/api/orders/get-client-orders/${cliendId}`) 
    ])
    .then(axios.spread(function (clientData, clientOrders) {
      if(clientData.data.id !== undefined){
         setClientData(clientData.data)
         setInfoLoaded(true)
      }
      if(clientOrders.data !== undefined){
        setClientOrders(clientOrders.data)
        $('#dataTable').DataTable({})
     }
    }))
    .catch(err => {
        if(err){
            toast.error(`Error: ${err.message}`, {
              position: "bottom-right",
              autoClose: 3000
           })         
        }   
    })
  }


  return (
     <div className="container mt-n10  table-min-height">
      {/* Init  react-toastify */}
      <ToastContainer />
      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
            <div className="card h-95">
              <div className="card-body  client-details-card-body">
                <div className="card-body client-details-card-body text-center">
                   <img className="rounded-circle mb-2" src={(clientData.profile_photo !== null? `${baseUrl+clientData.profile_photo}`: clientPlaceholder)}  width="60px"  height="60px"   alt="Hospital logo"/>
                   <div className="mb-4  h5">{infoLoaded && clientData.hospital_name}</div>
                </div>
              </div>
            </div>
        </div>
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card h-95">
              <div className="card-body  client-details-card-body">
                  <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                          <div className="small font-weight-bold text-secondary mb-1">CONTACT INFO</div>
                          <br/>
                           <div className="h6"><MapPin size={20} className="mr-1"/> { infoLoaded && clientData.location }</div>
                           <div className="h6"><Mail size={19} className="mr-1"/> { infoLoaded && clientData.email }</div>
                           <div className="h6"><Phone size={18} className="mr-2"/>{ infoLoaded && clientData.phone }</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="col-xl-4 col-md-6 mb-4">
        <div className="card h-95">
          <div className="card-body client-details-card-body">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <div className="font-weight-bold text-secondary mb-1">TOTAL ORDERS</div>
                <br/>
                 <div className="h3 text-center mt-2">{infoLoaded && clientData.total_orders}</div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <div className="col-xl-12 col-md-6 mb-4">
      <div className="card card-header-actions">
          <div className="card-header">
              Client Orders
          </div>
          <div className="card-body">
              <div className="datatable">
                  <table className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                      <thead>
                          <tr>
                            <th>Item</th>
                            <th>Qty Ordered</th>
                            <th>Qty Delivered</th>
                            <th>Urgency Level</th>
                            <th>Date Ordered</th>
                            <th>Status</th>
                          </tr>
                      </thead>
                       <tbody>
                       {Array.from(clientOrders).map((order, index) => (
                      <tr key={index}>
                        <td>{order.item}</td>
                        <td>{order.ordered_qty} {order.unit}</td>
                        <td>{order.delivered_qty} {order.unit}</td>
                        <td>
                          <div className={`badge  badge-pill ${(order.urgency_level === 'Low'?'badge-success': order.urgency_level === 'Normal'? 'badge-info': order.urgency_level === 'High'?'badge-warning':'badge-danger')}`}>
                            {order.urgency_level}
                         </div>
                        </td>
                        <td>
                          <Moment format="YYYY/MM/DD HH:mm A">
                             {order.date_ordered}
                          </Moment>
                        </td>
                        <td>
                         <div className={`badge  badge-pill ${(order.status === 'Pending'? 'badge-secondary': order.status === 'Delivered'? 'badge-success': 'badge-warning')}`}>
                           {order.status}
                         </div>
                        </td>
                      </tr>
                      ))}     
                    </tbody>
                  </table>
              </div>
           </div>
         </div>
      </div>
     </div>
    </div>
    )
 }


export default ClientProfilePageContent;
