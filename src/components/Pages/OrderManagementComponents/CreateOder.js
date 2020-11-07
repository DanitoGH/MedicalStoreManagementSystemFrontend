import React, { useState , useEffect } from 'react';
import { useForm } from "react-hook-form";
import Select  from 'react-select';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import activityTracker from '../../activityTracker'


const CreateOrder = (props) => {

  
  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

  const userProfileInfo = localStorage.getItem('user')
  const profile = JSON.parse(userProfileInfo)

  const {register, handleSubmit, errors} = useForm()
  const [itemsOptions, setItemsOptions] = useState(null)
  const [orderData, setOrderData] = useState({item:'', client: profile.prof_id, ordered_qty: '', delivered_qty: 0, unit: '', urgency_level:'' })
  const [selectErrors, setSelectErrors] = useState({item: false, urgency_level: false, unit_measurement: false})
  const [newActivity, setNewActivity] = useState(false)
  const [busy, setBusy] = useState(false)


  //Custom react select style
  const selectStyles = {
    menuList: styles => {
      return { ...styles, maxHeight: 136 }
    }
  }

  const urgencyLevelOptions = [
    { value: 'Critical', label: 'Critical' },
    { value: `High`, label: 'High' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Low', label: 'Low' }
  ]

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

  // Trigger activity tracker
  useEffect(() => {
    if(newActivity){
       activityTracker(`New order has been placed!`, 'Order')
     }
  },[newActivity])
  

  useEffect(() => {
    axios.get(`${baseUrl}/stock-item/get-stock-item`)
    .then(res => {
     if(res.data.length > 0){
       const optionsArray = []
       res.data.map(item => {
         optionsArray.push({value: `${item.id}`, label: `${item.name}`})
       })
       setItemsOptions(optionsArray)
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

  const inputChangeHandler = e => {
    setOrderData({ ...orderData,  ordered_qty: e.target.value })
  }

  const itemOnChangeHandler = (itemSelected) => { 
    setOrderData({ ...orderData,  item: itemSelected.value})
    setSelectErrors({...selectErrors, item: false})
  }

  const unitOnChangeHandler = (itemSelected) => { 
    setOrderData({ ...orderData,  unit: itemSelected.value})
    setSelectErrors({...selectErrors, unit_measurement: false})
  }

  const urgencyOnChangeHandler = (itemSelected) => { 
    setOrderData({ ...orderData,  urgency_level: itemSelected.value})
    setSelectErrors({...selectErrors, urgency_level: false})
  }

  const onSubmit = () => {
    if(orderData.item === ''){
      selectErrors.item = true
    }
    if(orderData.unit === ''){
      selectErrors.unit_measurement = true
    }
    if(orderData.urgency_level === ''){
      selectErrors.urgency_level = true
    }

    if(!selectErrors.item && !selectErrors.unit && !selectErrors.urgency_level) {
      setBusy(true)
      axios.post(`${baseUrl}/orders/create-order`, orderData)
      .then(res => { 
        if(res.data.success !== undefined){
          toast.success(`Your order has successfully been placed :)`, {
             position: "bottom-right",
             autoClose: 3000
          })
          setBusy(false)
          //Set new activity to true
          setNewActivity(true)
         // Go to homepage
          props.history.push('/client-admin')
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

  return(
         <div id="layoutSidenav_content">
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-5 col-sm-12">
                <div className="card mb-4">
                  <div className="card-header">Create Order</div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                       <div className="form-group col-sm-12">
                        <label className="small mb-1 font-weight-bold text-dark">Item</label>
                          { itemsOptions !== null &&
                           <Select className="form-control-solid"  
                              name="item"
                              options={itemsOptions} 
                              rules={{ required: true }}
                              onChange={itemOnChangeHandler}
                              styles={selectStyles}
                              placeholder="Select item"
                           />
                          }
                          {selectErrors.item && <label className="text-danger font-weight-bold small">Item is required!</label>}
                         </div>
                         <div className="form-group mt-3 col-sm-6">
                          <label className="small mb-1 font-weight-bold text-dark">Quantity</label>
                            <input className="form-control py-2"
                               id="ordered_qty"
                               type="number" 
                               autoComplete="off" 
                               name="ordered_qty" 
                               placeholder="Enter item quantity" 
                               onChange={inputChangeHandler}
                               ref={register({required: "Item quantity is required!"})}
                            />
                            {errors.ordered_qty && <label className="text-danger font-weight-bold small">{errors.ordered_qty.message}</label>}
                            </div>
                            <div className="form-group mt-3 col-sm-6">
                            <label className="small mb-1 font-weight-bold text-dark">Unit of measurement</label>
                            <Select className="form-control-solid"  
                               name="unit"
                               options={unitOptions} 
                               rules={{ required: true }}
                               onChange={unitOnChangeHandler}
                               styles={selectStyles}
                            />
                           {selectErrors.unit_measurement && <label className="text-danger font-weight-bold small">Unit of measurement is required!</label>}
                           </div>
                           <div className="form-group mt-3 col-sm-12">
                           <label className="small mb-1 font-weight-bold text-dark">Urgency level</label>
                            <Select className="form-control-solid"  
                               name="urgency"
                               options={urgencyLevelOptions} 
                               rules={{ required: true }}
                               onChange={urgencyOnChangeHandler}
                               styles={selectStyles}
                            />
                            {selectErrors.urgency_level && <label className="text-danger font-weight-bold small">Item category is required!</label>}
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
       {/* Init react-toastify */}
       <ToastContainer />
     </div>
    )
 }


export default CreateOrder;
