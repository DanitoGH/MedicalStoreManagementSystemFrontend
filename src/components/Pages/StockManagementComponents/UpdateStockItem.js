import React, { useState , useEffect } from 'react';
import { useForm } from "react-hook-form";
import Select  from 'react-select';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import activityTracker from '../../activityTracker';




const AddStockItem = (props) => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

  // Props params
  const itemId = props.match.params.id
  const name = props.match.params.name
  const quantity = props.match.params.qty
  const cat_id = props.match.params.cat_id
  const cat = props.match.params.cat
  const subcat_id = props.match.params.subcat_id
  const subcat = props.match.params.subcat
  const unit = props.match.params.unit
  const supp_id = props.match.params.supp_id
  const supp = props.match.params.supp


  const preloadProfileValues = { name: name, quantity: quantity }

  const {register, handleSubmit, errors} = useForm({ defaultValues: preloadProfileValues })
  const [categories, setCategories] = useState({})
  const [subcategories, setSubCategories] = useState(null)
  const [supplier, setSuppier] = useState(null)
  const [stockItemData, setStockItemData] = useState({name: name, quantity: quantity, cat: cat_id, subcat: subcat_id, unit: unit, supplier: supp_id})
  const [selectErrors, setSelectErrors] = useState({cat_select: false, subcat_select: false, unit_select: false ,supplier_select: false})
  const [newActivity, setNewActivity] = useState(false)
  const [busy, setBusy] = useState(false)



  useEffect(() => {
    getAllData()
  }, [])

  
 // Trigger activity tracker
 useEffect(() => {
   if(newActivity){
    activityTracker(`Stock item '${name}' has been updated!`, 'CRUD')
   }
 },[newActivity])


  const getAllData = () => {
    axios.all([
       axios.get(`${baseUrl}/categories/read-category`),  //Get all categories
       axios.get(`${baseUrl}/suppliers/read-supplier`) //Get all item suppliers
   ])
   .then(axios.spread(function (cat, supp) {

      const categoryOptionsArray = []
      const supplierOptionsArray = []

      cat.data.map(cat => {
        categoryOptionsArray.push({value: `${cat.id}`, label: `${cat.name}`})
      })
      supp.data.map(supp => {
        supplierOptionsArray.push({value: `${supp.id}`, label: `${supp.name}`})
      })
 
      setCategories(categoryOptionsArray)
      setSuppier(supplierOptionsArray)
    }))
    .catch(err => {
        if(err){
            toast.error(`Error: ${err.message}`, {
              position: "bottom-right",
              autoClose: 3000
           })         
        }   
    })
  }

  // Dynamically fetch subcategories for the selected category 
  const getSubCategories = (cat_id) => {
    axios.get(`${baseUrl}/sub-categories/read-subcategory/${cat_id}`)
   .then(res => {
    if(res.data.length > 0){
      const subcategoryOptionsArray = []
      res.data.map(subcat => {
         subcategoryOptionsArray.push({value: `${subcat.id}`, label: `${subcat.name}`})
      })
      setSubCategories(subcategoryOptionsArray)
    }
  })
  .catch(err => {
    if(err){
        toast.error(`Error 2: ${err.message}`, {
          position: "bottom-right",
          autoClose: 3000
      })         
     }   
   })
  }

  //React select style
  const selectStyles = {
    menuList: styles => {
      return { ...styles, maxHeight: 136 }
    }
  }

  const onCategoriesChangeHandler = (itemSelected) => { 
    setStockItemData({...stockItemData, cat: itemSelected.value})
    // Update selectErrors state to false
    setSelectErrors({...selectErrors, cat_select: false})
     // Call get subcategories functon on categories change
     getSubCategories(itemSelected.value)
  }

  const onSubcategoriesChangeHandler = (itemSelected) => { 
    setStockItemData({...stockItemData, subcat: itemSelected.value})
    // Update selectErrors state to false
    setSelectErrors({...selectErrors, subcat_select: false})
  }

  const onSupplierChangeHandler = (itemSelected) => { 
    setStockItemData({...stockItemData, supplier: itemSelected.value})
    // Update selectErrors state to false
    setSelectErrors({...selectErrors, supplier_select: false})
  }

  const onUnitChangeHandler = (itemSelected) => { 
    setStockItemData({...stockItemData, unit: itemSelected.value})
    // Update selectErrors state to false
    setSelectErrors({...selectErrors, unit_select: false})
  }
  
 const inputChangeHandler = e => {
    setStockItemData({ ...stockItemData,  [e.target.name]: e.target.value })
 }

 const onSubmit = () => {
    if(stockItemData.cat === ''){
      selectErrors.cat_select = true
    }
    if(stockItemData.subcat === ''){
      selectErrors.subcat_select = true
    }
    if(stockItemData.supplier === ''){
      selectErrors.supplier_select = true
    }
    if(stockItemData.unit === ''){
      selectErrors.unit_select = true
    }
    
    if(!selectErrors.cat_select && !selectErrors.subcat_select && !selectErrors.supplier_select) {
      setBusy(true)
      axios.put(`${baseUrl}/stock-item/update-stock-item/${itemId}`, stockItemData)
      .then(res => {
         if(res.data.success !== undefined){
            toast.success('Update success :)', {
               position: "bottom-right",
               autoClose: 3000
            })
            setBusy(false)
          //Set new activity to true
           setNewActivity(true)
           // Go to inventory-management page after successful update
           props.history.push('/inventory-management')
         }
      })
      .catch(err => {
          if(err){
              toast.error(`Error: ${err.message}`, {
                position: "bottom-right",
                autoClose: 3000
             })
             setBusy(false)         
          }   
      })
    }else{
      return
    }
 }

 //////////////   UNIT SELECT OPTIONS   /////////////////
 const unitOptions = [
        { value: 'UI', label: 'Unit' },
        { value: `UI's`, label: 'Units' },
        { value: 'Pks', label: 'Pack' },
        { value: 'Bx', label: 'Box' },
        { value: 'Bxs', label: 'Boxes' },
        { value: 'L', label: 'Liters' },
        { value: 'mL', label: 'Milliliters'},
        { value: 'CI', label: 'Container'},
        { value: `CIs`, label: 'Container'},
        { value: 'CTN', label: 'Carton'},
        { value: `CTNs`, label: 'Cartons'},
        { value: `PR`, label: 'Pair'},
        { value: 'PRs', label: 'Pairs'}
  ]


  return (
      <div id="layoutSidenav_content">
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">Update Stock Item</div>
                  <div className="card-body">
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div id="ItemCategory" className="form-group col-sm-12 col-md-6">
                      <label className="small mb-1 font-weight-bold text-dark">Item Category</label>
                       <Select className="form-control-solid"  
                          name="category"
                          options={categories} 
                          placeholder="Select item category"
                          rules={{ required: true }}
                          onChange={onCategoriesChangeHandler}
                          styles={selectStyles}
                          defaultValue={{ value: cat_id,  label: cat }}
                      />
                       {selectErrors.cat_select && <label className="text-danger font-weight-bold small">Please select item category</label>}
                      </div>
                      <div className="form-group col-sm-12 col-md-6">
                        <label className="small mb-1 font-weight-bold text-dark">Item Subcategory</label>
                         <Select className="form-control-solid"  
                           name="subcategory"
                           options={subcategories} 
                           placeholder="Select item subcategory"
                           rules={{ required: true }}
                           onChange={onSubcategoriesChangeHandler}
                           defaultValue={{ value: subcat_id, label: subcat }}
                           styles={selectStyles}
                        />
                       {selectErrors.subcat_select && <label className="text-danger font-weight-bold small">Please select item subcategory</label>}
                      </div>
                       <div className="form-group mt-3 col-sm-12 col-md-6">
                          <label className="small mb-1 font-weight-bold text-dark">Item Name</label>
                          <input className="form-control py-2"
                             type="text" 
                             autoComplete="off" 
                             name="name"
                             placeholder="Enter item name"
                             onChange={inputChangeHandler}
                             ref={register({required: "Item name is required!", minLength: { value: 2, message: "Item name is too short, minimum of 2 characters is required!"}})}
                          />
                          {errors.name && <label className="text-danger font-weight-bold small">{errors.name.message}</label>}
                        </div>
                        <div className="form-group mt-3 mb-2 col-sm-12 col-md-6">
                         <label className="small mb-1 font-weight-bold text-dark">Item Quantity</label>
                          <input className="form-control py-2"
                            type="number" 
                            autoComplete="off" 
                            name="quantity" 
                            placeholder="Enter item quantity" 
                            onChange={inputChangeHandler}
                            ref={register({required: "Item subcategory is required!"})}
                         />
                         {errors.quantity && <label className="text-danger font-weight-bold small">{errors.quantity.message}</label>}
                        </div>
                        <div className="form-group mt-3 col-sm-12 col-md-6">
                         <label className="small mb-1 font-weight-bold text-dark">Item Unit</label>
                          <Select className="form-control-solid"  
                              name="unit"
                              options={unitOptions} 
                              rules={{ required: true }}
                              onChange={onUnitChangeHandler}
                              styles={selectStyles}
                              defaultValue={{ value: unit, label: unit }}
                          />
                         {selectErrors.unit && <label className="text-danger font-weight-bold small">Please select item unit</label>}
                        </div>
                        <div className="form-group mt-3 col-sm-12 col-md-6">
                          <label className="small mb-1 font-weight-bold text-dark">Item Supplier</label>
                           <Select className="form-control-solid"  
                              name="supplier"
                              options={supplier} 
                              rules={{ required: true }}
                              onChange={onSupplierChangeHandler}
                              styles={selectStyles}
                              defaultValue={{ value: supp_id, label: supp}}
                          />
                         {selectErrors.supplier_select && <label className="text-danger font-weight-bold small">Please select item supplier</label>}
                         </div>
                         </div>
                         <br/>
                         <br/>
                       <button className="btn btn-primary marginTop btn-block" type="submit">Submit</button>
                     </form>
                   </div>
                </div>
            </div>
          </div>
         </div>
        {/* Init react-toastify */}
       <ToastContainer />
     </div>
    )
 }

export default AddStockItem;
