import React, { useEffect, useRef, useState } from "react";
import UsersTable from "./UsersTable";
import { fetchUsers } from "../../api";
import   Collapse from "@mui/material/Collapse";
import   Button from "@mui/material/Button";

import  Add  from "@mui/icons-material/Add";
import  Box  from "@mui/system/Box";
import useAuth from "../../hooks/useAuth";
import {  useQuery } from "@tanstack/react-query";
// import { useFormik } from "formik";
// import { registerRoles } from "../../config/allowedRoles";
import UserForm from "./UserForm";

const initialUser = {
  _id:'',
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
  roles: [],
};

const UserPage = ({ socket }) => {
  const { isAdmin, isManager } = useAuth();
  const collapseRef = useRef()
  const [openAdd, setopenAdd] = useState(false);
  const [UserData, setUserData] = useState({
    _id:'', firstName: "", lastName: "", username: "",
  password: "", confirmPassword: "", roles: [],  });
  const UserFetch = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const handleCloseCollapse = () => {
    if (openAdd) {
      window.scrollTo({top:collapseRef?.current?.offSetTop, behavior:'smooth'})
    }
    setopenAdd(prev=>!prev);
    setUserData({...initialUser});
  };

  
  useEffect(() => {
    if (UserFetch?.data) {
      if (UserFetch?.data?.response?.status === 403) {
        console.log("Expired token and session");
      }
   
    }
  }, [UserFetch?.data])

  return (
    <Box sx={{ mb: 10, mx: 3, px: 1 }} className="w-full h-full ">
      {UserFetch?.isLoading ? (
        <div>
          <p>Loading ..... </p>
        </div>
      
      ) :
           UserFetch?.data?.response ?
          (<div>
            <p className="py-3 px-2 text-red-600 bg-slate-50">{UserFetch?.data?.response?.message}</p>
        </div>):
        (
        <>
          {isAdmin || isManager ? (
            <Box
              mt={2}
              sx={{
                // float: { xl: 'right', lg: 'right', md: 'right', sm: 'none', xs: 'none' },
                zIndex: 2,textAlign:'start',
                // ml: 'auto', mr: {lg:'40px', xl:'80px', md: '40px', sm: '20px', xs: "20px" },
                mb: { md: "0", sm: "10px", xs: "10px" },
              }}
              >
                <Button
                   sx={{ ml: {xl:2,lg:2,md:1, sm:'0', xs:'0' },mr:'auto',
                mb: openAdd ? 2 : 0,transition:`0.3s all ease`,
                boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.07),0px 3px 6px 2px rgba(0,0,0,0.07)',
                 color: 'black', bgcolor: '#fff',opacity:.8,px:3,py:'6px',
                ':hover': { bgcolor: '#fff', opacity: 1, } 
            }} color='success'
                endIcon={<Add />}
                variant="contained"
                onClick={handleCloseCollapse}
              >
                Add User
              </Button>
                <Collapse ref={collapseRef} in={openAdd} timeout="auto" unmountOnExit>
                  <UserForm socket={socket}
                    UserData={UserData} setUserData={setUserData}
                    resetFunction={() => {
                      setopenAdd(false)
                      setUserData(initialUser)
                    }}
                  />
              </Collapse>
              
            </Box>
          ) : null}

          {UserFetch?.data?.users?.length ? (
              <UsersTable users={UserFetch?.data?.users} 
                UserData={UserData} setUserData={setUserData}
                setopenAdd={setopenAdd}
                collapseRef={collapseRef}
            />
          ) : (
            <div className="p-3 ">
              <h3>No Users</h3>
            </div>
          )}
        </>
      )}
         </Box>
  );
};

export default UserPage;
