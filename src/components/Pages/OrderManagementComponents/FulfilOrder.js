import React, { useState , useEffect } from 'react';
import { useForm } from "react-hook-form";
import Select  from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



 const FulfilOrder = (props) => {


  const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'

  const post_id = props.match.params.id
  const hospital_name = props.match.params.hosp_name
  const item_id = parseInt(props.match.params.item_id)
  const item = props.match.params.item
  const items_in_stock = parseInt(props.match.params.stock_qty)
  const urgency_level = props.match.params.urgency_level
  const qty_ordered = parseInt(props.match.params.ord_qty)
  const qty_delivered = parseInt(props.match.params.deliv_qty)
  const unit = props.match.params.unit
  const status = props.match.params.status


  const preloadProfileValues = { delivery_qty: qty_delivered }
  const {register, handleSubmit, errors} = useForm({ defaultValues: preloadProfileValues })
  const [updateData, setUpdateData] = useState({status: status !== 'Pending'? status : '', delivered_qty: qty_delivered})
  const [selectError, setSelectError] = useState(false)
  const [trackChanges, setTrackChanges] = useState(false)


  //Custom react select style
  const selectStyles = {
     menuList: styles => {
        return { ...styles, maxHeight: 136 }
     }
  }

  const options = [
     { value: 'Out for delivery', label: 'Out for delivery' },
     { value: 'Delivered', label: 'Delivered' }
  ]

  const onChangeHandler = (itemSelected) => {
     setUpdateData({...updateData, status: itemSelected.value})
     setSelectError(false)
     setTrackChanges(true)
  }

  const inputChangeHandler = e => {
    setUpdateData({ ...updateData,  delivered_qty: e.target.value })
    setTrackChanges(true)
  }


  const onSubmit = () => {
    
    // Redirect to homepage if no changes were made
    if(!trackChanges) return props.history.push('/')
    
    if(updateData.status === '') return setSelectError(true)

    if(updateData.delivered_qty !== qty_delivered && updateData.delivered_qty > items_in_stock){
        toast.error(`Sorry, you cannot deliver more than what you have in stock!`, {
          position: "bottom-right",
          autoClose: 4000
       })
       return 
    }

    // Deduct the delivered quantity from the totol items in stock 
    const currentTotal = updateData.delivered_qty !== qty_delivered? (items_in_stock - parseInt(updateData.delivered_qty)) : qty_delivered
    axios.all([
       axios.put(`${baseUrl}/orders/update-order/${post_id}`, updateData),
       axios.put(`${baseUrl}/stock-item/update-stock-item/${item_id}`, {quantity: currentTotal})
    ]).then(axios.spread(function (_, res) {
       if(res.data.success !== undefined){
          toast.success(`${res.data.success} :)`, {
             position: "bottom-right",
             autoClose: 3000
          })
         // Go to homepage after successful update
         props.history.push('/')
       }
    })).catch(err => {
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
            <div className="col-md-5 col-sm-12">
              <div className="card mb-2">
                 <div className="card-header">Fulfil Order from {hospital_name}</div>
                  <div className="card-body">
                   <form  onSubmit={handleSubmit(onSubmit)}>
                     <div className="row">
                       <div className="form-group col-md-12">
                         <label className="small mb-2 font-weight-bold text-dark" htmlFor="Item_category">Order summary</label>
                         <ul className="list-group">
                           <li className="list-group-item d-flex justify-content-between align-items-center">
                              Item <strong> {item} </strong>
                           </li>
                           <li className="list-group-item d-flex justify-content-between align-items-center">
                              Urgency Level<strong> {urgency_level} </strong>
                           </li>
                           <li className="list-group-item d-flex justify-content-between align-items-center">
                             Quantity ordered
                             <span className="badge badge-pill"> <h6>{qty_ordered} {unit}</h6></span>
                           </li>
                           <li className="list-group-item d-flex justify-content-between align-items-center">
                              Available quantity
                               <span className="badgebadge-pill"><h6>{ items_in_stock } {unit}</h6></span>
                           </li>
                         </ul>
                       </div>
                       <div className="form-group col-md-6">
                        <label className="small mb-1 font-weight-bold text-dark" htmlFor="deliveryQuantity">Quantity</label>
                        <input 
                            id="deliveryQuantity"
                            className="form-control py-2"
                            type="number" 
                            autoComplete="off" 
                            name="delivery_qty" 
                            placeholder="Enter delivery qty"
                            onChange={inputChangeHandler}
                            ref={register({required: "Quantity is required!", min: { value: 1, message: "Invalid quantity"}})}
                        />
                        {errors.delivery_qty && <label className="text-danger font-weight-bold small">{errors.delivery_qty.message}</label>}
                       </div>   
                       <div className="form-group col-md-6">
                         <label className="small mb-1 font-weight-bold text-dark" htmlFor="itemsStatus">Delivery status</label>
                          <Select className="form-control-solid"  
                             id="itemsStatus"
                             name="status"
                             options={options}
                             rules={{ required: true }}
                             styles={selectStyles}
                             defaultValue={{ value: status, label: status }}
                             onChange={onChangeHandler}
                          />
                          { selectError && <label className="text-danger font-weight-bold small">Select status</label> }
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
      <ToastContainer />
    </div>
    )
 }

export default FulfilOrder;
