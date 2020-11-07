import React, { useState , useEffect } from 'react';
import { useForm } from "react-hook-form";
import Select  from 'react-select';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddStockItem = (props) => {

  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com'

  const {register, handleSubmit, errors} = useForm()
  const [categories, setCategories] = useState({})
  const [subcategories, setSubCategories] = useState({})
  const [supplier, setSuppier] = useState({})
  const [selectValues, setSelectValues] = useState({cat:'', subcat:'', unit:'', supplier:''})
  const [stockItemData, setStockItemData] = useState({name:'', quantity: ''})
  const [selectErrors, setSelectErrors] = useState({cat_select: false, subcat_select: false, unit_select: false ,supplier_select: false})
  const [busy, setBusy] = useState(false)


   useEffect(() => {
     getAllData()
   }, [])

   
   const getAllData = () => {
    axios.all([
       axios.get(`${baseUrl}/api/categories/get-category`),  //Get all categories
       axios.get(`${baseUrl}/api/suppliers/get-supplier`) //Get all item suppliers
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

  // Dynamically fetch subcategories of the selected category 
  const getSubCategories = (cat_id) => {
    axios.get(`${baseUrl}/api/sub-categories/get-single-subcategory/${cat_id}`)
   .then(res => {
    if(res.data.length > 0){
      const subcategoryOptionsArray = []
      res.data.map(subcat => {
         subcategoryOptionsArray.push({value: `${subcat.id}`, label: `${subcat.name}`})
      })
      setSubCategories(subcategoryOptionsArray)
    }else{
      toast.info('No data found!', {
        position: "bottom-right",
        autoClose: 3000
     }) 
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

  //Custom react select style
  const selectStyles = {
    menuList: styles => {
      return { ...styles, maxHeight: 136 }
    }
  }

  const onCategoriesChangeHandler = (itemSelected) => { 

    setSelectValues({...selectValues, cat: itemSelected.value})

    // Update selectErrors state to false
    setSelectErrors({...selectErrors, cat_select: false})
    
     // Call get subcategories functon on categories change
     getSubCategories(itemSelected.value)
  }

  const onSubcategoriesChangeHandler = (itemSelected) => { 
    setSelectValues({...selectValues, subcat: itemSelected.value})

    // Update selectErrors state to false
    setSelectErrors({...selectErrors, subcat_select: false})
  }

  const onSupplierChangeHandler = (itemSelected) => { 
    setSelectValues({...selectValues, supplier: itemSelected.value})

    // Update selectErrors state to false
    setSelectErrors({...selectErrors, supplier_select: false})
  }

  const onUnitChangeHandler = (itemSelected) => { 
    setSelectValues({...selectValues, unit: itemSelected.value})

    // Update selectErrors state to false
    setSelectErrors({...selectErrors, unit_select: false})
  }
  
 const inputChangeHandler = e => {
    setStockItemData({ ...stockItemData,  [e.target.name]: e.target.value })
 }

 const onSubmit = () => {
    if(selectValues.cat === ''){
      selectErrors.cat_select = true
    }
    if(selectValues.subcat === ''){
      selectErrors.subcat_select = true
    }
    if(selectValues.supplier === ''){
      selectErrors.supplier_select = true
    }
    if(selectValues.unit === ''){
      selectErrors.unit_select = true
    }
    
    if(!selectErrors.cat_select && !selectErrors.subcat_select && !selectErrors.supplier_select) {

      setBusy(true)
      addStockItem()
    }else{
      return
    }
 }

 const addStockItem = () => {
  axios
  .post(`${baseUrl}/api/stock-item/create-stock-item/${selectValues.cat}/${selectValues.subcat}/${selectValues.supplier}`, 
  stockItemData)
  .then(res => {
     if(res.data === 'success'){
      toast.success('Success :)', {
         position: "bottom-right",
         autoClose: 3000
        });

        setBusy(false)
        //Redirect to inventory-management      
        props.history.push("/inventory-management")
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
}

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
                <div className="card-header">Add Stock Item</div>
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
                          />
                         {selectErrors.supplier_select && <label className="text-danger font-weight-bold small">Please select item supplier</label>}
                        </div>
                        </div>
                         <br/>
                         <br/>
                       <button className="btn btn-primary mt-3 marginTop btn-block" type="submit" disabled={busy}>
                          { !busy && <span>Submit</span>}
                          { busy && <span>Please wait...</span>}
                       </button>
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
