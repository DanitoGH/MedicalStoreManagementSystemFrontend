import React from 'react';
import { Link } from "react-router-dom";

import Moment from 'react-moment';
import 'moment-timezone';


const RecentActivityCard = (props) => {

    const activityTracker = props.tracker

    return (
      <div className="col-lg-5 mb-4">
        <div className="card card-header-actions">
            <div className="card-header">
                Recent Activity
               </div>
                <div className="card-body  recent-activity-wrapper">
                  <div className="timeline timeline-xs">
                    {/* Get the lastest 6 activities */}
                   { Array.from(activityTracker).slice(0,6).map((tracker, index) => {
                      return (
                        <div key={index} className="timeline-item">
                            <div className="timeline-item-marker">
                                <br/>
                                <div className="timeline-item-marker-text">
                                    <Moment fromNow>{tracker.activity_date}</Moment>
                                </div>
                                <div className={`timeline-item-marker-indicator ${(tracker.activity_type==='Auth'?'bg-purple':tracker.activity_type==='CRUD'?'bg-blue':tracker.activity_type==='Order'?'bg-green':'bg-yellow')}`}/>
                            </div>
                            <div className="timeline-item-content">
                                {tracker.activity}
                            </div>
                        </div>
                     )}) } 
                    </div>
                </div>
                <Link className="card-footer  custom-card-footer-padding" exact  to="/recent-activity">
                  <div className="d-flex align-items-center justify-content-between small text-body">
                      View All Activities
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </Link>
            </div>
        </div>
    )
 }
 

export default RecentActivityCard;
