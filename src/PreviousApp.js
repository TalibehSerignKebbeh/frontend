import { useState } from 'react';
import './App.css';
import {
  createBrowserRouter, createRoutesFromElements,
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import InventoryPage from './components/Product/InventoryPage';
import SideBar from './components/Navigation/SideBar';
import TopBar from './components/Navigation/TopBar';
// import SellProductPopper from './components/Product/SellProduct';
import AddStock from './components/stock/AddStock';
import Stocks from './components/stock/Stocks';
import Login from './components/Auth/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import { allowedRoles } from './config/allowedRoles';
// import useAuth from './hooks/useAuth';
import EditProductPage from './components/Product/EditProductPage';
import StockProducts from './components/stock/StockProducts';
import SalesPage from './components/sales/SalesPage';
import ProductSales from './components/sales/ProductSales'
import UserPage from './components/user/UserPage';
import Dashboard from './components/Dashboard/Dashboard';
// import { IconButton } from '@mui/material';
// import { AiFillCaretUp } from 'react-icons/ai';
import SellLayout from './components/Layouts/SellLayout';
// import PaginatedTable from './components/PaginatedTable';

function App() {
  // const {token} = useAuth()
  // const [loading, setloading] = useState(false);
  // const [products, setproducts] = useState([]);



  useState(() => {
    // var msMinute = 60 * 1000;
    // var msDay = 60 * 60 * 24 * 1000;
    // let a = new Date(2012, 2, 12, 23, 59, 59)
    // console.log((new Date() - a) / msDay);
    // console.log(((new Date() - a) % msDay) / msMinute);
    // const fetchProducts = async () => {
    //   setloading(true)
    //   await queryInstance.get(`/products`)
    //     .then(res => {
    //       setproducts(res?.data)
    //     }).catch(err => {element={<InventoryPage />}
    //       console.log(err);
    //     }).finally(() => { setloading(false) })
    // }
    // fetchProducts()
  }, [])
  return (
    <div className="App bg-slate-50 overflow-x-hidden">
      <Router>

        {/* main content container */}
        <div className='flex flex-row  '>

          <SideBar />
          {/* other content */}
          <div className='relative w-full h-auto flex flex-col '>
            <TopBar />

            <div className={`'h-full w-full  md:mx-2 mx-auto flex 
          flex-col items-center justify-center  my-auto'  '`}>

              <Routes>
                <Route index element={<Login />} />
                {/* <Route index element={<PaginatedTable />} /> */}
                <Route element={<SellLayout />}>

                  <Route element={<ProtectedRoutes
                    allowedRoles={[...Object.values(allowedRoles)]} />}
                  >

                    <Route path='/dashboard' element={<Dashboard />} />

                    <Route path='products'  >
                      <Route index element={<InventoryPage />} />
                      <Route path='add' element={<AddStock />} />
                      <Route path=':id' element={<EditProductPage />} />
                      <Route path=':id/sales' element={<ProductSales />} />
                    </Route>
                    <Route path='stocks'  >
                      <Route index element={<Stocks />} />
                      <Route path=':id/page' element={<StockProducts />} />
                      {/* <Route path=':id' element={"Edit stock page" } /> */}
                      <Route path='add' element={<AddStock />} />
                    </Route>
                    <Route path='/sales' >
                      <Route index element={<SalesPage />} />
                    </Route>
                    <Route path='/users' element={<UserPage />} />
                  </Route>
                </Route>

                <Route path='/unauthorized' element={"UnAuthorized"} />
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
