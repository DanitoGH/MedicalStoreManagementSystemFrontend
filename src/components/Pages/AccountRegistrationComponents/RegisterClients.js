import React, { useState , useContext, useEffect} from 'react';
import { Link , Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthApi from '../../auth-api';
import axios from 'axios'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RegisterClients = () => {

    //Base Url
    const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

    const { register, handleSubmit, errors } = useForm()
    const { auth, setAuth } = useContext(AuthApi)
    const [accountSignUpCredentials, setAccountSignUpCredentials] = useState({username:'', email:'', password:'', password2:''})
    const [clientAccountInfo, setClientAccountInfo] = useState({hospital_name:''})
    const [accountCreated, setAccountCreated] = useState(false)
    
    const getUser = localStorage.getItem('_signup')
    const _signup = JSON.parse(getUser)
    
    //User account details from localStorage
    const userProfileInfo = localStorage.getItem('user')
    const profile = JSON.parse(userProfileInfo)

    useEffect(() => {
        //Redirect to the right page if user manually change the URL
        if(_signup !== null){
            if(_signup.role === 'operations'){
                return <Redirect to={ "/register-operations"}/>
            }else if(_signup.role === 'client'){
              //Get cookie values from the registration step 1 component
              setAccountSignUpCredentials({  ...accountSignUpCredentials,  username: _signup.username })
            }
        }     
    }, [])


    const changeHandler = e => {
        if(e.target.name === 'hospital_name'){
            setClientAccountInfo({ ...clientAccountInfo,  [e.target.name]: e.target.value })
        }else{
            setAccountSignUpCredentials({ ...accountSignUpCredentials,  [e.target.name]: e.target.value })
        }
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

       clientsAdminSignUp()
    }

    const clientsAdminSignUp = () => {
        axios.post(`${baseUrl}/account/register/client`, accountSignUpCredentials)
        .then(res => {
            const data = res.data
            if(res.data.status === 'success'){

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

              setAccountCreated(true)
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

    // Save client other info
    useEffect(() => {
    if(accountCreated){
        // Axios interceptors
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Token ${profile.token}`;
                return config;
            },
            error => {
                return Promise.reject(error);
        })
        axios.post(`${baseUrl}/clients/create-client`, clientAccountInfo)
        .then(res => {
            if(res){

              const data = res.data

             //Store user account info
             localStorage.setItem('user', JSON.stringify({
                user_id: profile.user_id,
                prof_id: data.id,
                username: profile.username,
                email: profile.email,
                hospital_name: data.hospital_name,
                location: data.location,
                profile_photo: data.profile_photo,
                phone: data.phone,
                redirect_to: profile.redirect_to, 
                token: profile.token
            }))

             // Remove singup first step localstorage
             localStorage.removeItem('_signup')

             // Set auth to true
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
    },[accountCreated])

    const errorMessage = (res) => {
        if(res.data.username != undefined){
            toast.error(`Error: ${res.data.username}`, {
                position: "bottom-right",
                autoClose: 4000
            }) 
        }
        if(res.data.email != undefined){
            toast.error(`Error: ${res.data.email}`, {
                position: "bottom-right",
                autoClose: 4000
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
                        <div className="h3 font-weight-bold mb-1">Create Account</div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                     <div className="form-row">
                        <div className="col-md-12">
                            <div className="form-group">
                            <label className="text-gray-600 small">Hospital name</label>
                            <input className="form-control form-control-solid py-2" 
                               type="text"
                               name="hospital_name" 
                               autoComplete="off" 
                               aria-label="Hospital Name"
                               aria-describedby="hospitalName"
                               ref={register({required: "Please enter hospital's name!", minLength: {value:6, message: "Hospital name is too short, minimum of 4 characters is required!"}})}
                               onChange={changeHandler}
                            />
                            {errors.hospital_name && <label className="text-danger font-weight-bold small">{errors.hospital_name.message}</label>}
                           </div>
                        </div>
                        <div className="col-md-12">
                        <div className="form-group">
                            <label className="text-gray-600 small">Hospital email</label>
                            <input className="form-control form-control-solid py-2" 
                               type="email"
                               name="email" 
                               autoComplete="off" 
                               aria-label="hospitalEmail" 
                               aria-describedby="hospitalEmail" 
                               ref={register({required: "Please enter hospital's email!"})}
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
                            </div>
                            {errors.password && <label className="text-danger font-weight-bold small">{errors.password.message}</label>}
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="text-gray-600 small">Confirm password</label>
                                <input className="form-control form-control-solid py-2" 
                                  type="password"
                                  name="password2" 
                                  autoComplete="off" 
                                  aria-label="password2" 
                                  aria-describedby="password2" 
                                  ref={register({required: "Please confirm you password!", minLength: { value: 8, message: "Your password is too short, minimum of 8 characters is required!"}})}
                                  onChange={changeHandler}
                                />
                                {errors.password2 && <label className="text-danger font-weight-bold small">{errors.password2.message}</label>}
                            </div>
                        </div>
                        <div className="col-md-12 form-group  mt-3">
                            <button  className="btn btn-primary btn-block  mt-3">Create Account</button>
                        </div>
                     </div>
                     <hr className="my-0" />
                     <div className="card-body px-2 py-1">
                        <div className="small text-center">
                            Have an account? <Link to="/login">Sign in!</Link>
                        </div>
                     </div>
                 </form>
             </div>
          </div>
        </div>
      </div>
    </div>
    )
}


export default RegisterClients;