import React from 'react';

import  PageHeader from './InventoryManagementComponents/InventoryManagementPageHeader';
import  PageContent from './InventoryManagementComponents/InventoryManagementPageContent';


const InventoryManagement = () => {

    return (
      <div id="layoutSidenav_content">
           <PageHeader/>
           <PageContent />
      </div>
    )
 }

 export default InventoryManagement;
