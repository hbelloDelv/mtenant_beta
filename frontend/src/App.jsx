import './App.css'
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { Routes, Route} from "react-router-dom";
import SuperAdminDash from './components/Super_Admin_Dashb/SuperAdminDash';
// import SideBar from './components/SideBar.jsx/SideBar';
import PrivateRoute from './components/protectedRoute/PrivateRoute';
import RoleBaseRoutes from './components/protectedRoute/RoleBaseRoutes';
import Unauthorized from './components/unauthorized/unauthorized';
import ViewSuperAdmins from './components/SuperAdminPages/ViewSuperAdmins';
import FormCompanyProfile from './components/SuperAdminPages/FormCompanyProfile';
import FormSuperAdmin from './components/SuperAdminPages/FormSuperAdmin';
import ViewRegisteredCompay from './components/SuperAdminPages/ViewRegisteredCompay';
import AdminDashboard from './components/AdminDashBoard/AdminDashboard';
import FormEmployee from './components/AdminPages/FormEmployee';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import FormClient from './components/EmployeePages/FormClient';

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
               <Route path="/super_admin/view_registered_company" element={ <ViewRegisteredCompay />}></Route>
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
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />}></Route>
      </Routes>
      <Footer />

    </>
  )
}

export default App
