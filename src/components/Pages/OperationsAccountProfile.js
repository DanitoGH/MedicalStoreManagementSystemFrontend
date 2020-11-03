import React , { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const OperationsAccountProfile = () => {

    //Base Url
    const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com'

    //User sign in details from localStorage
    const userProfileInfo = localStorage.getItem('user')
    const profile = JSON.parse(userProfileInfo)

    const preloadProfileValues = {
        username: profile.username,
        email: profile.email,
        phone: profile.phone
    }
  
    const fallbackImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgICQgHCQoICAcIBxsIFQgKIB0iIiAdHx8YHCggGCYlGxMfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NEg8NDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgQFAQMH/8QAOxABAQABAgIFCQUFCQAAAAAAAAIDARIEIgUyUoKxERMjM0JicnPBQUNTkZIhMaLR8DRhY3GBg5Oh8v/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+qAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyy8Rjx9aubszzag9RnZONyV6vbP8Wrx1zZK+8yfq1kGuMjTLk/Eyf8mqU8Tmn7z9XkoGqKMcdX3kz8U1tXdNZrmnmntSDoAAAAAAAAAAAAAAAAAAADmuu2d1csz7Tqh0hk5pxezPNXxAjxPFVk5cfLHa+2lYFAAAABPFlrHW7HXd+ykAGtgzTmndPensvRmcFe3PM+zk5aaaAAAAAAAAAAAAAAAAAAAx8t+cy1faamfXbgyfL18GSAAoAAAAAA7FbamuzU02WK2dEHQAAAAAAAAAAAAAAAAAeXEeoyfBTKa+XTdiyT2p18GQAAoAAAABqANbDr6DH8uPBktfDp6LH8vTwQTAAAAAAAAAAAAAAAAABW47JWPFO2tu6ttV/ozGl0hp6CfmaeGrO8gA655FBx3yADiQCIkAj5WlwOWsk1NVu20zvI0Ojp9FVdrJ9NEFsAAAAAAAAAAAAAAAAAHjxU7sF/Du/L9rLbOum6dtdWuVm8Vw/mdu2t015e6DwAUAAAAAAGpwk7cGP3p3fmpcLw/nt1VW2Z8neaWmm2ds9WeVB0AAAAAAAAAAAAAAAAABW46d2Dd+HWlfRZcrTdO2urXKDGE82KsNba7tdqUFAAAAAE8OPzmWYnvV2ZBf4KNuCf8AE5lhzTTbyz7LqAAAAAAAAAAAAAAAAAAAACn0jpy4697WVFd6R15cc/50pAAKAAC30d18nwz4qi10fr6Wp7U/VBoAAAAAAAAAAAAAAAAAAA5WszzVW2e1QOqefjdvLhnvV9NDNxszy4eb3q/co667ubtAld1krdkrdSIKAAAADs1U1umttdqXAFzDxtdXNO73p/f+S7pqxlzBxvs5p/3J+uiC8Ixc1O6a3T7qQAAAAAAAAAAAhkyTjndkr+dKWTjar1c7Z7Vc2oNB5ZM+PH1sk/DPNqzby5K62Sq737EAXMnHfhz3q/kq3krJzZKqkQABQAAAAAAAAAB2aqa3TVTXurWPjqn1k7venl1VBBqY+Jx5Pa212a5XsxUoyVPVqp+GgbAzsfG5J9ZtyT+nVdw5pz9XvT9sg9AAAAEMtzjxVdez/Emo9I16uO9/X/YKuTJWSt1f+f7kQUAAAAAAAAAAAAAAAAAAAAHZqprdPLUuANXh8vnsW72urU+89WdwFbc+38SfD+tWigAAM/pD18/Lnx1AFUBQAAAAAAAAAAAAAAAAAAAAAB7cF/aY73hq1AQAAf/Z'
    const [ imageSrc, setImageSrc] = useState(profile.profile_photo !== null? `${profile.profile_photo}`: null)
    const { register, handleSubmit, errors } = useForm({ defaultValues: preloadProfileValues })
    const [ profilePhoto, setProfilePhoto ] = useState(null)
  

    const imageReaderHandler = e => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = () => {
           if(reader.readyState === 2){
            setImageSrc(reader.result)
            setProfilePhoto(file)
           }
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = (data) => {
       const phone = data.phone
       const photo = profilePhoto

       const formData = new FormData() 
       formData.append('phone', phone)
       if(photo !== null){
         formData.append('profile_photo', photo)
       }

      createOrUpdateProfile(formData)
    }

    const createOrUpdateProfile = (data) => {
      (profile.prof_id === null? 
        axios.post(`${baseUrl}/api/operations-admin-profile/create-profile`, data) :
        axios.put(`${baseUrl}/api/operations-admin-profile/update-profile/${profile.prof_id}`, data))
      .then(res => {
           const data = res.data
           if(data.username !== undefined){
             
              const { id, phone, profile_photo } = data
              const { user_id, username, email, redirect_to, token } = profile

              localStorage.setItem('user', JSON.stringify({
                user_id: user_id,
                prof_id: id,
                username: username,
                email: email,
                profile_photo: profile_photo,
                phone: phone,
                redirect_to: redirect_to, 
                token: token
            }))
  
            toast.success(`Success :)`, {
              position: "bottom-right",
              autoClose: 3000
            }) 
          }   
       }).catch(err => { 
         if(err){
            toast.error(`Error, ${err.message}`, {
              position: "bottom-right",
              autoClose: 3000
           })         
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
                    <div className="form-group">
                      <label className="text-gray-600 small">Username</label>
                       <input 
                          ref={register}
                          className="form-control py-2"
                          type="text" 
                          autoComplete="off" 
                          name="username" 
                          readOnly
                      />
                    </div>
                    <div className="form-row mt-3">
                     <div className="form-group col-md-6">
                       <label className="small mb-1  text-gray-600 small" htmlFor="emailAddress">Email address</label>
                       <input 
                          ref={register}
                          className="form-control py-2"
                          type="email" 
                          autoComplete="off" 
                          name="email" 
                          readOnly
                      />
                    </div>
                    <div className="form-group col-md-6">
                       <label className="small mb-1  text-gray-600 small" htmlFor="emailAddress">Phone</label>
                       <input 
                          className="form-control py-2"
                          type="number" 
                          autoComplete="off" 
                          name="phone" 
                          placeholder="Enter phone number"
                          ref={register({required: "Phone number is required!", minLength: { value: 10, message: "Your phone number is too short, minimum of 10 characters is required!"}})}
                      />
                      {errors.phone && <label className="text-danger font-weight-bold small">{errors.phone.message}</label>}
                    </div>   
                   </div>
                   <button className="btn btn-primary mt-3  btn-block" type="submit">Save changes</button>
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
 

export default OperationsAccountProfile;