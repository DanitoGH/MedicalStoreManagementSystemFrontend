import React, { useState , useEffect } from 'react';
import axios from 'axios'

import Moment from 'react-moment';
import 'moment-timezone';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RecentActivityPageContent = () => {
     
    const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

    const [activities, setActivities] = useState({})

    useEffect(() => {
       getAllActivities()
    }, [])
  
    const getAllActivities = () => {
     axios.get(`${baseUrl}/tracker/get-user-activities`)
     .then(res => {
        if(res.data.length > 0){
            setActivities(res.data)
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

    
    return (
       <div className="container mt-n10 recent-actvity-card-min-height">
        <div className="card card-header-actions  table-min-height">
            <div className="card-header">
                Recent Activities
            </div>
             <div className="card-body">
              <div className="timeline timeline-xs">
              { Array.from(activities).slice(0,20).map((tracker, index) => {
                    if(index === 6) return // Get the last 6 activities
                    return (
                        <div key={index} className="timeline-item">
                            <div className="timeline-item-marker">
                                <br/>
                                <div className="timeline-item-marker-text">
                                    <Moment fromNow>{tracker.activity_date}</Moment>
                                </div>
                                <div className={`timeline-item-marker-indicator ${(tracker.activity_type==='Auth'?'bg-purple':tracker.activity_type==='CRUD'?'bg-blue': tracker.activity_type==='Order'?'bg-green': tracker.activity_type==='Del'?'bg-red':'bg-yellow')}`}/>
                            </div>
                            <div className="timeline-item-content">
                                {tracker.activity}
                            </div>
                        </div>
                 )}) } 
               </div>
            </div>
        </div>
       {/* Init react-toastify */}
       <ToastContainer />
      </div>
    )
 }

export default RecentActivityPageContent;
