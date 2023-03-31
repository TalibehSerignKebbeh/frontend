import { Button } from "@mui/material";
import { format, parseISO } from "date-fns";
import React from "react";

const NotificationPanel = ({ dataArray, model, open, socket }) => {
  const handleClickAuthNotification = () => {
    socket.emit("read_all_auth_notification");
    };
    const handleReadSaleNotification = () => {
    socket.emit("read_all_sale_notification");
    }
  return (
    <div className='notification-wrapper'
      style={{
        visibility: open ? "visible" : "hidden",
      }}
    >
      {model === "auth" &&  (
        <div className="w-full">
          <table className="py-2 relative w-full">
            <thead className=" bg-white shadow-md py-2">
              <tr>
                <th className="text-sm font-normal">Action</th>
                <th className="text-sm font-normal">Message</th>
                <th className="text-sm font-normal">DateTime</th>
                <th className="text-sm font-normal">User</th>
              </tr>
            </thead>
            <tbody>
              {dataArray?.map((val, index) => (
                <tr className="text-xs" key={index}>
                  <td className="capitalize">{val?.action}</td>
                  <td className="capitalize">{val?.message}</td>
                  <td className="text-xs">
                    {format(parseISO(val?.created_at), " EEE MM yyyy, HH:mm b")}
                  </td>
                  <td className="capitalize">
                    {val?.data?.user
                      ? val?.data?.user?.firstName +
                        " " +
                        val?.data?.user?.lastName
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={handleClickAuthNotification}>
            Mark All As read
          </Button>
        </div>
      )}
      {model === "sale" (
        <div>
          <table className="py-2 relative w-full">
            <thead className=" bg-white shadow-md py-2">
              <tr>
                <th className="text-sm font-normal">Product</th>
                <th className="text-sm font-normal">#Qty</th>
                <th className="text-sm font-normal">Type</th>
                <th className="text-sm font-normal">Message</th>
                <th className="text-sm font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {dataArray?.map((sale, index) => (
                <tr key={index} className="py-1">
                  <td className="capitalize text-xs">{sale?.product}</td>
                  <td className="capitalize text-xs">{sale?.data?.quantity}</td>
                  <td className="capitalize text-xs">{sale?.type}</td>
                  <td className="capitalize text-xs">{sale?.message}</td>
                  <td className="capitalize text-xs" >
                    {format(
                      parseISO(sale?.created_at),
                      " EEE MM yyyy, HH:mm b"
                    )}
                  </td>
                </tr>
              ))}
                      </tbody>
                      <tfoot className="w-full text-center">
                         
                      </tfoot>
                  </table>
                   <Button sx={{fontSize:'.7rem'}} onClick={handleReadSaleNotification}>
                              Mark all as read
                          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
