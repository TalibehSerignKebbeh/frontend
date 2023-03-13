import { Button } from '@mui/material';
import { format, parseISO } from 'date-fns';
import React, { useEffect } from 'react';
import './notification.css'

const AuthNotificationPanel = ({ dataArray, socket, open, setopen }) => {
    const handleClickAuthNotification = () => {
    socket.emit("read_all_auth_notification");
    };

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                setopen(false)
            }
        })
      
    }, [setopen]);
  
    return (
        <div className='notification-wrapper'
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
         zIndex:20,
      }}
        >
            <div className="table-container w-full">
          <table className="py-2 relative w-full">
            <thead className=" bg-white shadow-md py-4">
              <tr>
                {/* <th className="text-sm font-normal">Action</th> */}
                <th className="text-sm font-normal">Message</th>
                <th className="text-sm font-normal">DateTime</th>
                <th className="text-sm font-normal">User</th>
              </tr>
            </thead>
            <tbody>
              {dataArray?.map((val, index) => (
                <tr className="text-xs" key={index}>
                  {/* <td className="capitalize">{val?.action}</td> */}
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
        </div>
    );
}

export default AuthNotificationPanel;
