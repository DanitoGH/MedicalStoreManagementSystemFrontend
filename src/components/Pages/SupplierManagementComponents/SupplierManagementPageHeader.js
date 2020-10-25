import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = () => {


    return (
     <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
        <div className="container">
            <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto mt-4">
                          <h1 className="page-header-title">
                              Supplier Management
                          </h1>
                      </div>
                    </div>
                    <ol className="breadcrumb mb-0 mt-4">
                        <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Supplier Management</li>
                    </ol>
                </div>
          </div>
        </header>
    )
 }

export default PageHeader;
