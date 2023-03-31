import { useState } from "react";
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
import { allowedRoles } from "./config/allowedRoles";
import EditProductPage from "./components/Product/EditProductPage";
import StockProducts from "./components/stock/StockProducts";
import SalesPage from "./components/sales/SalesPage";
import ProductSales from "./components/sales/ProductSales";
import UserPage from "./components/user/UserPage";
import Dashboard from "./components/Dashboard/Dashboard";
import SellLayout from "./components/Layouts/SellLayout";
import io from "socket.io-client";
import useAuth from "./hooks/useAuth";
import { serverUrl } from "./api";
import PageNotFound from "./other/PageNotFound";
import UnAuthorized from "./other/UnAuthorized";
import { ToastContainer } from "react-toastify";
import { queryInstance } from "./api";

let socket = io.connect(serverUrl);
function App() {
   const handleTokenExpiration = () => {
    const tokenExpiredEvent = new CustomEvent('tokenExpired', { detail: { status: 403 } });
    document.dispatchEvent(tokenExpiredEvent);
   };
  
  const { token } = useAuth();
  const [showSideMenu, setshowSideMenu] = useState(true);
  useState(() => {
    queryInstance.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 403) {
          console.log("Token expired here in app component");
        handleTokenExpiration();
      }
      return Promise.reject(error);
      }
    )
    // socket.emit('notify')
    // window.addEventListener("offline", (e) => {
    //   console.log("You are offlline, connect back");
    // });
    // window.addEventListener("online", () => {
    //   console.log("You are online now");
    // });
  }, []);
  return (
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
                <Route element={<SellLayout socket={socket} />}>
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
                      <Route
                        path="add"
                        element={<AddStock socket={socket} />}
                      />
                    </Route>
                    <Route path="/sales">
                      <Route index element={<SalesPage socket={socket} />} />
                    </Route>
                    <Route
                      path="/users"
                      element={<UserPage socket={socket} />}
                    />
                    <Route
                      path="/report"
                      element={
                        <>
                          <h1>Hello from report page</h1>
                        </>
                      }
                    />
                    {/* <Route path='/profile' element={<UserProfile socket={socket}/>} /> */}
                  </Route>
                </Route>

                <Route path="/unauthorized" element={<UnAuthorized />} />
                <Route path="*" element={<PageNotFound />} />
                {/* <Route path='' */}
              </Routes>
            </div>
            {token && (
            <div className="p-4 bg-white  shadow-sm shadow-orange-50 self-end 
              justify-end w-full py-4">
                <h3>
                  &#169; My Mini Market Inventory Management System{" "}
                  {new Date().getFullYear()}
                </h3>
              </div>
            )}
          </div>
        </div>
        <ToastContainer limit={1} />
      </Router>
  );
}

export default App;


