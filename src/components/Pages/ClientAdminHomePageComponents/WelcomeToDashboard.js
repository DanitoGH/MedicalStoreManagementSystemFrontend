import React from 'react';



const WelcomeToDashboard = () => {

    //User sign in details from localStorage
    const getUser = localStorage.getItem('user')
    const user = JSON.parse(getUser)

    //Make the first letter of the username Uppercase
    const username = user.username[0].toUpperCase() + user.username.slice(1)

    const date = new Date();
    const weekdayOptions = {weekday: 'long'}
    const monthOptions = {month: 'long'}

    return (
      <div className="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row mt-5 mb-4">
            <div className="mr-4 mb-3 mb-sm-0">
                <h1 className="mb-0">Welcome back, {username}!</h1>
                <div className="small">
                   <span className="font-weight-500 text-primary">{ date.toLocaleDateString('en-US', weekdayOptions) } </span>
                   &#xB7; {`${date.toLocaleDateString('en-US', monthOptions)} ${date.getDate()}, ${date.getFullYear()}`} &#xB7; {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'GMT' })}
                </div>
            </div>
        </div>
    )
 }

 
export default WelcomeToDashboard;
