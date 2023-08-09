import React, {  } from "react";
import './sidebar.css'
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import ProductionQuantityLimits from '@mui/icons-material/ProductionQuantityLimits'
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined'
import PointOfSaleSharp from '@mui/icons-material/PointOfSaleSharp'
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import {
  AiOutlineUserSwitch, AiFillNotification,
  AiOutlineMenu
} from "react-icons/ai";
import Box from "@mui/system/Box";
import CustomLink from "./Links/CustomLink";
import DarkModeToggle from "../../hooks/DarkModeToggler";
import LogoutSection from "./LogoutSection";



const SideBar = ({ socket, showSideMenu, setshowSideMenu, activeNavLink, }) => {

  const { token, username, isAdmin } = useAuth();
 
  

  const handleNavToggle = (e) => {
    setshowSideMenu((prev) => !prev);
  };
  
  if (!token) return null;
  return (
    <Box
      height={'100vh'}
      className={`bg-gray-50 dark:bg-slate-700
      text-gray-700 dark:text-slate-50 overflow-x-hidden
      overflow-y-auto
      ${showSideMenu
          ? "sidebar-main-active "
          : " sidebar-main "
        }  
        bg-white  flex flex-col overflow-y-auto 
        clear-both mt-0 text-start
             transition-all fixed z-10
             pb-8`}
    >
      <Button
        onClick={handleNavToggle}
        disableTouchRipple={true}
        disableFocusRipple
        sx={{
          fontSize: "1.7rem",
          ml: "3px", mt: '2px', position: 'fixed', p: '2px',
          flexShrink: 0, flexGrow: 0, bgcolor: '#002db3',
          width: '30px', height: '30px',
          overflow:'hidden',
          ':hover': {
            bgcolor:'#002db3'
          }, display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr', alignItems: 'center',
          justifyItems:'center'
        }}
        className={`
         text-gray-800 dark:text-white 
         z-50 menu-toggle-btn 
            ${showSideMenu ? "ml-auto" : " -m-1 ml-1"} 
             ml-auto -mr-8 text-2xl pointer p-0 
                   `}
      >
        <AiOutlineMenu className="text-center mx-auto"/>
        
      </Button>
      <Box sx={{
        mt: 4, textAlign: 'center',
        mb:4
      }}>

        <Box className="md:py-3 my-2" sx={{ textAlign: "center" }}>
          <Tooltip title="Username">
            <Typography
              sx={{
                display: showSideMenu ? "inline" : "none",
                fontSize: { xl: ".8rem", lg: ".8rem", md: ".8rem", sm: ".65rem", xs: ".6rem" },
                margin: "auto", ml: 1, fontWeight: '500',
                padding: 1,
                marginY: 1, textTransform: 'capitalize',
                boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)",
                cursor: 'pointer', borderRadius: '3px'
              }}
              className="bg-slate-100 dark:bg-slate-400 "
            >
              {username}
            </Typography>
          </Tooltip>
        </Box>
        <div
          className={`"w-full h-full flex flex-col  relative
                         content-center items-start md:gap-y-3 gap-y-2 `}
        >
 {(isAdmin) ?

            <CustomLink href={'/dashboard'}
              icon={<DashboardOutlined />}
              title={"dashboard"}
              showSideMenu={showSideMenu}
            />
            : null}
          <span className="text-lg font-normal font-sans
           pl-7 mt-2">Sales</span>
          <CustomLink href={'/sales'}
            icon={<PointOfSaleSharp />}
            title={"sales"}
            showSideMenu={showSideMenu}
          />
          <CustomLink href={'/sales/cancelled'}
            icon={<CancelOutlined />}
            title={"cancelled"}
            showSideMenu={showSideMenu}
          />
          <span
            className="text-lg font-normal font-sans
           pl-7 mt-2">Product</span>

          <CustomLink href={'/products'}
            icon={<Inventory2Outlined />}
            title={"products"}
            showSideMenu={showSideMenu}
          />
          <CustomLink href={'/products/expired'}
            icon={<Inventory2Outlined />}
            title={"Expired"}
            showSideMenu={showSideMenu}
          />

          {(isAdmin) ?
            <br /> : null}
          {(isAdmin) ?
            <CustomLink href={'/users'}
              icon={<AiOutlineUserSwitch />}
              title={"users"}
              showSideMenu={showSideMenu}
            /> : null}
          {(isAdmin) ?

            <CustomLink href={'/categories'}
              icon={<ProductionQuantityLimits />}
              title={"categories"}
              showSideMenu={showSideMenu}
            />
            : null}
         

          {(isAdmin) ?
            <CustomLink href={'/events'}
              icon={<AiFillNotification />}
              title={"events"}
              showSideMenu={showSideMenu}
            /> : null}
        </div>
        <div className="mr-2 my-5 mt-8 text-center 
         w-full h-auto flex justify-center items-center
        ">
          <DarkModeToggle />
        </div>
        
        <LogoutSection socket={socket} />
      </Box>

    </Box>
  );
};

export default SideBar;
