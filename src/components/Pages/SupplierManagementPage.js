import React from 'react';

import  PageHeader from './SupplierManagementComponents/SupplierManagementPageHeader';
import  PageContent from './SupplierManagementComponents/SupplierManagementPageContent';

const SupplierManagement = () => {

    return (
      <div id="layoutSidenav_content">
           <PageHeader/>
           <PageContent />
      </div>
    )
 }

export default SupplierManagement;
