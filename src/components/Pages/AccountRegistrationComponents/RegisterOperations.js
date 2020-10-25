import React, { useState , useContext, useEffect} from 'react';
import { Link , Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";

import AuthApi from '../../auth-api';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RegisterOperations = (props) => {

    const baseUrl = 'django-hospital-store-mng-api.herokuapp.com/api'

    const { register, handleSubmit, errors } = useForm()
    const { setAuth } = useContext(AuthApi)
    const [accountCredentials, setAccountCredentials] = useState({username:'', email:'', password:'', password2:''})


    const getUser = localStorage.getItem('_signup')
    const _signup = JSON.parse(getUser)


    useEffect(() => {
        //Redirect to the right page if user manually change the URL
        if(_signup !== null){
            if(_signup.role === 'client'){
                return <Redirect to={ "/register-clients"}/>
            }else if(_signup.role === 'operations'){
              //Get cookie values from the registration step 1 component
              setAccountCredentials({  ...accountCredentials,  username: _signup.username })
            }
        }     
    }, [])

    const changeHandler = e => {
        setAccountCredentials({ ...accountCredentials,  [e.target.name]: e.target.value })
    }
    
    const onSubmit = (data) => {
        let password = data.password
        let password2 = data.password2

        if(password !== password2){
           // Password mismatch error toast
            toast.error('Password and confirm password did\'nt match, please check and try again!', {
                position: "bottom-right",
                autoClose: 3000
            })
            return
        }
        operationsAdminSignUp()
    }

    const operationsAdminSignUp = () => {
        axios.post(`${baseUrl}/account/register/operations`, accountCredentials)
        .then(res => {
            const data = res.data
            if(data.status === 'success'){

                //Save user account info
                localStorage.setItem('user', JSON.stringify({
                    user_id: data.user_id,
                    prof_id: null,
                    username: data.username,
                    email: data.email,
                    profile_photo: null,
                    phone: null,
                    token: data.token,
                    redirect_to: data.redirect_to, 
                }))
                
            // Remove singup first step localstorage
             localStorage.removeItem('_signup')
              
             setAuth(true)
            }else{
               errorMessage(res)
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

    const errorMessage = (res) => {
        if(res.data.username != undefined){
            toast.error(`Error: ${res.data.username}`, {
                position: "bottom-right",
                autoClose: 3000
            }) 
        }
        if(res.data.email != undefined){
            toast.error(`Error: ${res.data.email}`, {
                position: "bottom-right",
                autoClose: 3000
            }) 
        }
    }


    return (
       <div className="container center-div">
       {/* Init  react-toastify */}
        <ToastContainer />
         <div className="row justify-content-center align-items-center">
            <div className="col-sm-8 col-md-6 col-lg-4">
                <div className="card my-4">
                    <div className="card-body text-center">
                        <div className="h3 font-weight-light mb-1">Sign Up</div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="text-gray-600 small">Username</label>
                                <input 
                                   className="form-control form-control-solid py-2" 
                                   type="text" 
                                   name="username" 
                                   value={accountCredentials.username}
                                   autoComplete="off" 
                                   aria-label="Username"
                                   aria-describedby="Username" 
                                   ref={register({required: "Please enter your username!", minLength: {value:6, message: "Your username is too short, minimum of 6 characters is required!"}})}
                                   onChange={changeHandler}
                                />
                                {errors.username && <label className="text-danger font-weight-bold small">{errors.username.message}</label>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="text-gray-600 small">Email</label>
                                <input 
                                   className="form-control form-control-solid py-2"
                                   type="email" 
                                   name="email" 
                                   autoComplete="off" 
                                   aria-label="userEmail" 
                                   aria-describedby="userEmail"
                                   ref={register({required: "Please enter your email!"})}
                                   onChange={changeHandler}
                                />
                                {errors.email && <label className="text-danger font-weight-bold small">{errors.email.message}</label>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="text-gray-600 small">Password</label>
                                <input className="form-control form-control-solid py-2" 
                                  type="password"
                                  name="password"
                                  autoComplete="off"  
                                  aria-label="Password"
                                  aria-describedby="Password"
                                  ref={register({required: "Password is required!", minLength: { value: 8, message: "Your password is too short, minimum of 8 characters is required!"}})}
                                  onChange={changeHandler}
                                />
                                {errors.password && <label className="text-danger font-weight-bold small">{errors.password.message}</label>}
                            </div>
                        </div>
                        <div className="col-md-12">
                        <div className="form-group">
                            <label className="text-gray-600 small">Confirm Password</label>
                            <input className="form-control form-control-solid py-2"
                                type="password"
                                name="password2"
                                autoComplete="off"
                                aria-label="Password2"
                                aria-describedby="Password2"
                                ref={register({required: "Please confirm you password!", minLength: { value: 8, message: "Your password is too short, minimum of 8 characters is required!"}})}
                                onChange={changeHandler}
                             />
                             {errors.password2 && <label className="text-danger font-weight-bold small">{errors.password2.message}</label>}
                        </div>
                        </div>
                        <div className="col-md-12 form-group  mt-3">
                            <button className="btn btn-primary btn-block  mt-2" type="submit">Create Account</button>
                        </div>
                    </div>
                    </form>
                     <hr className="my-0" />
                     <div className="card-body px-0 py-1">
                        <div className="small text-center">
                            Have an account? <Link to="/login">Sign in!</Link>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
       </div>
     </div>
    )
}

export default RegisterOperations;