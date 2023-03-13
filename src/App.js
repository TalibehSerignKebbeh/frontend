import { useState } from 'react';
import './App.css';
import {
  // createBrowserRouter, createRoutesFromElements,
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import InventoryPage from './components/Product/InventoryPage';
import SideBar from './components/Navigation/SideBar';
import TopBar from './components/Navigation/TopBar';
import AddStock from './components/stock/AddStock';
import Stocks from './components/stock/Stocks';
import Login from './components/Auth/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import { allowedRoles } from './config/allowedRoles';
import EditProductPage from './components/Product/EditProductPage';
import StockProducts from './components/stock/StockProducts';
import SalesPage from './components/sales/SalesPage';
import ProductSales from './components/sales/ProductSales'
import UserPage from './components/user/UserPage';
import UserProfile from './components/user/UserProfile.js';
import Dashboard from './components/Dashboard/Dashboard';
import SellLayout from './components/Layouts/SellLayout';
import io from 'socket.io-client'
import {  serverUrl } from './api';
// import SampleFormValidation from './other/SampleFormValidation';
let socket = io.connect(serverUrl)
function App() {
  //"homepage": "https://TalibehSerignKebbeh.github.io/frontend",


const [showSideMenu, setshowSideMenu] = useState(true);
  useState(() => {
   
    // socket.emit('notify')
    window.addEventListener('offline', (e) => {
      console.log("You are offlline, connect back");
    })
    window.addEventListener('online', () => {
      console.log("You are online now");
    })
  }, [])
  return (
    <div className="App bg-slate-50 overflow-x-hidden">
      <Router>

        <div className='flex flex-row  '>
          <SideBar socket={socket} showSideMenu={showSideMenu} setshowSideMenu={setshowSideMenu}/>
          {/* other content */}
          <div className='relative w-full h-auto flex flex-col '>
            <TopBar socket={socket} showSideMenu={showSideMenu} setshowSideMenu={setshowSideMenu}/>

            <div className={`'h-full w-full  md:mx-2 mx-auto flex 
          flex-col items-center justify-center  my-auto'  '`}>

              <Routes>
                <Route index element={<Login socket={socket}/>} />
                <Route element={<SellLayout socket={socket}/>}>

                  <Route element={<ProtectedRoutes
                    allowedRoles={[...Object.values(allowedRoles)]} />}
                  >

                    <Route path='/dashboard' element={<Dashboard socket={socket}/>} />

                    <Route path='products'  >
                      <Route index element={<InventoryPage socket={socket}/>} />
                      <Route path='add' element={<AddStock socket={socket}/>} />
                      <Route path=':id' element={<EditProductPage socket={socket}/>} />
                      <Route path=':id/sales' element={<ProductSales socket={socket}/>} />
                    </Route>
                    <Route path='stocks'  >
                      <Route index element={<Stocks socket={socket}/>} />
                      <Route path=':id/page' element={<StockProducts socket={socket}/>} />
                      {/* <Route path=':id' element={"Edit stock page" } /> */}
                      <Route path='add' element={<AddStock socket={socket}/>} />
                    </Route>
                    <Route path='/sales' >
                      <Route index element={<SalesPage socket={socket}/>} />
                    </Route>
                    <Route path='/users' element={<UserPage socket={socket}/>} />
                    <Route path='/profile' element={<UserProfile socket={socket}/>} />
                  </Route>
                </Route>

                <Route path='/unauthorized' element={"UnAuthorized"} />
                <Route path='*' element={"Page not found"} />
                {/* <Route path='' */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
