import React, { useEffect, useState } from "react";
// import img from '../../imgs/unnamed.webp'
import useAuth from "../../hooks/useAuth";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import Box from "@mui/material/Box";
import SaleNotificationPanel from "../Notifications/SaleNotificationPanel";
import AuthNotificationPanel from "../Notifications/AuthNotificationPanel";
import { MenuOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import ProductNotification from "../Notifications/ProductNotification";

const TopBar = ({ socket,showSideMenu, setshowSideMenu }) => {
  const [openNotifyPanel, setopenNotifyPanel] = useState(false);
  const [openSaleNotify, setopenSaleNotify] = useState(false);
  const [openProductNotify, setopenProductNotify] = useState(false);
  const [productNotifications, setproductNotifications] = useState([]);
  const [authNotifications, setauthNotifications] = useState([]);
  const [sales_Notifications, setsales_Notifications] = useState([]);
  const { token, isAdmin, isManager } = useAuth();

  useEffect(() => {
    if (isAdmin || isManager) {
      socket.emit("get_notifications");
      socket.on("auth_notifications", (authNotifications) => {
        setauthNotifications([...authNotifications]);
        console.log(authNotifications);
      });
      socket.on("sales_notifications", (salesNotifications) => {
        setsales_Notifications([...salesNotifications]);
        console.log(salesNotifications);
      });
        socket.on("get_product_notify", (productNotifications) => {
        setproductNotifications([...productNotifications]);
        // console.log(salesNotifications);
      });
    }
    return () => {};
  }, [isAdmin, isManager, socket]);
  if (!token) return null;

  return (
    <div className=" w-full p-2 py-8 bg-white shadow-white shadow-md border-y-2 border-gray-300">
      <div className="h-full float-left">
        
      </div>
      <div className="h-full float-right m-auto text-center my-auto mr-6">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems:'center',
            gap: "60px",
            height: "100%",
            position: "relative",
            alignContent: "center",
            justifyContent: "space-around",
            py: 3,
            
          }}
          className="notifications"
        >
          <div
            className="auth-notify relative cursor-pointer"
            title="auth"
            onClick={(e) => {
              setopenNotifyPanel((prev) => !prev);
              setopenSaleNotify(false);
              setopenProductNotify(false);
            }}
          >
            {authNotifications?.length > 0 && (
              <AuthNotificationPanel
                socket={socket}
                dataArray={authNotifications}
                open={openNotifyPanel}
                setopen={setopenNotifyPanel}
              />
            )}

            <LockClockOutlined className="absolute top-0 bottom-0 right-0 left-0 w-full h-full scale-150 " />
            {authNotifications?.length > 0 && (
              <h1
                title="auth"
                className="relative top-2 left-1 text-red-800 font-extrabold text-2xl"
              >
                {authNotifications?.length}
              </h1>
            )}
          </div>
          <div
            onClick={(e) => {
              setopenSaleNotify((prev) => !prev);
              setopenProductNotify(false);
              setopenNotifyPanel(false);
            }}
            className="sale-notify relative cursor-pointer"
          >
            {sales_Notifications?.length > 0 && (
              <SaleNotificationPanel
                socket={socket}
                dataArray={sales_Notifications}
                open={openSaleNotify}
                setopen={setopenSaleNotify}
              />
            )}

            <ShoppingBagOutlined
              title="sales"
              className="absolute top-0 bottom-0 right-0 left-0 w-full h-full scale-150 "
            />
            {sales_Notifications?.length > 0 && (
              <h1
                title="sales"
                className="relative top-2 left-1 text-red-800 font-extrabold text-2xl"
              >
                {sales_Notifications?.length}
              </h1>
            )}
          </div>

          <div
            title="products"
            onClick={(e) => {
              setopenSaleNotify(false);
              setopenNotifyPanel(false);
              setopenProductNotify((prev) => !prev);
            }}
            className="sale-notify relative cursor-pointer"
          >
            {productNotifications?.length > 0 && (
              <ProductNotification
                socket={socket}
                dataArray={productNotifications}
                open={openProductNotify}
                setopen={setopenProductNotify}
              />
            )}

            <ProductionQuantityLimitsOutlined className="absolute top-0 bottom-0 right-0 left-0 w-full h-full scale-150 " />
            {productNotifications?.length > 0 && (
              <h1
                title="sales"
                className="relative top-2 left-1 text-red-800 font-extrabold text-2xl"
              >
                {productNotifications?.length}
              </h1>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default TopBar;
