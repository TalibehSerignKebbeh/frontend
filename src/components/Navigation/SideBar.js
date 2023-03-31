import React from "react";
import './sidebar.css'
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
  ReportOutlined,
} from "@mui/icons-material";
import {  AiOutlineUserSwitch } from "react-icons/ai";
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
        socket.emit("notify_logout", { username, date:new Date() });
        console.log(res);
        navigate("/");
      });
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
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
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
        <Link
          to="/dashboard"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button
            className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg  "
          >
            &#9776;
          </button>
          <Typography  className="ml-3">
            Dashboard
          </Typography>
        </Link>
        <Link
          to="/sales"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            <PointOfSaleSharp />
          </button>
          <Typography  className="md:text-2xl text-lg">Sales</Typography>
        </Link>
        <Link
          to="/stocks"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            <ProductionQuantityLimits />
          </button>
          <Typography  className="md:text-2xl text-lg">Stock</Typography>
        </Link>

        <Link
          to="/products"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            <Inventory2Outlined />
          </button>
          <Typography  className="md:text-2xl text-lg">Products</Typography>
        </Link>

        <Link
          to="/users"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            <AiOutlineUserSwitch />
          </button>
          <Typography  className="md:text-2xl text-lg">Users</Typography>
          </Link>
          <Link
          to="/report"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            <ReportOutlined />
          </button>
          <Typography  className="md:text-2xl text-lg">Report</Typography>
        </Link>
        {/* <Link
          to="/profile"
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            <AiOutlineProfile />
          </button>
          <Typography >Profile</Typography>
        </Link> */}
        {/* <Link to='/products/add' className={`${showSideMenu ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                         <AddCircleOutlineRounded />
                    </button>
               <Typography>AddStock</Typography>
                </Link> */}
      </div>
      <div className="w-auto mx-auto lg:mt-10 md:5 mt-2">
        <IconButton onClick={handleLogout}>
          {isLoading ? (
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
