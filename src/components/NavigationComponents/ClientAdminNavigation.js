import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Bell, Menu } from 'react-feather';
import { ToastContainer } from 'react-toastify';
import  Auth  from '../auth-api';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

import ClientSideNavigationBar from './ClientSideNavigationBar';




const ClientTopNavbar = () => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com'

  const userProfileInfo = localStorage.getItem('user')
  const profile = JSON.parse(userProfileInfo)

  const { setAuth } = useContext(Auth)
  const fallbackImage = 'https://i7.pngguru.com/preview/501/90/524/video-game-gaymer-gamer-queer-red-cross-hospital-icon.jpg'


  const sidebarToggleHandler = () => {
    $("body").toggleClass("sidenav-toggled")
  }

  const userLogout = () =>{
     localStorage.removeItem('user')
     setAuth(false)
  }

  
  return (
      <React.Fragment>
        {/* Init  react-toastify */}
        <ToastContainer />
        <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
          <Link className="navbar-brand" to="/client-admin">{profile !== null && profile.hospital_name }</Link>
          <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" onClick={sidebarToggleHandler} id="sidebarToggle" href="#">
            <Menu size={17} />
          </button>
          <ul className="navbar-nav align-items-center ml-auto">
              <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                  <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Bell size={17} />
                  </a>
              </li>
              <li className="nav-item dropdown no-caret mr-2 dropdown-user">
                  <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img className="img-fluid" 
                       src={(profile.profile_photo? `${profile.profile_photo}`: fallbackImage)} 
                       alt={(profile !== null ? profile.username: '')}
                     />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                      <h6 className="dropdown-header d-flex align-items-center">
                          <img className="dropdown-user-img" 
                            src={(profile.profile_photo? `${profile.profile_photo}`: fallbackImage)} 
                            alt={(profile !== null? profile.username: '')}
                          />
                          <div className="dropdown-user-details">
                              <div className="dropdown-user-details-name">{(profile !== null? profile.hospital_name: '')}</div>
                              <div className="dropdown-user-details-email">{(profile !== null? profile.email: '')}</div>
                          </div>
                      </h6>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/client-account-profile">
                          <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                          Account
                      </Link>
                      <button className="dropdown-item" onClick={userLogout} id="logout" href="#">
                          <div className="dropdown-item-icon">
                              <i data-feather="log-out"></i>
                          </div>
                          Logout
                      </button>
                  </div>
              </li>
          </ul>
        </nav>
       { <ClientSideNavigationBar />}
    </React.Fragment>
    )
 }


export default ClientTopNavbar;
