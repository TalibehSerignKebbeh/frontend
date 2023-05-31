import React, { useState} from "react";
// import  Box  from "@mui/system/Box";
import { queryInstance } from "../../api";
import {  QueryClient, } from "@tanstack/react-query";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import  TablePagination  from "@mui/material/TablePagination";

import ConfirmDelete from "../Modal/ConfirmDelete";
import useAuth from "../../hooks/useAuth";
import { allowedRoles } from "../../config/allowedRoles";

const UsersTable = ({loading,totalPages,
  users, page, setpage, pageSize, setPageSize,
  setusers, UserData, setUserData, setopenAdd, collapseRef }) => {
  const queryClient = new QueryClient();
  const {token,roles} = useAuth()
  const [userToDelete, setuserToDelete] = useState(null);
  const [openDelete, setopenDelete] = useState(false);
  const [EditStatus, setEditStatus] = useState({
    deleting: false,
    updating: false,
  });
  const [statusMessage, setstatusMessage] = useState({
    deleteSuccess: "",
    updateSuccess: "",
  });
  const [errorMessages, seterrorMessages] = useState({
    deleteError: "",
    updateError: "",
  });

  const userColumns = [
    {
      field: "firstName",
      headerName: "FirstName",
      minWidth: 110,
      editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      field: "lastName",
      headerName: "LastName",
      minWidth: 110,
      editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      field: "username",
      headerName: "Username",
      minWidth: 110,
      editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      type: "string",
      field: "roles",
      headerName: "Roles",
      valueOptions:['admin', 'manager', 'seller'],
      width: 120,
      editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      type: "boolean",
      field: "active",
      headerName: "status",
      minWidth: 110,
      editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      type: "actions",
      headerName: "Actions",
      field: "actions",
      width:130,
      getActions: (params) => [
        <GridActionsCellItem className="bg-white dark:bg-slate-400"
        sx={{
          p: 1, py: '4px', borderRadius: 0, color: '#1a75ff',
          boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.6)'
        }}
          onClick={(e) => { handleInitialiseEdit(params?.row)}}
          icon={<span>Edit</span>}
          label="Edit"
        ></GridActionsCellItem>,
        <GridActionsCellItem className="bg-white dark:bg-slate-400"
        sx={{p:1,py:'4px', borderRadius:0, color:'#ff1a1a', boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
          onClick={(e) => handleStartDelete(params?.row)}
          icon={<span>Delete</span>}
          label="Delete"
        ></GridActionsCellItem>,
      ],
    },
  ];

  const handleStartDelete = (user) => {
    if (!roles?.includes(allowedRoles.admin) && !roles?.includes(allowedRoles.manager)) {
      return;
    }
    setopenDelete(true)
   
    setuserToDelete(user)
  }
  const handleInitialiseEdit = (user) => {
    window.scrollTo({top:collapseRef?.current?.offSetTop, behavior:'smooth'})
  //  setUserData(initialUser)
    setUserData({...UserData, ...user, password: "", confirmNewPassword: ""})
    // setopenEdit(true);
    setopenAdd(true)
    // setUserToEdit({ ...user, password: "", confirmNewPassword: "" });
  };


  const handleDeleteUser = async () => {
    setEditStatus({ ...EditStatus, deleting: true });

    const id = userToDelete?._id;
    await queryInstance
      .delete(`/users/${id}`,{headers:{Authorization:`Bearer ${token}`}})
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setstatusMessage({
            ...statusMessage,
            deleteSuccess: res?.data?.message,
          });
          queryClient.invalidateQueries({ queryKey: ["users"] });
          return;
        } else if (res.status === 500) {
          seterrorMessages({
            ...errorMessages,
            deleteError: "internal server error",
          });
        } else {
          seterrorMessages({
            ...errorMessages,
            deleteError: res?.response?.data?.message,
          });
        }
      })
      .catch((err) => {
        // alert(err?.response?.data?.message)
        console.log(err?.response?.data?.message);
        console.log(err);
        seterrorMessages({
          ...errorMessages,
          deleteError: err?.response?.data?.message,
        });
      })
      .finally(async () => {
        setEditStatus({ ...EditStatus, deleting: false });
      });
  };

  return (
    <div className="w-full h-auto md:my-6 my-3
    overflow-x-scroll ">

        {/* <Box className={ `w-fit overflow-x-scroll`} height={"500px"}> */}
      <DataGrid
        autoHeight loading={loading}
          className="text-gray-700 dark:text-slate-100
          bg-slate-50 dark:bg-slate-700"
            // loading={}
          columns={[
            ...userColumns,
        ]}
        rowCount={totalPages}
     
        pageSizeOptions={[5,10, 15, 25, 30]}
        paginationMode="server"
        paginationModel={{ page: page, pageSize: pageSize }}
        
        onPaginationModelChange={({page, pageSize}) => {
          setpage(page)
          setPageSize(pageSize)
        }}
        classes={{'booleanCell':'text-black dark:text-white'}}
        // hideFooter
              rows={users}
            getRowId={(param) => param?._id}

            localeText={{
              toolbarDensity: "Size",
              toolbarDensityLabel: "Size",
              toolbarDensityCompact: "Small",
              toolbarDensityStandard: "Medium",
              toolbarDensityComfortable: "Large",
              toolbarFiltersTooltipActive: 2,
            }}
            sx={{
              // maxWidth: "800px",
              // minWidth:'500px',
              // width:'100%',
          width: { xl: "70%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },

              p: 2,
          // width: { xl: "700px", lg: "700px", md: "100%", sm: "100%", xs: "100%" },

              ml: {xl:2,lg:2,md:1, sm:'0', xs:'0' },mr:'auto',
              boxShadow:
                "0px 0px 7px 0px rgba(0,0,0,0.1), 0px 0px 7px 0px rgba(0,0,0,0.09)",
              [`& .${gridClasses.columnHeader}`]: {
                fontSize: "1rem",
                fontWeight: "300",
                // color: "#3339",
              },
            }}
      />
      {/* <TablePagination
        count={totalPages}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5,10, 15, 25, 50, 100]}
        onRowsPerPageChange={({ target: { value } }) => {
          setPageSize(value)
        }}
        page={page}
        onPageChange={({ event, page }) => {
          console.log(page)
         setpage(page)
        }} 
         className="bg-slate-100 dark:bg-slate-700
      text-slate-800 dark:text-white" 
      /> */}
        
          <ConfirmDelete
            open={openDelete}
            setopen={setopenDelete}
              resetFunc={() => {
                setuserToDelete(null)
                setstatusMessage({...statusMessage, deleteSuccess: '' })
                seterrorMessages({...errorMessages, deleteError:''})
              }}
            message={userToDelete?.username}
              deleteFunction={handleDeleteUser}
              deleteLoading={EditStatus?.deleting}
              errorMessage={errorMessages?.deleteError}
              succcessMsg={statusMessage?.deleteSuccess}
          />
      
    </div>
  );
};

export default UsersTable;
