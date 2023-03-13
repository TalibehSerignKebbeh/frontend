import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ProductionQuantityLimits,
  Inventory2Outlined,
  PointOfSaleSharp,
  LogoutTwoTone,
  MenuOutlined,
} from "@mui/icons-material";
import { AiOutlineProfile, AiOutlineUserSwitch } from "react-icons/ai";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import Box from "@mui/system/Box";
const SideBar = ({ socket,showSideMenu, setshowSideMenu  }) => {
  const navigate = useNavigate();
  // &#9776;
  const { token, username } = useAuth();
  const [logoutRequest, { isLoading }] = useSendLogoutMutation();

  const handleNavToggle = (e) => {
    setshowSideMenu((prev) => !prev);
  };
  const handleLogout = async () => {
    await logoutRequest()
      .unwrap()
      .then((res) => {
        socket.emit("notify_logout", { username });
        console.log(res);
        navigate("/");
        localStorage.removeItem("persist:root");
      });
  };
  if (!token) return null;
  return (
    <Box
      minHeight={"100vh"}
      className={` ${
        showSideMenu
          ? "sidebar-main-active flex flex-col overflow-y-scrol"
          : "w-0 sidebar-main  "
      }  bg-white  clear-both mt-0 text-start
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
        <MenuOutlined />
      </Button>
      <Box sx={{ position:'fixed', mt:4, textAlign:'center'}}>

      <Box sx={{ textAlign: "center", py: 3 }}>
        <Tooltip title="Username">
          <Typography
            sx={{
              display: showSideMenu ? "inline" : "none",
              fontSize: ".8rem",
              margin: "auto",
              padding: 1,
              marginY: 1, textTransform:'capitalize',
                          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
              cursor:'pointer',
            }}
          >
            {username}
          </Typography>
        </Tooltip>
      </Box>
      <div
        className={`${showSideMenu ? "w-full" : "w-0"} flex flex-col 
                         content-center items-start gap-y-3`}
      >
        <Link
          to="/dashboard"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
        >
          <button
            className="text-lg before:h-8 before:w-2 
                       before:bg-green-300 before:float-left before:-ml-6 before:rounded-md"
          >
            &#9776;
          </button>
          <Typography sx={{ fontSize: "1.2rem" }} className="ml-3">
            Dashboard
          </Typography>
        </Link>
        <Link
          to="/sales"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
        >
          <button className="text-lg">
            <PointOfSaleSharp />
          </button>
          <Typography sx={{ fontSize: "1.2rem" }}>Sales</Typography>
        </Link>
        <Link
          to="/stocks"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
        >
          <button className="text-lg">
            <ProductionQuantityLimits />
          </button>
          <Typography sx={{ fontSize: "1.2rem" }}>Stock</Typography>
        </Link>

        <Link
          to="/products"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
        >
          <button className="text-lg">
            <Inventory2Outlined />
          </button>
          <Typography sx={{ fontSize: "1.2rem" }}>Products</Typography>
        </Link>

        <Link
          to="/users"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
        >
          <button className="text-lg">
            <AiOutlineUserSwitch />
          </button>
          <Typography sx={{ fontSize: "1.2rem" }}>Users</Typography>
        </Link>
        <Link
          to="/profile"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
        >
          <button className="text-lg">
            <AiOutlineProfile />
          </button>
          <Typography sx={{ fontSize: "1.2rem" }}>Profile</Typography>
        </Link>
        {/* <Link to='/products/add' className={`${showSideMenu ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                         <AddCircleOutlineRounded />
                    </button>
               <Typography>AddStock</Typography>
                </Link> */}
      </div>
      <div className="w-auto mx-auto mt-10">
        <IconButton onClick={handleLogout}>
          {isLoading ? (
            <CircularProgress sx={{ fontSize: "3rem" }} />
          ) : (
            <LogoutTwoTone sx={{ fontSize: "3rem" }} />
          )}
        </IconButton>
        </div>
      </Box>
        
    </Box>
  );
};

export default SideBar;
