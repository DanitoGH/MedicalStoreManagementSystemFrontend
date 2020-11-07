import React, { useState, useEffect  } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import activityTracker from '../../activityTracker';




const UpdateStockCategory = (props) => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

  const catId = props.match.params.id
  const name = props.match.params.name
  const reorderQuantity = props.match.params.qty

  const preloadProfileValues = { name: name, quantity: reorderQuantity }

  const {register, handleSubmit, errors} = useForm({ defaultValues: preloadProfileValues })
  const [categoryData, setCategoryData] = useState({name: '', quantity: ''})
  const [newActivity, setNewActivity] = useState(false)
  const [busy, setBusy] = useState(false)


  // Trigger activity tracker
  useEffect(() => {
    if(newActivity){
        activityTracker(`Cat. with an ID of '${catId}' has been updated!`, 'CRUD')
      }
  },[newActivity])


  useEffect(() => {
      setCategoryData({...categoryData,
        name: name,
        quantity: reorderQuantity
     })
  }, [])


  const changeHandler = e => {
    setCategoryData({ ...categoryData,  [e.target.name]: e.target.value })
  }
  
  const onSubmit = () => {
    setBusy(true)
     updateItemCategory()
  }

  const updateItemCategory = () => {
     axios.put(`${baseUrl}/categories/update-category/${catId}`, categoryData)
    .then(res => {
        if(res.data.success !== undefined){
        toast.success(res.data.success, {
            position: "bottom-right",
            autoClose: 3000
        })
        setBusy(false)
        //Set new activity to true
        setNewActivity(true)
        // Redirect to category-management
        props.history.push("/category-management")

      }    
    }).catch(err => {
        if(err){
            toast.error(`Error: ${err.message}`, {
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
      <div className="row">
        <div className="col-md-5 col-sm-12">
            <div className="card mb-4">
            <div className="card-header">Update Category</div>
              <div className="card-body">
                <form  onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="form-group mt-3 col-sm-12">
                      <label className="small mb-1 font-weight-bold text-dark">Item Category</label>
                      <input 
                          className="form-control" 
                          type="text" 
                          placeholder="Enter item category name" 
                          aria-label="category" autoComplete="off" 
                          name="name" 
                          aria-describedby="Category" 
                          ref={register({required: "Please enter category name!", minLength: {value:2, message: "Category name is too short, minimum of 2 characters is required!"}})}
                          onChange={changeHandler}
                      />
                      {errors.name && <label className="text-danger font-weight-bold small">{errors.name.message}</label>}
                     </div>
                      <div className="form-group mt-3 col-sm-12">
                        <label className="small mb-1 font-weight-bold text-dark">Category Reorder Alert</label>
                        <input 
                            className="form-control" 
                            type="number"
                            placeholder="Enter reorder quantity amount" 
                            aria-label="quantity" autoComplete="off" 
                            name="quantity" 
                            aria-describedby="Category" 
                            ref={register({required: "Please enter reorder quantity amount!"})}
                            onChange={changeHandler}
                        />
                        {errors.quantity && <label className="text-danger font-weight-bold small">{errors.quantity.message}</label>}
                      </div>
                      </div>
                      <br/>
                      <br/>
                      <button className="btn btn-primary marginTop btn-block" type="submit" disabled={busy}>
                          { !busy && <span>Submit</span>}
                          { busy && <span>Please wait...</span>}
                       </button>
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

export default UpdateStockCategory;