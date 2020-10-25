import React, { useState  } from 'react';
import { useForm } from "react-hook-form";

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddStockItemSupplier = (props) => {

   const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'
   const {register, handleSubmit, errors} = useForm()
   const [supplierInfo, setSupplierInfo] = useState({name: '',item: '',email: '',phone: '',city: '', country: ''})
 
   const changeHandler = e => {
     setSupplierInfo({ ...supplierInfo,  [e.target.name]: e.target.value})
   }
   
   const onSubmit = () => {
      addSupplier()
   }

   const addSupplier = () => {
     axios.post(`${baseUrl}/suppliers/create-supplier`, supplierInfo)
     .then(res => {
      if(res.data === 'success'){
        toast.success('Success :)', {
           position: "bottom-right",
           autoClose: 3000
          })

          //Redirect to inventory-management      
          props.history.push("/supplier-management")
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

   
    return (
      <div id="layoutSidenav_content">
         <div className="container mt-4">
         <div className="row">
            <div className="col-md-8">
            <div className="card mb-4">
               <div className="card-header">Add New Supplier</div>
               <div className="card-body">
                  <form  onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                  <div className="form-group mt-3 col-sm-12 col-md-6">
                    <label className="small mb-1 font-weight-bold text-dark">Supplier Name</label>
                    <input className="form-control" 
                       type="text" 
                       placeholder="Enter supplier's name" 
                       autoComplete="off" 
                       name="name" 
                       ref={register({required: "Supplier's name is required!", minLength: {value:2, message: "Supplier's name is too short, minimum of 2 characters is required!"}})}
                       onChange={changeHandler}
                     />
                    {errors.name && <label className="text-danger font-weight-bold small">{errors.name.message}</label>}
                  </div>
                  <div className="form-group mt-3 mb-2 col-sm-12 col-md-6">
                     <label className="small mb-1 font-weight-bold text-dark">Supplied Item</label>
                     <input className="form-control" 
                       type="text" 
                       placeholder="Enter item supplied" 
                       autoComplete="off" 
                       name="item" 
                       ref={register({required: "Supplier's name is required!", minLength: {value:2, message: "Supplier's name is too short, minimum of 2 characters is required!"}})}
                       onChange={changeHandler}
                     />
                    {errors.item && <label className="text-danger font-weight-bold small">{errors.item.message}</label>}
                  </div>
                  <div className="form-group mt-3 col-sm-12 col-md-6">
                     <label className="small mb-1 font-weight-bold text-dark">Email Address</label>
                     <input className="form-control" 
                       type="email" 
                       placeholder="Enter supplier's email" 
                       autoComplete="off" 
                       name="email" 
                       ref={register({required: "Supplier's email is required!"})}
                       onChange={changeHandler}
                     />
                    {errors.email && <label className="text-danger font-weight-bold small">{errors.email.message}</label>}
                  </div>
                  <div className="form-group mt-3 col-sm-12 col-md-6">
                     <label className="small mb-1 font-weight-bold text-dark">Phone</label>
                     <input className="form-control" 
                       type="number" 
                       placeholder="Enter supplier's phone number" 
                       autoComplete="off" 
                       name="phone" 
                       ref={register({required: "Supplier's phone number is required!", minLength: {value:10, message: "Supplier's phone is too short, minimum of 10 characters is required!"}})}
                       onChange={changeHandler}
                     />
                    {errors.phone && <label className="text-danger font-weight-bold small">{errors.phone.message}</label>}
                  </div>
                  <div className="form-group mt-3 col-sm-12 col-md-6">
                     <label className="small mb-1 font-weight-bold text-dark">City</label>
                     <input className="form-control" 
                       type="text" 
                       placeholder="Enter supplier's city" 
                       autoComplete="off" 
                       name="city" 
                       ref={register({required: "Supplier's city is required!", minLength: {value:2, message: "City is too short, minimum of 2 characters is required!"}})}
                       onChange={changeHandler}
                     />
                    {errors.city && <label className="text-danger font-weight-bold small">{errors.city.message}</label>}
                  </div>
                  <div className="form-group mt-3 col-sm-12 col-md-6">
                     <label className="small mb-1 font-weight-bold text-dark">Country</label>
                     <input className="form-control" 
                       type="text" 
                       placeholder="Enter supplier's country" 
                       autoComplete="off" 
                       name="country" 
                       ref={register({required: "Supplier's country is required!", minLength: {value:3, message: "Supplier's country is too short, minimum of 3 characters is required!"}})}
                       onChange={changeHandler}
                     />
                    {errors.country && <label className="text-danger font-weight-bold small">{errors.country.message}</label>}
                  </div>
                  </div>
                  <br/>
                   <button className="btn btn-primary btn-block marginTop" type="submit">Submit</button>
                  </form>
                  </div>
               </div>
            </div>
         </div>
        </div>
       {/* Init  react-toastify */}
       <ToastContainer />
     </div>
   );
 }

 
export default AddStockItemSupplier;
