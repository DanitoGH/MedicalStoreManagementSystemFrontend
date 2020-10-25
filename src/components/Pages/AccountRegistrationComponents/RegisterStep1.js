import React, { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';
import { useForm } from "react-hook-form";

import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const RegisterStep1 = () => {

  const { register, handleSubmit, errors } = useForm()
  const [validated, setValidated] = useState(false)
  const [role, setRole] = useState('')
  const getUser = localStorage.getItem('_signup')
  const user = JSON.parse(getUser)


  //Redirect to the right page if user manually change the URL
  if(user !== null){
    if(user.role == 'operations'){
      return <Redirect to={"/register-operations" } />
    }else if(user.role  == 'client'){
      return <Redirect to={ "/register-clients"}/>
    }  
  }

 // Role select options
 const options = [
    { value: 'client', label: 'Client' },
    { value: 'operations', label: 'Operations' }
  ]

  const onChangeHandler = (itemSelected) => { 
    setRole(itemSelected.value)
  }

  const onSubmit = (data) => {
    // Role select error toast
    if(role.length < 1){
       toast.error('Please select your role!', {
          position: "bottom-right",
          autoClose: 3000
        })
      return
     }

    //Store username and role to the localStorage for the next step of the registration
    localStorage.setItem('_signup', JSON.stringify({ username: data.username,  role: role }))

    setValidated(true)
  }
  
  // Redirect to the next step of the account registration
  if(validated){
      if(role == 'operations'){
        return <Redirect to={"/register-operations" } />
      }else if(role == 'client'){
        return <Redirect to={ "/register-clients"}/>
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
                      <div className="h3 font-weight-boldt mb-1">Sign Up</div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-md-12">
                      <div className="form-group">
                        <label className="text-gray-600 small">Username</label>
                        <input className="form-control form-control-solid py-2" 
                          aria-label="Username" autoComplete="off" 
                          type="text"
                          name="username" 
                          aria-describedby="Username" 
                          ref={register({required: "Please enter your username!", minLength: {value:6, message: "Your username is too short, minimum of 6 characters is required!"}})}
                        />
                         {errors.username && <label className="text-danger font-weight-bold small">{errors.username.message}</label>}
                      </div>
                      </div>
                      <div className="col-md-12">
                        <label className="small mb-1">User role</label>
                        <Select  
                            className="form-control-solid" 
                            name="role"
                            options={options}
                            onChange={onChangeHandler}
                            rules={{ required: true }}
                          />
                      </div>
                      <div className="col-md-12 form-group mt-5">
                        <button className="btn btn-primary btn-block  mt-3" type="submit">Next</button>
                      </div>
                     </form> 
                     <hr className="my-0" />
                     <div className="card-body px-2 py-1">
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

export default RegisterStep1;