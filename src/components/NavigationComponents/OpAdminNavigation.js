import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Bell, Menu } from 'react-feather';
import { ToastContainer } from 'react-toastify';
import  Auth  from '../auth-api';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

import OpAdminSideNavigationBar from './OpAdminSideNavigationBar';




const OpTopNavbar = () => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com'

  //User sign in details from localStorage
  const userProfileInfo = localStorage.getItem('user')
  const profile = JSON.parse(userProfileInfo)

  const { setAuth } = useContext(Auth)
  const fallbackImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgICQgHCQoICAcIBxsIFQgKIB0iIiAdHx8YHCggGCYlGxMfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEg8NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgQFAQMH/8QAOxABAQABAgIFCQUFCQAAAAAAAAIDARIEIgUyUoKxERMjM0JicnPBQUNTkZIhMaLR8DRhY3GBg5Oh8v/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+qAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyy8Rjx9aubszzag9RnZONyV6vbP8Wrx1zZK+8yfq1kGuMjTLk/Eyf8mqU8Tmn7z9XkoGqKMcdX3kz8U1tXdNZrmnmntSDoAAAAAAAAAAAAAAAAAAADmuu2d1csz7Tqh0hk5pxezPNXxAjxPFVk5cfLHa+2lYFAAAABPFlrHW7HXd+ykAGtgzTmndPensvRmcFe3PM+zk5aaaAAAAAAAAAAAAAAAAAAAx8t+cy1faamfXbgyfL18GSAAoAAAAAA7FbamuzU02WK2dEHQAAAAAAAAAAAAAAAAAeXEeoyfBTKa+XTdiyT2p18GQAAoAAAABqANbDr6DH8uPBktfDp6LH8vTwQTAAAAAAAAAAAAAAAAABW47JWPFO2tu6ttV/ozGl0hp6CfmaeGrO8gA655FBx3yADiQCIkAj5WlwOWsk1NVu20zvI0Ojp9FVdrJ9NEFsAAAAAAAAAAAAAAAAAHjxU7sF/Du/L9rLbOum6dtdWuVm8Vw/mdu2t015e6DwAUAAAAAAGpwk7cGP3p3fmpcLw/nt1VW2Z8neaWmm2ds9WeVB0AAAAAAAAAAAAAAAAABW46d2Dd+HWlfRZcrTdO2urXKDGE82KsNba7tdqUFAAAAAE8OPzmWYnvV2ZBf4KNuCf8AE5lhzTTbyz7LqAAAAAAAAAAAAAAAAAAAACn0jpy4697WVFd6R15cc/50pAAKAAC30d18nwz4qi10fr6Wp7U/VBoAAAAAAAAAAAAAAAAAAA5WszzVW2e1QOqefjdvLhnvV9NDNxszy4eb3q/co667ubtAld1krdkrdSIKAAAADs1U1umttdqXAFzDxtdXNO73p/f+S7pqxlzBxvs5p/3J+uiC8Ixc1O6a3T7qQAAAAAAAAAAAhkyTjndkr+dKWTjar1c7Z7Vc2oNB5ZM+PH1sk/DPNqzby5K62Sq737EAXMnHfhz3q/kq3krJzZKqkQABQAAAAAAAAAB2aqa3TVTXurWPjqn1k7venl1VBBqY+Jx5Pa212a5XsxUoyVPVqp+GgbAzsfG5J9ZtyT+nVdw5pz9XvT9sg9AAAAEMtzjxVdez/Emo9I16uO9/X/YKuTJWSt1f+f7kQUAAAAAAAAAAAAAAAAAAAAHZqprdPLUuANXh8vnsW72urU+89WdwFbc+38SfD+tWigAAM/pD18/Lnx1AFUBQAAAAAAAAAAAAAAAAAAAAAB7cF/aY73hq1AQAAf/Z'
  
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
          <Link className="navbar-brand" to="/">Operations Admin</Link>
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
                              <div className="dropdown-user-details-name">{(profile !== null? profile.username: '')}</div>
                              <div className="dropdown-user-details-email">{(profile !== null? profile.email: '')}</div>
                          </div>
                      </h6>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item"  to="/operations-account-profile">
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

       { <OpAdminSideNavigationBar />}
    </React.Fragment>
    )
 }

export default OpTopNavbar;
