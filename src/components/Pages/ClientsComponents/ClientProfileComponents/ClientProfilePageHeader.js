import React from 'react';
import { Link } from "react-router-dom";

const ClientProfilePageHeader = () => {
    return(
      <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
      <div className="container">
        <div className="page-header-content pt-4">
            <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                   <ol className="breadcrumb mb-0 mt-4">
                      <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                      <li className="breadcrumb-item"><Link to="/clients">Clients</Link></li>
                        <li className="breadcrumb-item active">Client Profile</li>
                   </ol>
                  </div>
                </div>
            </div>
         </div>
      </header>
    )
 }

export default ClientProfilePageHeader;
