import { Button } from '@mui/material';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import './notification.css'

const AuthNotificationPanel = ({ dataArray, socket, open, setopen }) => {
  const ref = useRef(null)

  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [dragging, setDragging] = useState(false);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  // const containerRef = useRef(null);
 

  const handleClickAuthNotification = () => {
    const ids = dataArray?.map(notify => { return notify?._id })
    socket.emit("read_all_auth_notification", {ids});
    };

  useEffect(() => {
        window.addEventListener('mousedown', (e) => {
          if (ref?.current && !ref.current?.contains(e.target)) {
              setopen(false)
            }
        })
      
  }, [ref, setopen]);
  
  // useEffect(() => {
  //   const container = containerRef.current;
  //    const handleMouseDown = (e) => {
  //   setDragging(true);
  //   setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  // };

  // const handleMouseMove = (e) => {
  //   if (dragging) {
  //     setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  //   }
  // };

  // const handleMouseUp = () => {
  //   setDragging(false);
  // };
  //   if (container) {
  //     container.addEventListener('mousedown', handleMouseDown);
  //     container.addEventListener('mousemove', handleMouseMove);
  //     container.addEventListener('mouseup', handleMouseUp);
  //   }
  //   return () => {
  //     if (container) {
  //       container.removeEventListener('mousedown', handleMouseDown);
  //       container.removeEventListener('mousemove', handleMouseMove);
  //       container.removeEventListener('mouseup', handleMouseUp);
  //     }
  //   };
  // }, [containerRef, dragging, offset.x, offset.y, position.x, position.y]);
  
    return (
      <div ref={ref}
        className='notification-wrapper'
            style={{
        visibility: open ? "visible" : "hidden",
      position: 'absolute',left:'auto',
             top: position.y, right: position.x 
        }}
        
      
        >
            <div className="table-container w-full">
          <table className="py-2 relative w-full table-fixed">
            <thead className=" bg-white shadow-md py-4">
              <tr>
                {/* <th className="text-sm font-normal">Action</th> */}
                <th className="text-sm font-normal">Message</th>
                <th className="text-sm font-normal">DateTime</th>
                <th className="text-sm font-normal">Name</th>
              </tr>
            </thead>
            <tbody>
              {dataArray?.map((val, index) => (
                <tr className="text-xs" key={index}>
                  {/* <td className="capitalize">{val?.action}</td> */}
                  <td className="capitalize text-xs">{val?.message}</td>
                  <td className="text-xs">
                    {format(parseISO(val?.created_at), " EEE MM yyyy, HH:mm b")}
                  </td>
                  <td className="capitalize">
                    {val?.userId
                      ? val?.userId?.firstName +
                        " " +
                        val?.userId?.lastName
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
        </div>
    );
}

export default AuthNotificationPanel;
