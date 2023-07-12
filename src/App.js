import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Forgotpwd from './components/Forgotpwd';
import Otp from './components/Otp';
import Newpwd from './components/Newpwd';
import Product_info from './components/Product_info';
import Edit_product from './components/Edit_product';
import View_product from './components/View_product';
import Order from './components/Order';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import ViewOrder from './components/ViewOrder';
import EditOrder from './components/EditOrder';
import Addnewproduct from './components/Addnewproduct';


function App() {

  let token = localStorage.getItem('myapptoken')
  
  console.log(token)
  return (
    <>
    {
      token===null?<BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/password/reset' element={<Forgotpwd />} />
                 <Route path='/OTPValidation' element={<Otp />} />
                 <Route path='/create/new/password' element={<Newpwd />} />
              </Routes>
        </BrowserRouter>:<BrowserRouter>
       <Topbar/>
       <div id="layoutSidenav">
         <Sidebar/>
         <div id="layoutSidenav_content">
         <main>
               <Routes>
                 
                 <Route path='/dashboard' element={<Dashboard />} />
                 <Route path='/product/list' element={<Product_info />} />
                 <Route path='/add/new/product' element={<Addnewproduct/>}/>
                 <Route path='/edit/product/:id' element={<Edit_product/>} />
                 <Route path='/view/product/:id' element={<View_product />} />
                 <Route path='/order/details' element={<Order />} />
                 <Route path='/profile/settings/:id' element={<Settings />} />
                 <Route path='/view/order/:id' element={<ViewOrder />} />
                 <Route path='/edit/order/:id' element={<EditOrder/>} />
   
               </Routes>
             </main>
         </div>
       </div>
             
         </BrowserRouter>
    }
      
       
      </>
  );
}

export default App;
