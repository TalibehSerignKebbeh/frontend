import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import ShoppingBagSharp from "@mui/icons-material/ShoppingBagSharp";
import SaleNotificationPanel from "../Notifications/SaleNotificationPanel";
import ProductNotification from "../Notifications/ProductNotification";
import AuthNotificationsTable from "../Notifications/Table/AuthNotificationsTable";
import { queryInstance } from "../../api";
import Tooltip from '@mui/material/Tooltip'



const TopBar = ({ socket, showSideMenu, setshowSideMenu }) => {

  const [openAuthNotify, setOpenAuthNotify] = useState(false);
  const [openSaleNotify, setopenSaleNotify] = useState(false);
  const [openProductNotify, setopenProductNotify] = useState(false);
  const [productNotifications, setproductNotifications] = useState([]);
  const [authNotifications, setauthNotifications] = useState([]);
  const [sales_Notifications, setsales_Notifications] = useState([]);
  const { token, isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      socket.emit("get_notifications");
      socket.on("auth_notifications", async () => {
        // setauthNotifications([...authNotifications]);
        await queryInstance.get(`/notifications/auths`, {
          headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
          if (res?.status === 200) {
            setauthNotifications(res?.data?.notifications)
          }
        })
      });

      socket.on("sales_notifications", async () => {
        // setsales_Notifications([...salesNotifications])
        await queryInstance.get(`/notifications/sales`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((res) => {
          if (res?.status === 200) {
            // console.log(res?.data);
            setsales_Notifications(res?.data?.notifications)
          }
        })
      });
      socket.on("get_product_notify", async () => {
        // setproductNotifications([...productNotifies])
        await queryInstance.get(`/notifications/products`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((res) => {
          if (res?.status === 200) {
            // console.log(res?.data);
            setproductNotifications(res?.data?.notifications)
          }
        })
      });
    }
    return () => { };
  }, [isAdmin, socket, token]);

  if (!token) return null;


  return (
    <div className="
     self-start justify-self-start
     w-full h-40  max-h-44 p-2 py-5 
    bg-gray-50 dark:bg-slate-700 
    shadow-md dark:shadow-slate-800 
    flex flex-row items-center justify-end
    "
      style={{ minHeight: '70px', }}
    >

      {(isAdmin) ?
        <div
          className="flex flex-row items-center justify-between relative
            gap-14 justify-self-center h-full w-max md:mr-12 sm:mr-7 mr-3"

        >
        
          <button className="relative"
            onClick={e => {
              setOpenAuthNotify(false)
              setopenSaleNotify(prev => !prev)
              setopenProductNotify(false)
            }}
          >
            <ShoppingBagSharp
              sx={{ transform: 'scale(1.7)' }}
              className="text-black dark:text-slate-50"
            />
            {sales_Notifications?.length ?
              <h2 className="bg-red-600 text-white
            py-[1px] px-[4px] rounded-[50%] -right-3 -top-3 absolute
            text-lg">{sales_Notifications?.length}</h2>
              : null}
          </button>

          <button
            className="relative"
            onClick={e => {
              setOpenAuthNotify(prev => !prev)
              setopenSaleNotify(false)
              setopenProductNotify(false)
            }}
          >
            <LockClockOutlined
              sx={{ transform: 'scale(1.7)' }}
              className="text-black dark:text-slate-50"
            />
            {authNotifications?.length ?
              <h2 className="bg-red-600 text-white
              py-[1px] px-[4px] rounded-[50%] 
              -right-3 -top-3 absolute
              text-lg 
            ">{authNotifications?.length}</h2>
            : null}
          </button>

          <button className="relative"
            onClick={e => {
              setOpenAuthNotify(false)
              setopenSaleNotify(false)
              setopenProductNotify(prev => !prev)
            }}
          >
            <ProductionQuantityLimitsOutlined
              sx={{ transform: 'scale(1.7)' }}
              className="text-black dark:text-slate-50"
            />
            {productNotifications?.length ?
              <h2 className="bg-red-600 text-white
            py-[1px] px-[4px] rounded-[50%] -right-3 -top-3 absolute
            text-lg">{productNotifications?.length}</h2>
              : null}
          </button>

          {/* auth notification dialog */}
          {(openAuthNotify) && (
                <AuthNotificationsTable
                  socket={socket}
                  data={authNotifications}
                  open={openAuthNotify}
                  setopen={setOpenAuthNotify}
                />
          )}


          {/* sales notifications dialog */}
          {(openSaleNotify) > 0 && (
                <SaleNotificationPanel
                  socket={socket}
                  dataArray={sales_Notifications}
                  open={openSaleNotify}
                  setopen={setopenSaleNotify}
                />
              )}

          {/* products notification dialog */}
           {(openProductNotify) && (
                <ProductNotification
                  socket={socket}
                  dataArray={productNotifications}
                  open={openProductNotify}
                  setopen={setopenProductNotify}
                />
              )}

          
          {/* <div
              onClick={(e) => {
                setopenSaleNotify((prev) => !prev);
                setopenProductNotify(false);
                setOpenAuthNotify(false);
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
              {sales_Notifications?.length ?
                <h1
                title="sales"
                className="z-20 absolute -top-5  left-4 
                bg-red-600 p-2 py-1 rounded-full text-white font-black  text-xl"
              >
                {sales_Notifications?.length || ''}
              </h1> : null}
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
                setOpenAuthNotify((prev) => !prev);
                setopenSaleNotify(false);
                setopenProductNotify(false);
              }}
            >
              {authNotifications?.length > 0 && (
                <AuthNotificationsTable
                  socket={socket}
                  data={authNotifications}
                  open={openAuthNotify}
                  setopen={setOpenAuthNotify}
                />
              )}


              {authNotifications?.length ?
                <h1
                title="auth"
                className="z-20 absolute -top-5  left-4 
                bg-red-600 p-2 py-1 rounded-full text-white font-black  text-xl"
              >
                {authNotifications?.length || ''}
              </h1> : null}
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
                setOpenAuthNotify(false);
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
              {productNotifications?.length ?
                <h1
                title="auth"
                className="z-20 absolute -top-5  left-4 
                bg-red-600 p-2 py-1 rounded-full text-white font-black  text-xl"
              >
                {productNotifications?.length || ''}
              </h1> : null}
              <ProductionQuantityLimitsOutlined
                sx={{
                  opacity: .7,
                  boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.04)'
                }}
                className="absolute top-0 bottom-0 right-0 
              left-0 w-full h-full scale-150
              text-black dark:text-white " />

          </div> */}

        </div>
        : null
      }

    </div>
  );
};

export default TopBar;
