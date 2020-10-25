import React , { useContext } from 'react'
import { Route , Redirect } from 'react-router-dom'

import  Auth  from '../auth-api'


 const ProtectedSignUp = ({ component: Component, ...rest}) => {

    const { auth } = useContext(Auth)
    const getUser = localStorage.getItem('user')
    const user = JSON.parse(getUser)

    return (
    <Route
      {...rest}
      render={ (props) => (!auth ? <Component {...props} /> : <Redirect to={{ pathname: user.redirect_to}} />)}
     />
    )
}

export default ProtectedSignUp;