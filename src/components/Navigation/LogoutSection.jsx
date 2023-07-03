import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import LogoutTwoTone from '@mui/icons-material/LogoutTwoTone'
import { queryInstance } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useContextHook } from '../../context/AuthContext'
import { message } from "antd";
import useAuth from '../../hooks/useAuth'

export default function LogoutSection({socket}) {
   const navigate = useNavigate()
   const {username} = useAuth()
  const { clearAuthToken } = useContextHook()
  const [isLogingOut, setisLogingOut] = useState(false);
const handleLogout = async () => {
    setisLogingOut(true)
    await queryInstance.post(`/auth/logout`)
      .then((res) => {
        // console.log(username);
        socket.emit("notify_logout", { username, date: new Date() });
        // console.log(res);
        clearAuthToken()

        navigate("/");
      }).catch(() => {
        message.error({
          className: 'p-0 m-0',
          content: <div className=" ">
            <h3>Opps something went wrong</h3>
            <p> Sorry, Logout request  failed</p>
          </div>,
          duration: 2,
        });
      }).finally(() => setisLogingOut(false))

  };  
  return (
   <div className="w-auto mx-auto lg:mt-10 lg:mb-5 md:my-5 my-2
      ">
          <Tooltip title="logout">

            <IconButton className="text-gray-900 dark:text-white
          bg-zinc-300 dark:bg-gray-500 
          dark:hover:bg-gray-500"
              onClick={handleLogout}>
              {isLogingOut ? (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              ) : (
                <LogoutTwoTone sx={{ fontSize: "2.4rem" }} />
              )}
            </IconButton>
          </Tooltip>

        </div>
  )
}
