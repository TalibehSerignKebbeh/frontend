import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import Box from "@mui/material/Box";
import SaleNotificationPanel from "../Notifications/SaleNotificationPanel";
// import AuthNotificationPanel from "../Notifications/AuthNotificationPanel";
import {  ProductionQuantityLimitsOutlined, ShoppingBagSharp } from "@mui/icons-material";
import ProductNotification from "../Notifications/ProductNotification";
import AuthNotificationsTable from "../Notifications/Table/AuthNotificationsTable";
import { queryInstance } from "../../api";

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
      socket.on("auth_notifications", async () => {
        // setauthNotifications([...authNotifications]);
        await queryInstance.get(`/notifications/auths`).then((res) => {
          if (res?.status === 200) {
            setauthNotifications(res?.data?.notifications)
          }
        })
      });

      socket.on("sales_notifications", async () => {
        // setsales_Notifications([...salesNotifications])
         await queryInstance.get(`/notifications/sales`).then((res) => {
          if (res?.status === 200) {
            // console.log(res?.data);
            setsales_Notifications(res?.data?.notifications)
          }
        })
      });
      socket.on("get_product_notify", async () => {
          // setproductNotifications([...productNotifies])
           await queryInstance.get(`/notifications/products`).then((res) => {
             if (res?.status === 200) {
            // console.log(res?.data);
            setproductNotifications(res?.data?.notifications)
          }
        })
      });
    }
    return () => {};
  }, [isAdmin, isManager, socket]);
  
  if (!token) return null;

 
  return (
    <div className="beatiful-shadow w-full p-2 py-5 bg-white shadow-white shadow-md border-y-2 border-gray-300">
      <div className="h-full float-left">
        
      </div>
      {(isAdmin || isManager) ?
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
          className=""
        >
            <div
            onClick={(e) => {
              setopenSaleNotify((prev) => !prev);
              setopenProductNotify(false);
              setopenNotifyPanel(false);
            }}
            className=" relative cursor-pointer flex flex-col h-3"
          >
            {sales_Notifications?.length > 0 && (
              <SaleNotificationPanel 
                socket={socket}
                dataArray={sales_Notifications}
                open={openSaleNotify}
                setopen={setopenSaleNotify}
              />
            )}
               <h1
                title="sales"
               className="absolute -top-3 bottom-2 left-4 
                text-red-700 font-black  text-2xl align-middle "
              >
                {sales_Notifications?.length || ''}
              </h1>
            <ShoppingBagSharp sx={{color:'#737373',opacity:.5, boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)'}}
              title="sales"
              className="absolute top-0 bottom-0 right-0 left-0 w-full h-full scale-150 "
            />
            
          </div>
          <div
            className=" relative cursor-pointer h-3 "
            title="auth"
            onClick={(e) => {
              setopenNotifyPanel((prev) => !prev);
              setopenSaleNotify(false);
              setopenProductNotify(false);
            }}
          >
            {authNotifications?.length > 0 && (
              <AuthNotificationsTable 
                socket={socket}
                data={authNotifications}
                open={openNotifyPanel}
                setopen={setopenNotifyPanel}
              />
            )}

            
              <h1
                title="auth"
              className="absolute -top-3 bottom-2 left-4 
                text-red-700 font-black  text-2xl align-middle "
              >
               {authNotifications?.length || ''}
              </h1>
            <LockClockOutlined
              sx={{color:'#737373',opacity:.5, boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)'}}
              className="absolute w-uto h-auto scale-150 " />
          </div>
        

          <div
            title="products"
            onClick={(e) => {
              setopenSaleNotify(false);
              setopenNotifyPanel(false);
              setopenProductNotify((prev) => !prev);
            }}
            className=" relative cursor-pointer flex flex-col h-3"
          >
            {productNotifications?.length > 0 && (
              <ProductNotification 
                socket={socket}
                dataArray={productNotifications}
                open={openProductNotify}
                setopen={setopenProductNotify}
              />
            )}
              <h1
                title="sales"
                className="absolute -top-3 bottom-2 left-4 
                text-red-700 font-black  text-2xl align-middle "
              >
                {productNotifications?.length || ''}
              </h1>
            <ProductionQuantityLimitsOutlined
              sx={{color:'#737373',opacity:.5, boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)'}}
              className="absolute top-0 bottom-0 right-0 left-0 w-full h-full scale-150 " />
            
          </div>
        </Box>
      </div> : null}
    </div>
  );
};

export default TopBar;
