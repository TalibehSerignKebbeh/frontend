import { Button } from '@mui/material';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import './notification.css'

const SaleNotificationPanel = ({ dataArray, socket, open, setopen }) => {
  const ref = useRef(null)

   const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  const handleReadSaleNotification = () => {
       const ids =dataArray?.map(notify=>{return notify?._id})
    socket.emit("read_all_sale_notification", {ids});
    }

    useEffect(() => {
        window.addEventListener('mousedown', (e) => {
          if (ref?.current && !ref.current?.contains(e.target)) {
              setopen(false)
            }
        })
      
  }, [ref, setopen]);
    return (
        <div ref={ref} className='notification-wrapper'
        style={{
        visibility: open ? "visible" : "hidden",
        position: 'absolute',left:'auto',
             top: position.y, right:0,
        }}
        onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      >
            <div className='table-container'>
          <table className="py-2 relative w-full table-auto">
            <thead className=" bg-white shadow-md py-2">
              <tr>
                <th className="text-sm font-normal">Msg</th>
                <th className="text-sm font-normal">#Qty</th>
                <th className="text-sm font-normal">#Price</th>
                <th className="text-sm font-normal">Type</th>
                <th className="text-sm font-normal">User</th>
                <th className="text-sm font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {dataArray?.map((sale, index) => (
                <tr key={index} className="py-1">
                  <td className="capitalize text-xs">{sale?.message}</td>
                  <td className="capitalize text-xs">{sale?.data?.quantity}</td>
                  <td className="capitalize text-xs">{sale?.data?.quantity*sale?.data?.price}</td>
                  <td className="capitalize text-xs">{sale?.type}</td>
                  <td className="capitalize text-xs break-words">{sale?.userId?.username}</td>
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
