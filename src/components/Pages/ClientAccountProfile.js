import React , { useState } from 'react';

import { useForm } from "react-hook-form";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ClientAccountProfile = (props) => {

    //Base Url
    const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com'

    //User sign in details from localStorage
    const userProfileInfo = localStorage.getItem('user')
    const profile = JSON.parse(userProfileInfo)

    const preloadProfileValues = {
        username: profile !== null? profile.username : '',
        email: profile !== null? profile.email : '',
        hospital_name: profile !== null? profile.hospital_name: '',
        location: profile !== null? profile.location: '',
        phone: profile !== null? profile.phone :'' 
    }

    const fallbackImage = 'https://i7.pngguru.com/preview/501/90/524/video-game-gaymer-gamer-queer-red-cross-hospital-icon.jpg'
    const [ imageSrc, setImageSrc] = useState(profile !== null && profile.profile_photo !== null ? `${profile.profile_photo}`: null)
    const { register, handleSubmit, errors } = useForm({ defaultValues: preloadProfileValues })
    const [trackChanges, setTrackChanges] = useState(false)
    const [busy, setBusy] = useState(false)

  
    const inputChangeHandler = () => {
      setTrackChanges(true)
    }

    const imageReaderHandler = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = () => {
           if(reader.readyState === 2){
            setImageSrc(reader.result)
           }
        }
        reader.readAsDataURL(file)
        setTrackChanges(true)
    }

  
    const onSubmit = (data) => {
     // Redirect to homepage if no changes were made
     if(!trackChanges) return props.history.push('/client-admin')

      const formData = new FormData() 
      
      const profilePhoto = data.picture[0]
      const hospital_name = data.hospital_name
      const location = data.location
      const phone = data.phone

      formData.append('hospital_name', hospital_name)
      formData.append('location', location)
      formData.append('phone', phone)
  
      if(profilePhoto !== undefined){
         formData.append('profile_photo', profilePhoto)
      }
      setBusy(true)
      updateProfile(formData)
    }

    const updateProfile = (data) => {
       axios.put(`${baseUrl}/api/clients/update-client/${profile.prof_id}`, data)
      .then(res => {
        const data = res.data
        if(data.success !== undefined){

          const { id, user, hospital_name, location, phone, profile_photo } = data.response
          const { username, email, redirect_to, token } = profile

           localStorage.setItem('user', JSON.stringify({
              user_id: user,
              prof_id: id,
              username: username,
              email: email,
              hospital_name: hospital_name,
              location: location,
              profile_photo: profile_photo,
              phone: phone,
              redirect_to: redirect_to, 
              token: token
          }))

         toast.success(data.success, {
            position: "bottom-right",
            autoClose: 3000
         })
         setBusy(false)
         return props.history.push('/client-admin')
        }         
       }).catch(err => { 
         if(err){
            toast.error(`Error, ${err.message}`, {
              position: "bottom-right",
              autoClose: 3000
           })  
           setBusy(false)       
        }
     })
  }


  return(
     <div id="layoutSidenav_content">
       <div className="container mt-4">
       <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
          <div className="col-xl-4 ">
            {/* <!-- Profile picture card--> */}
            <div className="card  mb-4">
             <div className="card-header">Profile Picture</div>
               <div className="card-body text-center">
                {/* <!-- Profile picture image--> */}
                 <img className="img-account-profile rounded-circle mb-2" 
                   src={(imageSrc !== null? imageSrc: fallbackImage) } 
                   width="55%" 
                   height="50%"
                   alt="Operations" 
                 />
                 {/* <!-- Profile picture help block--> */}
                 <div className="small font-italic text-muted mb-2">JPG or PNG no larger than 5 MB</div>
                  {/* <!-- Profile picture upload button--> */}
                 <div className="custom-file mb-4">
                   <input ref={register} 
                    type="file" 
                    id="customFile" 
                    className="custom-file-input form-control-sm"  
                    name="picture"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={imageReaderHandler}
                  />
                  <label className="custom-file-label col-form-label-sm" htmlFor="custmFile">Upload new image</label>
                </div>
               </div>
            </div>
        </div>
        <div className="col-xl-8">
            <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                  {/* <!-- Form Group (username)--> */}
                  <div className="form-group">
                   <label className="small mb-1" htmlFor="Username">Username</label>
                    <input 
                       className="form-control py-2"
                       id="Username"
                       type="text" 
                       autoComplete="off" 
                       name="username" 
                       placeholder="Enter username" 
                       ref={register({required: "Hospital username is required!", minLength: { value: 2, message: "Your username is too short, minimum of 2 characters is required!"}})}
                       readOnly
                    />
                    {errors.username && <label className="text-danger font-weight-bold small">{errors.username.message}</label>}
                    </div>
                    {/* <!-- Form Row  --> */}
                    <div className="form-row">
                     {/* <!-- Form Group (hospital name)--> */}
                     <div className="form-group col-md-6">
                      <label className="small mb-1" htmlFor="hospital_name">Hospital name</label>
                      <input 
                         className="form-control py-2"
                         id="hospital_name"
                         type="text" 
                         autoComplete="off" 
                         name="hospital_name" 
                         placeholder="Enter hospital name" 
                         onChange={inputChangeHandler}
                         ref={register({required: "Hospital name is required!", minLength: { value: 2, message: "Your Hospital name is too short, minimum of 2 characters is required!"}})}
                      />
                       {errors.hospital_name && <label className="text-danger font-weight-bold small">{errors.hospital_name.message}</label>}
                      </div>
                       {/* <!-- Form Group (location)--> */}
                      <div className="form-group col-md-6">
                       <label className="small mb-1" htmlFor="hospital_location">Location</label>
                       <input 
                          className="form-control py-2"
                          id="hospital_location"
                          type="text" 
                          autoComplete="off" 
                          name="location" 
                          placeholder="Enter hospital location"
                          onChange={inputChangeHandler}
                          ref={register({required: "Hospital location is required!", minLength: { value: 2, message: "Your Hospital location is too short, minimum of 2 characters is required!"}})}
                       />
                      {errors.location && <label className="text-danger font-weight-bold small">{errors.location.message}</label>}
                     </div>
                    </div>
                    {/* <!-- Form Group (email address)--> */}
                    <div className="form-group">
                    <label className="small mb-1" htmlFor="hospitalEmailAddress">Email address</label>
                    <input 
                       className="form-control py-2"
                       id="hospitalEmailAddress"
                       type="email" 
                       autoComplete="off" 
                       name="email" 
                       placeholder="Enter hospital location" 
                       ref={register({required: "Hospital location is required!", minLength: { value: 2, message: "Your Hospital location is too short, minimum of 2 characters is required!"}})}
                       readOnly
                    />
                   {errors.email && <label className="text-danger font-weight-bold small">{errors.email.message}</label>}
                   </div>
                   {/* <!-- Form Row--> */}
                   <div className="form-row">
                    {/* <!-- Form Group (phone number )--> */}
                    <div className="form-group col-md-6">
                     <label className="small mb-1" htmlFor="hospitalPhone">Phone number</label>
                      <input 
                        className="form-control py-2"
                        id="hospitalPhone" 
                        type="number" 
                        autoComplete="off" 
                        name="phone" 
                        placeholder="Enter your phone number" 
                        onChange={inputChangeHandler}
                        ref={register({required: "Phone is required!", minLength: { value: 10, message: "Your phone number is too short, minimum of 10 characters is required!"}})}
                     />
                     {errors.phone && <label className="text-danger font-weight-bold small">{errors.phone.message}</label>}
                    </div>
                  </div>
                  {/* <!-- Save changes button--> */}
                  <br/>
                 <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
                     { !busy && <span>Save changes</span>}
                     { busy && <span>Please wait...</span>}
                 </button>
              </div>
             </div>
            </div>
          </div>
         </form>
        </div>
       {/* Init  react-toastify */}
       <ToastContainer />
      </div>
     )
 }
 

export default ClientAccountProfile;