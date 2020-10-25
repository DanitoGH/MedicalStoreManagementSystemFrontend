import React from 'react';

import  PageHeader from './ClientsComponents//ClientProfileComponents/ClientProfilePageHeader';
import  PageContent from './ClientsComponents/ClientProfileComponents/ClientProfilePageContent';


const ClientProfile = (props)=> {

    return (
      <div id="layoutSidenav_content">
           <PageHeader />
           <PageContent id={props.match.params.id}/>
      </div>
    )
  }

 export default ClientProfile;
