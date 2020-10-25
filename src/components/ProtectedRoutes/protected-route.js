import React , { useContext } from 'react'
import { Route , Redirect } from 'react-router-dom'

import  Auth  from '../auth-api'

 const ProtectedRoute = ({ component: Component, ...rest}) => {

    const { auth } = useContext(Auth)

    return (
     <Route
       {...rest} 
       render={ (props) => (auth ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />)}
    />
    )
}

export default ProtectedRoute;