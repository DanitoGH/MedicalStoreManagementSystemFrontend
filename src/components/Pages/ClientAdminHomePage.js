import React, { useState , useEffect } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import  $ from 'jquery'


import  WelcomeToDashboard  from './ClientAdminHomePageComponents/WelcomeToDashboard';
import  TotalOrdersCard     from './ClientAdminHomePageComponents/TotalOrdersCard';
import  OrdersPendingCard   from './ClientAdminHomePageComponents/OrdersPendingCard';
import  OrdersDeliveredCard from './ClientAdminHomePageComponents/OrdersDeliveredCard';
import  RecentActivityCard  from './ClientAdminHomePageComponents/RecentActivityCard';
import  OrderStatisticsCard from './ClientAdminHomePageComponents/OrderStatisticsCard';
import  OrderSummeryCard    from './ClientAdminHomePageComponents/OrderSummeryCard';



const ClientAdminHomepage = () => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

  //User sign in details from localStorage
  const userProfileInfo = localStorage.getItem('user')
  const profile = JSON.parse(userProfileInfo)

  const [statsData, setStatsData] = useState({})
  const [activityTracker, setActivityTracker] = useState({})
  const [orderSummery, setOrderSummery] = useState({})


  useEffect(() => {
     getAdminDashboard()
  },[])

  const getAdminDashboard = () => {
   axios.all([
      axios.get(`${baseUrl}/clients-order-stats/get-client-stats/${profile.prof_id}`), // Order stats
      axios.get(`${baseUrl}/tracker/get-user-activities`), // Users activities
      axios.get(`${baseUrl}/orders/get-client-orders/${profile.prof_id}`)  // Clients orders
   ])
   .then(axios.spread(function (stats, tracker, orders) {
       setStatsData(stats.data)
       setActivityTracker(tracker.data)
       setOrderSummery(orders.data)
       $('#dataTable').DataTable({
         order: [[ 5, 'desc' ]]
       })
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

  return(
      <div id="layoutSidenav_content">
        <div class="container">

          {/* Welcome To Dashboard  */}
          <WelcomeToDashboard />

          {/* TotalOrdersCard, OrdersPendingCard & OrdersDeliveredCard Row */}
           <div class="row">
              <TotalOrdersCard  total_orders={statsData.total_orders} />
              <OrdersPendingCard  pending_orders={statsData.total_pending_orders} />
              <OrdersDeliveredCard  delivered_orders={statsData.total_delivered_orders} />
           </div>

            {/* Recent Activity & Order Statistics Row*/ }
            <div class="row">
               <RecentActivityCard  tracker={activityTracker} />
               <OrderStatisticsCard  graph_data={statsData} />
            </div>

            {/* Order Summary Card*/ }
             <OrderSummeryCard  orders={orderSummery}/>
         </div>
         
          {/* Init react-toastify */}
         <ToastContainer />
      </div>
    )
 }

 export default  ClientAdminHomepage;
