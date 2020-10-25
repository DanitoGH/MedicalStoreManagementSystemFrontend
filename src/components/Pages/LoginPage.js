import React , { useContext, useEffect, useState, useRef } from 'react';

import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import AuthApi from '../auth-api';

import axios from 'axios'

import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import activityTracker from '../activityTracker'




const LoginPage = () => {


  const baseUrl = 'django-hospital-store-mng-api.herokuapp.com/api'

  const { setAuth } = useContext(AuthApi)
  const { register, handleSubmit, errors } = useForm()
  const [loginCredentials, setLoginCredentials] = useState({username: '', password: ''})
  const [userInfo, setUserInfo] = useState()
  const [newActivity, setNewActivity] = useState(false)


  useEffect(() => {
    if(newActivity){
        axios.interceptors.request.use(
          config => { 
              config.headers.authorization = `Token ${userInfo.token}`;
              return config;
          }, error => { return Promise.reject(error)  
        })
        if(userInfo.redirect_to === "/client-admin"){
          getClientAdminProfileInfo(userInfo)
       }else{
         getOperationsAdminProfileInfo(userInfo)
       }
    }
  }, [newActivity]);


  const changeHandler = e => {
    setLoginCredentials({ ...loginCredentials,  [e.target.name]: e.target.value })
  }

  const onSubmit = () => {
     userSignIn()
  }

  const userSignIn = () => {
      axios.post(`${baseUrl}/account/login`, loginCredentials)
      .then(res => {
        const user = res.data
         // Save user Token to state
         setUserInfo(user)
         // Set activity to true
         setNewActivity(true)
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

  const getOperationsAdminProfileInfo = (user) => {
    axios.get(`${baseUrl}/operations-admin-profile/get-profile`)
    .then(res => { 
        const data = res.data[0]
        if(data !== undefined){
            localStorage.setItem('user', JSON.stringify({
                user_id: user.user_id,
                prof_id: data.id,
                username: data.username,
                email: data.email,
                profile_photo: data.profile_photo,
                phone: data.phone,
                token: user.token,
                redirect_to: user.redirect_to
            }))
        }else{
            localStorage.setItem('user', JSON.stringify({
                user_id: user.user_id,
                prof_id: null,
                username: user.username,
                email: user.email,
                profile_photo: null,
                phone: null,
                token: user.token,
                redirect_to: user.redirect_to
            }))
        }
        
      // Make the first character of the username uppercase 
      const username = userInfo.username[0].toUpperCase() + userInfo.username.slice(1) 
      
      // Save current activity
      activityTracker(`${username} has just signed in!`, 'Auth')

      //set Auth to true
      setAuth(true)
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

  const getClientAdminProfileInfo = (user) => {
      axios.get(`${baseUrl}/clients/get-current-client`)
      .then(res => { 
          const data = res.data
          if(data !== undefined){
              localStorage.setItem('user', JSON.stringify({
                  user_id: user.user_id,
                  prof_id: data.id,
                  username: user.username,
                  email: user.email,
                  hospital_name: data.hospital_name,
                  location: data.location,
                  profile_photo: data.profile_photo,
                  phone: data.phone,
                  redirect_to: user.redirect_to, 
                  token: user.token
              }))
          }else{
              localStorage.setItem('user', JSON.stringify({
                  user_id: user.user_id,
                  prof_id: null,
                  username: user.username,
                  email: user.email,
                  hospital_name: null,
                  location: null,
                  profile_photo: null,
                  phone: null,
                  redirect_to: user.redirect_to, 
                  token: user.token
              }))
          } 

        // Make the first character of the username uppercase 
        const username = userInfo.username[0].toUpperCase() + userInfo.username.slice(1) 
      
        // Save current activity
        activityTracker(`${username} has just signed in!`, 'Auth')

        //set Auth to true
        setAuth(true)
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
      <div id="layoutSidenav_content">
       {/* Init  react-toastify */}
       <ToastContainer />
        <div className="container center-div">
         <div className="row justify-content-center align-items-center">
            <div className="col-sm-8 col-md-6 col-lg-4">
                <div className="card my-4">
                    <div className="card-body text-center">
                        <div className="h3 font-weight-light mb-1 font-weight-bold">Sign in</div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="form-row">
                        <div className="col-md-12">
                           <div className="form-group">
                              <label className="text-gray-600 small">Email</label>
                              <input 
                                className="form-control form-control-solid py-2"
                                type="email" 
                                aria-label="Email" 
                                autoComplete="off" 
                                name="username" 
                                aria-describedby="Email" 
                                onChange={changeHandler}
                                ref={register({required: "Please enter your email!"})}
                              />
                              {errors.username && <label className="text-danger font-weight-bold small">{errors.username.message}</label>}
                           </div>
                        </div>
                        <div className="col-md-12 mt-2">
                          <div className="form-group">
                              <label className="text-gray-600 small">Password</label>
                              <input className="form-control form-control-solid py-2" 
                                aria-label="Password" autoComplete="off" 
                                type="password"
                                name="password" 
                                aria-describedby="Password" 
                                onChange={changeHandler}
                                ref={register({required: "Password is required!", minLength: { value: 6, message: "Your password is too short, minimum of 8 characters is required!"}})}
                              />
                              {errors.password && <label className="text-danger font-weight-bold small">{errors.password.message}</label>}
                          </div>
                        </div>
                        </div>
                        <div className="form-row mt-2">
                        <div className="col-md-12 form-group">
                            <button className="btn btn-primary btn-block mt-3" type="submit">Login</button>
                        </div>
                        </div>
                    </form>
                    <hr className="my-0" />
                    <div className="card-body px-2 py-1">
                    <div className="small text-center">
                        Don't have an account? <Link to="/register-step1">Sign up!</Link>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
   )}


 export default LoginPage;