import React, {useState} from "react";
import './sidebar.css'
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ProductionQuantityLimits from '@mui/icons-material/ProductionQuantityLimits'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import PointOfSaleSharp from '@mui/icons-material/PointOfSaleSharp'
import LogoutTwoTone from '@mui/icons-material/LogoutTwoTone'
import MenuOutlined from '@mui/icons-material/MenuOutlined'
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import ReportOffOutlined from '@mui/icons-material/ReportOffOutlined'

import {  AiOutlineUserSwitch, AiFillNotification } from "react-icons/ai";
import Box from "@mui/system/Box";
import { queryInstance } from "../../api";
import {useContextHook} from '../../context/AuthContext'
import CustomLink from "./Links/CustomLink";

const SideBar = ({ socket,showSideMenu, setshowSideMenu  }) => {
  const navigate = useNavigate();
  const {clearAuthToken} = useContextHook()
  const [isLogingOut, setisLogingOut] = useState(false);
  // &#9776;
  const { token, username, isAdmin, isManager } = useAuth();

  const handleNavToggle = (e) => {
    setshowSideMenu((prev) => !prev);
  };
  const handleLogout = async () => {
    setisLogingOut(true)
    await queryInstance.post(`/auth/logout`)
      .then((res) => {
        // console.log(username);
        socket.emit("notify_logout", { username, date:new Date() });
        // console.log(res);
        clearAuthToken()
    setisLogingOut(false)
        navigate("/");
      }).catch(() => {
        
      })
      
  };
  if (!token) return null;
  return (
    <Box
      height={'100vh'}
      className={`${
        showSideMenu
          ? "sidebar-main-active "
          : " sidebar-main "
      }  bg-white  flex flex-col overflow-y-scrol clear-both mt-0 text-start
             transition-all fixed z-10 `}
    >
      <Button
        onClick={handleNavToggle}
        disableTouchRipple
        disableFocusRipple
        sx={{ fontSize: "1.2rem", ml: "auto", color: "black", position:'fixed' }}
        className={`menu-toggle-btn ${showSideMenu ? "ml-auto" : "md:ml-0 -m-1"} 
                   w-auto ml-auto zIndex-2 -mr-8 text-2xl pointer p-0 md:relative absolute `}
      >
        {/* &#9776; */}
        <MenuOutlined sx={{scale:1.1}}/>
      </Button>
      <Box sx={{
        position: 'absolute', mt: 4, textAlign: 'center',
             }}>

      <Box className="md:py-3 my-2" sx={{ textAlign: "center" }}>
        <Tooltip title="Username">
          <Typography
            sx={{
              display: showSideMenu ? "inline" : "none",
              fontSize: {xl:".8rem", lg:".8rem", md:".8rem", sm:".65rem", xs:".6rem"},
              margin: "auto",ml:1,fontWeight:'500',
              padding: 1,
              marginY: 1, textTransform:'capitalize',
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)",
                cursor: 'pointer', borderRadius:'3px'
            }}
          >
            {username}
          </Typography>
        </Tooltip>
      </Box>
      <div
        className={`"w-full flex flex-col 
                         content-center items-start md:gap-y-3 gap-y-2 `}
        >
          <CustomLink href={'/dashboard'} 
            icon={<DashboardOutlined />}
            title={"Dashboard"}
            showSideMenu={showSideMenu}
          />
           <CustomLink href={'/sales'} 
            icon={<PointOfSaleSharp />}
            title={"Sales"}
            showSideMenu={showSideMenu}
          />
           <CustomLink href={'/sales/add'} 
            icon={<PointOfSaleSharp />}
            title={"Add Sales"}
            showSideMenu={showSideMenu}
          />
          <CustomLink href={'/stocks'} 
            icon={<ProductionQuantityLimits />}
            title={"Stocks"}
            showSideMenu={showSideMenu}
          />
       <CustomLink href={'/products'} 
            icon={<Inventory2Outlined />}
            title={"Products"}
            showSideMenu={showSideMenu}
          />
          {(isAdmin || isManager) ?
            <CustomLink href={'/users'} 
            icon={<AiOutlineUserSwitch />}
            title={"users"}
            showSideMenu={showSideMenu}
          /> : null}
           {(isAdmin || isManager) ?
           <CustomLink href={'/report'} 
            icon={<ReportOffOutlined />}
            title={"report"}
            showSideMenu={showSideMenu}
            /> : null}
          {(isAdmin || isManager) ?
           <CustomLink href={'/events'} 
            icon={<AiFillNotification />}
            title={"events"}
            showSideMenu={showSideMenu}
          />: null}
          </div>
      <div className="w-auto mx-auto lg:mt-10 md:mt-5 mt-2">
        <IconButton onClick={handleLogout}>
          {isLogingOut ? (
            <CircularProgress sx={{ fontSize: "3rem" }} />
          ) : (
            <LogoutTwoTone sx={{ fontSize: "2.4rem" }} />
          )}
        </IconButton>
        </div>
      </Box>
        
    </Box>
  );
};

export default SideBar;
