import React from 'react';
import { NavLink } from "react-router-dom";

const SideNavbar = () => {
   return(
    <div id="layoutSidenav_nav">
     <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div className="nav accordion" id="accordionSidenav">
            <div className="sidenav-menu-heading">Home</div>
            <NavLink className="nav-link" exact to="/client-admin">
                <div className="nav-link-icon"><span className="material-icons">home</span></div>
                Dashboard
            </NavLink>
            <div className="sidenav-menu-heading">Create Order</div>
            <NavLink className="nav-link" to="/create-order">
            <div className="nav-link-icon"><span className="material-icons">add</span></div>
               Create New Order
            </NavLink>
             <div className="sidenav-menu-heading">Account Profile</div>
             <NavLink className="nav-link" to="/client-account-profile">
                 <div className="nav-link-icon"><span className="material-icons">person</span></div>
                  Profile
             </NavLink>
            </div>
        </div>
    </nav>
  </div> 
)
}   

export default SideNavbar;