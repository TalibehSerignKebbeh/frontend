import React, { useState, useEffect } from "react";
import "./App.css";
import {
  // createBrowserRouter, createRoutesFromElements,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ProductPage from "./components/Product/ProductPage";
import SideBar from "./components/Navigation/SideBar";
import TopBar from "./components/Navigation/TopBar";
import CategoryPage from "./components/Category/CategoryPage";
import Login from "./components/Auth/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { adminRoles, allowedRoles } from "./config/allowedRoles";
import EditProductPage from "./components/Product/EditProductPage";
import StockProducts from "./components/Category/StockProducts";
import SalesPage from "./components/sales/SalesPage";
import ProductSales from "./components/sales/ProductSales";
import UserPage from "./components/user/UserPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { io } from "socket.io-client";
import useAuth from "./hooks/useAuth";
import { serverUrl } from "./api";
import PageNotFound from "./other/PageNotFound";
import UnAuthorized from "./other/UnAuthorized";
import 'antd/dist/reset.css';
import Events from "./components/Notifications/Page/Events";
import CancellSals from "./components/sales/CancellSales";
import Page from "./components/Product/Expired/Page";


function App() {
  const { username } = useAuth()
  const [activeNavLink, setactiveNavLink] = useState('');

  const socket = io(serverUrl, {
    withCredentials: true,
    autoConnect: false,
    reconnectionAttempts: 3,
    secure: true,
    host: serverUrl,
  })

  const [showSideMenu, setshowSideMenu] = useState(true);
  useEffect(() => {
    // console.dir(navigate);
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [socket, username]);


  return (
    <>
      <Router>
        <div className="flex flex-row w-screen h-screen  overflow-x-hidden 
        bg-slate-100 dark:bg-gray-800">
          <SideBar activeNavLink={activeNavLink}
            socket={socket}
            showSideMenu={showSideMenu}
            setshowSideMenu={setshowSideMenu}
          />
          {/* other content */}
          <div className=" relative w-screen h-screen 
          flex flex-col items-stretch
          bg-inherit overflow-x-hidden">
            <TopBar
              socket={socket}
              showSideMenu={showSideMenu}
              setshowSideMenu={setshowSideMenu}
            />

            <div
              className={`' w-full  md:mx-2 mx-auto flex flex-1
          items-stretch justify-stretch  my-auto bg-inherit'  '`}
            >
              <Routes>
                <Route
                  index
                  element={
                    <Login socket={socket} setactiveNavLink={setactiveNavLink} />
                  }
                />
                <Route
                      path="expired"
                      element={<Page socket={socket} setactiveNavLink={setactiveNavLink} />}
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
                    element={<Dashboard socket={socket} setactiveNavLink={setactiveNavLink} />}
                  />
                  <Route path="/sales">
                    <Route index element={<SalesPage socket={socket} setactiveNavLink={setactiveNavLink} />} />
                    <Route path="cancelled" element={<CancellSals socket={socket} setactiveNavLink={setactiveNavLink} />} />
                    {/* <Route path="add" element={<RegisterSale socket={socket} />} /> */}
                  </Route>
                  <Route path="products">
                    <Route
                      index
                      element={<ProductPage socket={socket} setactiveNavLink={setactiveNavLink} />}
                    />
                     <Route
                      path="expired"
                      element={<Page socket={socket}  />}
                    />

                    <Route
                      path=":id"
                      element={<EditProductPage socket={socket} setactiveNavLink={setactiveNavLink} />}
                    />
                    <Route
                      path=":id/sales"
                      element={<ProductSales socket={socket} setactiveNavLink={setactiveNavLink} />}
                    />
                     
                  </Route>
                  <Route path="categories">
                    <Route index element={<CategoryPage socket={socket} setactiveNavLink={setactiveNavLink} />} />
                    <Route
                      path=":id/products"
                      element={<StockProducts socket={socket} setactiveNavLink={setactiveNavLink} />}
                    />

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
                      element={<UserPage socket={socket} setactiveNavLink={setactiveNavLink} />}
                    />
                    {/* <Route
                      path="/report"
                      element={<SaleReport setactiveNavLink={setactiveNavLink} />}
                    /> */}
                    <Route

                      path="/events"
                      element={<Events showSideMenu
                        socket={socket}
                        setactiveNavLink={setactiveNavLink} />}
                    />
                  </Route>
                  {/* <Route path='/profile' element={<UserProfile socket={socket}/>} /> */}
                </Route>

                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path="*" element={<PageNotFound />} />
                {/* <Route path='' */}
              </Routes>
            </div>
            {/* {token && (
              <div className="card-shadow p-4 
              bg-white  dark:bg-slate-700
              shadow-sm shadow-orange-50  
              justify-end text-center py-4
              text-gray-700 dark:text-white
              w-full justify-self-end self-end">
                <h3>
                  &#169; My Mini Market Inventory Management System{" "}
                  {new Date().getFullYear()}
                </h3>
              </div>
            )} */}
          </div>

        </div>
      </Router>
    </>

  );
}

export default App;


