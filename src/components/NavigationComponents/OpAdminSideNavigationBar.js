import React from 'react';
import { NavLink } from "react-router-dom";



const  SideNavbar = () => {
     return(
      <div id="layoutSidenav_nav">
        <nav className="sidenav shadow-right sidenav-light">
          <div className="sidenav-menu">
            <div className="nav accordion" id="accordionSidenav">
                <div className="sidenav-menu-heading">Home</div>
                <NavLink className="nav-link" exact to="/">
                    <div className="nav-link-icon"><span className="material-icons">home</span></div>
                    Dashboard
                </NavLink>
                <div className="sidenav-menu-heading">Clients Management</div>
                <NavLink  className="nav-link"  to="/clients">
                   <div className="nav-link-icon"><span className="material-icons">groups</span></div>
                   Clients
                </NavLink>
                <div className="sidenav-menu-heading">Inventory Management</div>
                <NavLink className="nav-link" to="/inventory-management">
                    <div className="nav-link-icon"><span className="material-icons">list_alt</span></div>
                    Manage Inventory
                </NavLink>
                <a className="nav-link collapsed" href="#!" data-toggle="collapse" data-target="#categoryManagement" aria-expanded="false" aria-controls="categoryManagement">
                 <div className="nav-link-icon"><span className="material-icons">category</span></div>
                     Category Management
                 <div className="sidenav-collapse-arrow">
                   <span className="material-icons">keyboard_arrow_down</span>
                 </div>
               </a>
               <div className="collapse" id="categoryManagement" data-parent="#accordionSidenav">
                 <nav className="sidenav-menu-nested nav accordion">
                   <NavLink className="nav-link" to="/category-management">
                       Categories
                   </NavLink>
                   <NavLink  className="nav-link" to="/subcategory-management">
                       SubCategories
                   </NavLink>
                 </nav>
                </div>
                <NavLink className="nav-link" to="/supplier-management">
                    <div className="nav-link-icon"><span className="material-icons">local_shipping</span></div>
                     Supplier Management
                </NavLink>
                <a className="nav-link collapsed" href="#!" data-toggle="collapse" data-target="#stockManagement" aria-expanded="false" aria-controls="stockManagement">
                 <div className="nav-link-icon"><span className="material-icons">edit</span></div>
                     Stock Management
                 <div className="sidenav-collapse-arrow">
                   <span className="material-icons">keyboard_arrow_down</span>
                 </div>
               </a>
               <div className="collapse" id="stockManagement" data-parent="#accordionSidenav">
                 <nav className="sidenav-menu-nested nav accordion">
                   <NavLink className="nav-link" to="/add-stock-item">
                       Add Stock Item
                   </NavLink>
                   <NavLink  className="nav-link" to="/add-stock-category">
                       Add Stock Category
                   </NavLink>
                   <NavLink  className="nav-link" to="/add-stock-subcategory">
                       Add Stock SubCategory
                   </NavLink>
                   <NavLink className="nav-link" to="/add-stock-item-supplier">
                       Add Stock Item Supplier
                   </NavLink>
                 </nav>
             </div>
             <div className="sidenav-menu-heading">Account Profile</div>
             <NavLink className="nav-link" to="/operations-account-profile">
               <div className="nav-link-icon"><span className="material-icons">person</span></div>
                Profile
            </NavLink>
            </div>
        </div>
    </nav>
  </div>)
}   

export default SideNavbar;