import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../assets/animations/no_match.json';



const Page404 = () => {

   const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData.default,
      rendererSettings: {
         preserveAspectRatio: 'xMidYMid slice'
      }
   }

   return(
     <div id="layoutSidenav_content">
      <div class="container h-100">
       <div class="row align-items-center h-100">
        <div class="col-6 mx-auto">
          <Lottie  options={defaultOptions} width={240}/>
         </div>
        </div>
      </div>  
     </div>
     )
 }
 
export default Page404;