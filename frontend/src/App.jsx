import './App.css'
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { Routes, Route} from "react-router-dom";
import SuperAdminDash from './components/Super_Admin_Dashb/SuperAdminDash';
import PrivateRoute from './components/protectedRoute/PrivateRoute';
import RoleBaseRoutes from './components/protectedRoute/RoleBaseRoutes';
import Unauthorized from './components/unauthorized/unauthorized';
import ViewSuperAdmins from './components/SuperAdminPages/ViewSuperAdmins';
import FormCompanyProfile from './components/SuperAdminPages/FormCompanyProfile';
import FormSuperAdmin from './components/SuperAdminPages/FormSuperAdmin';
import AdminDashboard from './components/AdminDashBoard/AdminDashboard';
import FormEmployee from './components/AdminPages/FormEmployee';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import FormClient from './components/EmployeePages/FormClient';
import FormUpdateSuperAdmin from './components/SuperAdminPages/FormUpdateSuperAdmin';
import FormUpdateCompanyProfile from './components/SuperAdminPages/FormUpdateCompanyProfile';
import ViewEmployee from './components/AdminPages/ViewEmployee';
import ViewClient from './components/EmployeePages/ViewClient';
import ViewRegisteredCompanies from './components/SuperAdminPages/ViewRegisteredCompanies';
import FormUpdateClient from './components/EmployeePages/FormUpdateClient';
import FormUpdateCLientByAdmin from './components/AdminPages/FormUpdateCLientByAdmin';
import ViewClientByAdmin from './components/AdminPages/ViewClientByAdmin';


function App() {
  return (
    <>
      <Routes> 
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/super_admin" element={
            <PrivateRoute>
              <RoleBaseRoutes allowedRoles={['super_admin']}>
                <SuperAdminDash />
              </RoleBaseRoutes>
            </PrivateRoute>
          }>
               <Route index element={<FormCompanyProfile/>}></Route>
               <Route path="/super_admin/view_super_admins" element={ <ViewSuperAdmins />}></Route>
               <Route path="/super_admin/create_super_admin" element={ <FormSuperAdmin />}></Route>
               <Route path="/super_admin/update_super_admin/:id" element={ <FormUpdateSuperAdmin  />}></Route>
               <Route path="/super_admin/view_registered_company" element={ <ViewRegisteredCompanies />}></Route>
               <Route path="/super_admin/update_registered_company/:id" element={ <FormUpdateCompanyProfile />}></Route>
          </Route>

        <Route
          path="/admin" element={
            <PrivateRoute>
              <RoleBaseRoutes allowedRoles={['admin']}>
                  <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoute>
          }>
            <Route index element={<FormEmployee/>}></Route>
            <Route path="view_employees" element={ <ViewEmployee />}></Route>
            <Route path="view_clients" element={ <ViewClientByAdmin />}></Route>
            <Route path="update_client/:id" element={ <FormUpdateCLientByAdmin   />}></Route>
        
            {/* add client form to admin */}
            <Route path="create-client" element={<FormClient/>}></Route>
          </Route>


        <Route
          path="/employee" element={
            <PrivateRoute>
              <RoleBaseRoutes allowedRoles={['employee']}>
                  <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoute>
          }>
            <Route index element={<FormClient/>}></Route>
            <Route path="view_clients" element={ <ViewClient />}></Route>
            <Route path="update_client/:id" element={ <FormUpdateClient />}></Route>
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />}></Route>
      </Routes>
      <Footer />

    </>
  )
}

export default App
