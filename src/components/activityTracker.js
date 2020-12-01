import axios from 'axios'

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function activityTracker(activity, activityType){

    const baseUrl = 'https://django-hospital-store-mng-api.herokuapp.com/api'
   
    //User account details from localStorage
    const userProfileInfo = localStorage.getItem('user')
    const user = JSON.parse(userProfileInfo)

    const activityData = {activity: activity, user: user !== null? user.user_id : 0, activity_type: activityType}

    axios.post(`${baseUrl}/tracker/add-activity`, activityData)
    .then(res => {
    if(res.data === 'success'){
        toast.success('Success :)', {
            position: "bottom-right",
            autoClose: 3000
        })
    }}).catch(err => {
        if(err){
            toast.error(`Error: ${err.message}`, {
            position: "bottom-right",
            autoClose: 3000
        })         
        }   
    })
}