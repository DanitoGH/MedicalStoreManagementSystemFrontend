import React, { useState , useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Select  from 'react-select';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddStockItemSubCategory = (props) => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'
  
  const {register, handleSubmit, errors} = useForm()
  const [categories, setCategories] = useState({})
  const [itemSelectedValue, setItemSelectedValue] = useState('')
  const [selectError, setSelectError] = useState(false)
  const [subcategory, setSubCategory] = useState({name: ''})


   useEffect(() => {
     axios.get(`${baseUrl}/categories/get-category`)
     .then(res => {
      if(res.data.length > 0){
        const optionsArray = []
        res.data.map(cat => {
          optionsArray.push({value: `${cat.id}`, label: `${cat.name}`})
        })
        setCategories(optionsArray)
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
   }, [])

  //Custom react select style
  const selectStyles = {
    menuList: styles => {
      return { ...styles, maxHeight: 136 }
    }
  }

   const onChangeHandler = (itemSelected) => { 
     setItemSelectedValue(itemSelected.value)
     
     setSelectError(false)
   }

   const inputChangeHandler = e => {
    setSubCategory({ ...subcategory,  [e.target.name]: e.target.value })
  }

  const onSubmit = () => {
    if(itemSelectedValue === ''){
        setSelectError(true)
      return    
    }
    
    // Save subcategory to DB
    saveItemSubCategory()
  }

  const saveItemSubCategory = () => {
    axios.post(`${baseUrl}/sub-categories/create-subcategory/${itemSelectedValue}`, subcategory)
    .then(res => {
      if(res.data === 'success'){
        toast.success('Success :)', {
           position: "bottom-right",
           autoClose: 3000
         })

          //Redirect to inventory-management      
          props.history.push("/subcategory-management")
       }
     }).catch(err => {
        if(err){
            toast.error(`Error: ${err.message}`, {
              position: "bottom-right",
              autoClose: 3000
           })         
        }   
    })
  }

  
  return(
      <div id="layoutSidenav_content">
       <div className="container mt-4">
        <div className="row">
          <div className="col-md-5 col-sm-12">
             <div className="card mb-4">
              <div className="card-header">Add New SubCategory</div>
                <div className="card-body">
                 <form onSubmit={handleSubmit(onSubmit)}>
                   <div className="row">
                      <div className="form-group mt-3 col-sm-12">
                        <label className="small mb-1 font-weight-bold text-dark" for="itemName">Select Item Category</label>
                         <Select className="form-control-solid"  
                           name="category"
                           options={categories} 
                           rules={{ required: true }}
                           onChange={onChangeHandler}
                           styles={selectStyles}
                        />
                        {selectError && <label className="text-danger font-weight-bold small">Item category is required!</label>}
                       </div>
                       <div className="form-group mt-3 mb-2 col-sm-12">
                         <label className="small mb-1 font-weight-bold text-dark">Item Subcategory</label>
                         <input className="form-control py-2"
                            type="text" 
                            autoComplete="off" 
                            name="name" 
                            placeholder="Enter item subcategory" 
                            onChange={inputChangeHandler}
                            ref={register({required: "Item subcategory is required!"})}
                         />
                         {errors.name && <label className="text-danger font-weight-bold small">{errors.name.message}</label>}
                       </div>
                       </div>
                       <br/>
                       <br/>
                       <button className="btn btn-primary btn-block marginTop" type="submit">Submit</button>
                    </form>
                  </div>
                </div>
            </div>
        </div>
      </div>
    {/* Init react-toastify */}
    <ToastContainer />
  </div>
 );
}

export default AddStockItemSubCategory;

