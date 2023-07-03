import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import Box from "@mui/material/Box";
import  ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import  ShoppingBagSharp  from "@mui/icons-material/ShoppingBagSharp";
import SaleNotificationPanel from "../Notifications/SaleNotificationPanel";
import ProductNotification from "../Notifications/ProductNotification";
import AuthNotificationsTable from "../Notifications/Table/AuthNotificationsTable";
import { queryInstance } from "../../api";



const TopBar = ({ socket, showSideMenu, setshowSideMenu }) => {
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
    return () => { };
  }, [isAdmin, isManager, socket]);

  if (!token) return null;


  return (
    <div className="w-full h-28 p-2 py-5 
    bg-gray-50 dark:bg-slate-700 
    shadow-md dark:shadow-slate-600 
    flex flex-row items-center justify-between
    ">
      <div className="h-full w-1 ">

      </div>
      <div className="
      flex flex-row gap-0 items-center">

        {(isAdmin || isManager) ?
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: 'center',
              gap: "60px",
              height: "100%",
              position: "relative",
              alignContent: "center",
              justifyContent: "space-around",
              my: 'auto',
              //  pt:'1px',
              // py: 3,
              mr: '30px',
              mb:'25px',

            }}
            className=""

          >
            <div
              onClick={(e) => {
                setopenSaleNotify((prev) => !prev);
                setopenProductNotify(false);
                setopenNotifyPanel(false);
              }}
              className=" relative cursor-pointer flex flex-col my-auto"
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
                className="z-20 absolute -top-3 bottom-2 left-4 
                text-red-700 font-black  text-2xl align-middle "
              >
                {sales_Notifications?.length || ''}
              </h1>
              <ShoppingBagSharp
                
                sx={{
                  opacity: .7,
                  boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)'
                }}
                title="sales"
                className="absolute top-0 bottom-0 right-0 left-0 w-full h-full scale-150
                text-black dark:text-white "
              />

            </div>
            <div
              className=" relative cursor-pointer my-auto"
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
                className="z-20 absolute -top-3 bottom-2 left-4 
                text-red-700 font-black  text-2xl align-middle "
              >
                {authNotifications?.length || ''}
              </h1>
              <LockClockOutlined
                sx={{
                  opacity: .7,
                  boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)'
                }}
                className="absolute w-uto h-auto scale-150 
                text-black dark:text-white" />
            </div>


            <div
              title="products"
              onClick={(e) => {
                setopenSaleNotify(false);
                setopenNotifyPanel(false);
                setopenProductNotify((prev) => !prev);
              }}
              className=" relative cursor-pointer flex flex-col my-auto"
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
                className="z-20 absolute -top-3 bottom-2 left-4 
                text-red-700 font-black  text-2xl align-middle "
              >
                {productNotifications?.length || ''}
              </h1>
              <ProductionQuantityLimitsOutlined
                sx={{
                  opacity: .7,
                  boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)'
                }}
                className="absolute top-0 bottom-0 right-0 
              left-0 w-full h-full scale-150
              text-black dark:text-white " />

            </div>
          </Box>
          : null}
      </div>

    </div>
  );
};

export default TopBar;
