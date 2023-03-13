import { Button } from '@mui/material';
import { format, parseISO } from 'date-fns';
import React, { useEffect } from 'react';
import './notification.css'

const SaleNotificationPanel = ({ dataArray,socket, open,setopen }) => {
     const handleReadSaleNotification = () => {
    socket.emit("read_all_sale_notification");
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                setopen(false)
            }
        })
      
    }, [setopen]);
    return (
        <div
        style={{
        visibility: open ? "visible" : "hidden",
        width: "auto",
        height: "auto",
        padding: "30px 10px",
        position: "absolute",
        top: "20px",
        right: "6px",
        left: "auto",
        overflow: "scroll",
        backgroundColor: "#fff",
        boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.4)",
        maxHeight: "400px",
          minWidth: "350px",
          zIndex: 20,
      }}>
            <div className='table-container'>
          <table className="py-2 relative w-full">
            <thead className=" bg-white shadow-md py-2">
              <tr>
                <th className="text-sm font-normal">Msg</th>
                <th className="text-sm font-normal">#Qty</th>
                <th className="text-sm font-normal">Type</th>
                <th className="text-sm font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {dataArray?.map((sale, index) => (
                <tr key={index} className="py-1">
                  <td className="capitalize text-xs">{sale?.message}</td>
                  <td className="capitalize text-xs">{sale?.data?.quantity}</td>
                  <td className="capitalize text-xs">{sale?.type}</td>
                  {/* <td className="capitalize text-xs">{sale?.message}</td> */}
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
        </div>
    );
}

export default SaleNotificationPanel;
