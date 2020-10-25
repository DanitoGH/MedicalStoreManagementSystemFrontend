import React, { useState , useContext, useEffect } from 'react';
import { Link , Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Select  from 'react-select';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UpdateStockItemSubCategory = (props) => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

  // Props params values
  const subcat_id = props.match.params.subcat_id
  const subcat_name = props.match.params.subcat_name
  const cat_id = props.match.params.cat_id
  const cat_name = props.match.params.cat_name

  const preloadProfileValues = { name: subcat_name }
  const {register, handleSubmit, errors} = useForm({ defaultValues: preloadProfileValues })
  const [categories, setCategories] = useState({})
  const [updateData, setUpdateData] = useState({name: subcat_name, categ: cat_id})
  const [selectError, setSelectError] = useState(false)


  useEffect(() => {
    axios.get(`${baseUrl}/categories/read-category`)
    .then(res => {
      if(res.data.length > 0){
        const optionsArray = []
        res.data.map(d => {
          optionsArray.push({value: `${d.id}`, label: `${d.name}`})
        })
        setCategories(optionsArray)
      }
    })
    .catch(err => {
        if(err){
            toast.error(`Error: ${err.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
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
     setUpdateData({...updateData, categ: itemSelected.value})
     setSelectError(false)
   }

   const inputChangeHandler = e => {
    setUpdateData({ ...updateData,  name: e.target.value })
  }

  const onSubmit = () => {
    if(updateData.categ === ''){
        setSelectError(true)
      return    
    }

    axios.put(`${baseUrl}/sub-categories/update-subcategory/${subcat_id}`, updateData)
    .then(res => {
       if(res.data.success !== undefined){
          toast.success(res.data.success, {
            position: "bottom-right",
            autoClose: 3000
          })
         // Go tosubcategory-management page after successful update
         props.history.push('/subcategory-management')
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
                        <label className="small mb-1 font-weight-bold text-dark" htmlFor="itemName">Select Item Category</label>
                         <Select className="form-control-solid"  
                           name="category"
                           options={categories} 
                           rules={{ required: true }}
                           onChange={onChangeHandler}
                           styles={selectStyles}
                           defaultValue={{ value: cat_id, label: cat_name }}
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

export default UpdateStockItemSubCategory;

