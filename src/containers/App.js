import React , { useState, useEffect , lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Layout from '../components/Layout/Layout';
import AuthApi from '../components/auth-api';
import axios from 'axios';

var $ = require( 'jquery' );
require('datatables.net-dt')( window, $);

import OpAdminNavigation from '../components/NavigationComponents/OpAdminNavigation';
import ClientAdminNavigation from '../components/NavigationComponents/ClientAdminNavigation';

import LoginPage from '../components/Pages/LoginPage';
import RegisterStep1 from '../components/Pages/AccountRegistrationComponents/RegisterStep1';
import ClientRegister from '../components/Pages/AccountRegistrationComponents/RegisterClients';
import OperationsRegister from '../components/Pages/AccountRegistrationComponents/RegisterOperations';

const OperationsAdmin = lazy(() =>import('../components/Pages/OperationsAdminHomePage'));
const ClientAdmin = lazy(() => import('../components/Pages/ClientAdminHomePage'));
const Clients = lazy(() => import('../components/Pages/ClientsPage'));
const ClientProfile = lazy(() => import('../components/Pages/ClientProfilePage'));
const InventoryManagement = lazy(() => import('../components/Pages/InventoryManagementPage'));
const CategoryManagement = lazy(() => import('../components/Pages/CategoryManagementPage'));
const SubCategoryManagement = lazy(() => import('../components/Pages/SubCategoryManagementPage'));
const SupplierManagement = lazy(() => import('../components/Pages/SupplierManagementPage'));
const AddStockItem = lazy(() => import('../components/Pages/StockManagementComponents/AddStockItem'));
const UpdateStockItem = lazy(() => import('../components/Pages/StockManagementComponents/UpdateStockItem'));
const AddStockItemSupplier = lazy(() => import('../components/Pages/StockManagementComponents/AddStockItemSupplier'));
const UpdateStockItemSupplier = lazy(() => import('../components/Pages/StockManagementComponents/UpdateStockItemSupplier'));
const AddStockCategory = lazy(() => import('../components/Pages/StockManagementComponents/AddStockItemCategory'));
const UpdateStockItemCategory = lazy(() => import('../components/Pages/StockManagementComponents/UpdateStockItemCategory'));
const AddStockSubCategory = lazy(() => import('../components/Pages/StockManagementComponents/AddStockItemSubcategory'));
const UpdateStockSubCategory = lazy(() => import('../components/Pages/StockManagementComponents/UpdateStockItemSubcategory'));

const RecentActivity = lazy(() => import('../components/Pages/RecentActivityPage'));
const FulfilOrder = lazy(() => import('../components/Pages/OrderManagementComponents/FulfilOrder'));
const CreateOrder = lazy(() => import('../components/Pages/OrderManagementComponents/CreateOder'));
const UpdateOrder = lazy(() => import('../components/Pages/OrderManagementComponents/UpdateOder'));

const OperationsAccountProfile = lazy(() => import('../components/Pages/OperationsAccountProfile'));
const ClientAccountProfile = lazy(() => import('../components/Pages/ClientAccountProfile'));

const ProtectedRoute = lazy(() => import('../components/ProtectedRoutes/protected-route'));
const ProtectedLogin = lazy(() => import('../components/ProtectedRoutes/protected-login'));
const ProtectedRegistration = lazy(() => import('../components/ProtectedRoutes/protected-signup'));



const App = () => { 

  //User account details from localStorage
  const userProfileInfo = localStorage.getItem('user')
  const profile = JSON.parse(userProfileInfo)

  const [auth, setAuth] = useState(false)
  
  // Global axios interceptor with user token
  if(profile !== null){
    axios.interceptors.request.use(
      config => {
          config.headers.authorization = `Token ${profile.token}`;
          return config;
      },
      error => {
          return Promise.reject(error);
      })
  }

  const readUserAuthStorage = () => {
     const token = profile
     if(token !== null){
       setAuth(true)
     }
  }

  useEffect(() => {
    readUserAuthStorage()
  }, [])


  return (
    <AuthApi.Provider value={{auth, setAuth}}>
     <Router>
      <Suspense fallback={<div>Loading...</div>}>
       <div className="App">
          <Layout>
            {/* Show navbar if user is already signed in */}
            {(auth ? (profile.redirect_to === '/'?  <OpAdminNavigation /> : <ClientAdminNavigation />) : '')}
            <Switch>

              {/* Auth Routes */}
              <ProtectedLogin  path="/login"  component={ LoginPage }  />
              <ProtectedRegistration path="/register-step1" component={ RegisterStep1 }/>
              <ProtectedRegistration path="/register-operations" component={ OperationsRegister }/>
              <ProtectedRegistration path="/register-clients" component={ ClientRegister } />
              
              {/* Operations Admin Protected Routes */}
              <ProtectedRoute path="/" exact component={OperationsAdmin} />
              <ProtectedRoute path="/recent-activity"  component={RecentActivity} />
              <ProtectedRoute path="/clients" component={Clients} />
              <ProtectedRoute path="/client-profile/:id" component={ClientProfile} />
              <ProtectedRoute path="/inventory-management" component={InventoryManagement} />
              <ProtectedRoute path="/category-management" component={CategoryManagement} />
              <ProtectedRoute path="/subcategory-management" component={SubCategoryManagement} />
              <ProtectedRoute path="/supplier-management" component={SupplierManagement} />
              <ProtectedRoute path="/add-stock-item"  component={AddStockItem} />
              <ProtectedRoute path="/add-stock-category"  component={AddStockCategory} />
              <ProtectedRoute path="/add-stock-subcategory"  component={AddStockSubCategory} />
              <ProtectedRoute path="/add-stock-item-supplier" component={AddStockItemSupplier} />
 
              <ProtectedRoute path="/fulfil-order/:id/:hosp_name/:item_id/:item/:stock_qty/:urgency_level/:unit/:ord_qty/:deliv_qty/:status"  component={FulfilOrder} />

              {/* Operations Admin Updates Routes */}
              <ProtectedRoute path="/update-stock-item/:id/:name/:qty/:cat_id/:cat/:subcat_id/:subcat/:unit/:supp_id/:supp" 
                  component={UpdateStockItem} 
              />
              <ProtectedRoute path="/update-stock-category/:id/:name/:qty" component={UpdateStockItemCategory} />
              <ProtectedRoute  path="/update-stock-subcategory/:cat_id/:cat_name/:subcat_id/:subcat_name" 
                 component={UpdateStockSubCategory} 
              />
              <ProtectedRoute  path="/update-stock-item-supplier/:id/:name/:item/:email/:phone/:city/:country" 
                 component={UpdateStockItemSupplier} 
              />

               {/* Client Admin Protected Routes */}
              <ProtectedRoute path="/client-admin" component={ClientAdmin} />
              <ProtectedRoute path="/create-order" component={CreateOrder} />
              <ProtectedRoute path="/update-order/:id/:item_id/:item/:qty/:unit/:urgency_level" component={UpdateOrder} />

               {/* Account Profile Page */}
              <ProtectedRoute path="/operations-account-profile" component={OperationsAccountProfile} />
              <ProtectedRoute path="/client-account-profile" component={ClientAccountProfile} />
            </Switch>
          </Layout>
        </div>
        </Suspense>
       </Router>
     </AuthApi.Provider>
    )
}

export default App;