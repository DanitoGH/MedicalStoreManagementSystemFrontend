import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../assets/animations/loading.json';



const PageLoading = () => {

   const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData.default,
      rendererSettings: {
         preserveAspectRatio: 'xMidYMid slice'
      }
   }

   return(
      <div className="container h-100">
       <div className="row align-items-center h-100">
        <div className="col-6 mx-auto">
          <Lottie  options={defaultOptions} width={240}/>
         </div>
        </div>
      </div>  
     )
 }
 
export default PageLoading;