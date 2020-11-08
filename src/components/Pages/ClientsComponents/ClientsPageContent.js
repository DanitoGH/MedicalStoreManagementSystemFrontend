import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'react-feather';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import  $ from 'jquery';



const  PageContent = () => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com'

  const [clientsData, setClientsData] = useState({})
  const [dataLoaded, setDataLoaded] = useState(false)
  const clientPlaceholder = 'https://i7.pngguru.com/preview/501/90/524/video-game-gaymer-gamer-queer-red-cross-hospital-icon.jpg';

  useEffect(() => {
    getClients()
  }, [])

  const getClients = () => {
     axios.get(`${baseUrl}/api/clients/get-clients`)
    .then(res => {
      if(res.data.length > 0){
        setClientsData(res.data)
        setDataLoaded(true)
        $('#dataTable').DataTable({})
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


 return ( 
    <div className="container mt-n10">
      <div className="card card-header-actions table-min-height">
          <div className="card-header">
              Clients Summery
          </div>
          <div className="card-body">
            <div className="datatable">
              <table  className="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                <th>#</th>
                <th>Hospital</th>
                <th>Location</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
              </thead>
               <tbody>
                {Array.from(clientsData).map((client, index) => (
                <tr key={index}>
                  <td><img class="rounded-circle" src={(client.profile_photo? `${client.profile_photo}`: clientPlaceholder)}  width="50px"  height="50px"  alt={client.hospital_name}/></td>
                  <td>{client.hospital_name}</td>
                  <td>{client.location}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                     <Link  className="ml-4"  to={`/client-profile/${client.id}`}>Details</Link>
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
