import React from 'react';

import  PageHeader from './SupplierManagementComponents/PageHeader';
import  PageContent from './SupplierManagementComponents/PageContent';

class SupplierManagement extends React.Component {

  componentDidMount () {
    // Append init_lib js to body
     const init_lib = document.createElement("script");
       init_lib.src = "utils/init-libraries.js";
       init_lib.async = true;
       document.body.appendChild(init_lib);
  }

  render(){
    return (
      <div id="layoutSidenav_content">
           <PageHeader/>
           <PageContent />
      </div>
    )}
 }

export default SupplierManagement;
