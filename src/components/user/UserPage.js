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
import { GetError } from "../other/OtherFuctions";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import { initialUser } from "./Data";


const UserPage = ({ socket,setactiveNavLink }) => {
  const {token } = useAuth();
  const collapseRef = useRef(null)
  const [errorMessage, seterrorMessage] = useState('');
  const [openAdd, setopenAdd] = useState(false);
  const [page, setpage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, settotalPages] = useState(0);
  const [UserData, setUserData] = useState({
    _id:'', firstName: "", lastName: "", username: "",
    password: "", confirmPassword: "", roles: [], active: false
  });
  
  const UserFetch = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => fetchUsers({ token, page, pageSize }),
    // suspense: true, 
    getNextPageParam: () => { },
    getPreviousPageParam: () => {
      
    },
    
  
  });



  const handleCloseCollapse = () => {
    if (openAdd) {
      window.scrollTo({top:collapseRef?.current?.offSetTop, behavior:'smooth'})
    }
    setopenAdd(prev=>!prev);
    setUserData({...initialUser});
  };

  
  useEffect(() => {
   setactiveNavLink('users')
    if (UserFetch.isSuccess) {
      console.log(UserFetch.data);
      setpage(Number(UserFetch?.data?.page))
      setPageSize(Number(UserFetch?.data?.pageSize))
      settotalPages(Number(UserFetch?.data?.total))
    }
    
  }, [UserFetch?.isError, UserFetch?.data, UserFetch.isSuccess])
  useEffect(() => {
     if (UserFetch?.isError) {
      seterrorMessage(GetError(UserFetch?.error))
    }

  }, [UserFetch?.error, UserFetch?.isError]);
  return (
    <Box
      sx={{ mx: {lg:3, md:2, sm:'3px', xs:'0px', py:2} }}
      className="w-full h-full ">
     
           {errorMessage?.length?
          (<>
          <ErrorMessage error={errorMessage}
              handleReset={() => { seterrorMessage('') }} />
          </>
            ) : null}
        <>
            <Box
              mt={2}
              sx={{
                zIndex: 2,textAlign:'start',
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
            <Collapse ref={collapseRef} 
              in={openAdd} timeout="auto" unmountOnExit>
                  <UserForm socket={socket}
                    UserData={UserData} setUserData={setUserData}
                    resetFunction={() => {
                      setopenAdd(false)
                      setUserData(initialUser)
                    }}
                  />
              </Collapse>
              
            </Box>

        <UsersTable loading={UserFetch.isLoading}
          page={page} setpage={setpage}
                pageSize={pageSize} setPageSize={setPageSize}
                totalPages={Number(UserFetch?.data?.total)}
                users={UserFetch?.data?.users || []} 
                UserData={UserData} setUserData={setUserData}
                setopenAdd={setopenAdd}
                collapseRef={collapseRef}
        />
        
        </>
         </Box>
  );
};

export default UserPage;
