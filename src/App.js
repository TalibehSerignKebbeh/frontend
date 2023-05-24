import React, { useState, useEffect } from "react";
import "./App.css";
import {
  // createBrowserRouter, createRoutesFromElements,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import InventoryPage from "./components/Product/InventoryPage";
import SideBar from "./components/Navigation/SideBar";
import TopBar from "./components/Navigation/TopBar";
import AddStock from "./components/stock/AddStock";
import Stocks from "./components/stock/Stocks";
import Login from "./components/Auth/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { adminRoles, allowedRoles } from "./config/allowedRoles";
import EditProductPage from "./components/Product/EditProductPage";
import StockProducts from "./components/stock/StockProducts";
import SalesPage from "./components/sales/SalesPage";
import ProductSales from "./components/sales/ProductSales";
import UserPage from "./components/user/UserPage";
import Dashboard from "./components/Dashboard/Dashboard";
// import SellLayout from "./components/Layouts/SellLayout";
import { io } from "socket.io-client";
import useAuth from "./hooks/useAuth";
import {  serverUrl } from "./api";
import PageNotFound from "./other/PageNotFound";
import UnAuthorized from "./other/UnAuthorized";
// import ExpiredRefreshToken from "./components/Modal/ExpiredRefreshToken";
import SaleReport from "./components/Report/SaleReport";
// import TestComponent from "./TestComponent";
// import PercentChart from "./PercentChart";
import 'antd/dist/reset.css';
import Notification from "./components/Notifications/Page/Notification";
import RegisterSale from "./components/sales/RegisterSale";


function App() {
  const {username} = useAuth()
  const [socket, setsocket] =
    useState(io(serverUrl, {
      withCredentials:true,
      autoConnect: false,
      reconnectionAttempts: 3,
      secure: true,
      host:serverUrl,
    }));
  const { token } = useAuth()

  const [showSideMenu, setshowSideMenu] = useState(true);
  useEffect(() => {
    socket.connect()
    window.addEventListener('offline', (event) => {
      if (username) {
      socket.emit('user_user_online', {username: username})
      }
    })
     window.addEventListener('online', (event) => {
      if (username) {
      socket.emit('set_user_online', {username: username})
      }
    })
    return () => {
      socket.emit('set_user_offline', {username: username})
      socket.disconnect()
    }
  }, [socket, username]);
 
 
  return (
    <>
      <Router>
        <div className="maincontainer flex flex-row   ">
          <SideBar
            socket={socket}
            showSideMenu={showSideMenu}
            setshowSideMenu={setshowSideMenu}
          />
          {/* other content */}
          <div className="content relative w-full h-auto flex flex-col items-stretch">
            <TopBar
              socket={socket}
              showSideMenu={showSideMenu}
              setshowSideMenu={setshowSideMenu}
            />

            <div
              className={`' w-full  md:mx-2 mx-auto flex flex-1
          items-stretch justify-start  my-auto'  '`}
            >
              <Routes>
                <Route
                  index
                  element={
                    <Login socket={socket} />
                  }
                />
                  <Route
                    element={
                      <ProtectedRoutes
                        allowedRoles={[...Object.values(allowedRoles)]}
                      />
                    }
                  >
                    <Route
                      path="/dashboard"
                      element={<Dashboard socket={socket} />}
                    />

                    <Route path="products">
                      <Route
                        index
                        element={<InventoryPage socket={socket} />}
                      />
                      <Route
                        path="add"
                        element={<AddStock socket={socket} />}
                      />
                      <Route
                        path=":id"
                        element={<EditProductPage socket={socket} />}
                      />
                      <Route
                        path=":id/sales"
                        element={<ProductSales socket={socket} />}
                      />
                    </Route>
                    <Route path="stocks">
                      <Route index element={<Stocks socket={socket} />} />
                      <Route
                        path=":id/products"
                        element={<StockProducts socket={socket} />}
                      />
                      {/* <Route
                        path="add"
                        element={<AddStock socket={socket} />}
                      /> */}
                    </Route>
                    <Route path="/sales">
                      <Route index element={<SalesPage socket={socket} />} />
                      {/* <Route path="add" element={<RegisterSale socket={socket} />} /> */}
                    </Route>
                    <Route
                      element={
                        <ProtectedRoutes
                          allowedRoles={[...adminRoles]}
                        />
                      }
                    >
                      <Route
                        path="/users"
                        element={<UserPage socket={socket} />}
                      />
                      <Route
                        path="/report"
                        element={<SaleReport />}
                      />
                      <Route
                        
                        path="/events"
                        element={<Notification showSideMenu/>}
                      />
                    </Route>
                    {/* <Route path='/profile' element={<UserProfile socket={socket}/>} /> */}
                  </Route>

                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path="*" element={<PageNotFound />} />
                {/* <Route path='' */}
              </Routes>
            </div>
            {token && (
              <div className="card-shadow p-4 bg-white  shadow-sm shadow-orange-50 self-end 
              justify-end text-center w-full py-4">
                <h3>
                  &#169; My Mini Market Inventory Management System{" "}
                  {new Date().getFullYear()}
                </h3>
              </div>
            )}
          </div>

        </div>
      </Router>
    </>

  );
}

export default App;


