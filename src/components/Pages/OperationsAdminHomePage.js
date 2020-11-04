import React, { useState , useEffect } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

import  $ from 'jquery'


import  WelcomeToDashboard  from './OperationsAdminHomepageComponents/WelcomeToDashboard';
import  TotalOrdersCard     from './OperationsAdminHomepageComponents/TotalOrdersCard';
import  OrdersPendingCard   from './OperationsAdminHomepageComponents/OrdersPendingCard';
import  OrdersDeliveredCard from './OperationsAdminHomepageComponents/OrdersDeliveredCard';
import  RecentActivityCard  from './OperationsAdminHomepageComponents/RecentActivityCard';
import  OrderStatisticsCard from './OperationsAdminHomepageComponents/OrderStatisticsCard';
import  OrderSummeryCard    from './OperationsAdminHomepageComponents/OrderSummeryCard';


const OperationsAdminHomepage = () => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

  const [statsData, setStatsData] = useState({})
  const [activityTracker, setActivityTracker] = useState({})
  const [orderSummery, setOrderSummery] = useState({})

  useEffect(() => {
     getAdminDashboard()
  }, [])

  const getAdminDashboard = () => {
   axios.all([
      axios.get(`${baseUrl}/operations-order-stats/get-order-stats`), // Order stats
      axios.get(`${baseUrl}/tracker/get-user-activities`), // Users activities
      axios.get(`${baseUrl}/orders/get-all-orders`)  // Clients orders
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

 export default  OperationsAdminHomepage;
