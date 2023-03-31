import React, { useState, useMemo, useEffect } from "react";
import {
  // TableContainer,
  // Table,
  // TableRow,
  // TableBody,
  // TableCell,
  // Paper,
  // TableHead,
  // IconButton,
  // TextField,
  // CircularProgress,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
// import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box } from "@mui/system";
// import { EditSharp } from "@mui/icons-material";
// import { AiFillDelete } from 'react-icons/ai';

import { queryInstance, fetchUsers } from "../../api";
import RolesSelect from "./Inputs/RolesSelect";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import ConfirmDelete from "../Modal/ConfirmDelete";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const UsersTable = ({ users, setusers, UserData, setUserData, setopenAdd, collapseRef }) => {
  const queryClient = new QueryClient();

  const [UserToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setuserToDelete] = useState(null);
  const [openDelete, setopenDelete] = useState(false);
  const [userErrors, setuserErrors] = useState(null);
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
      // editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      field: "lastName",
      headerName: "LastName",
      minWidth: 110,
      // editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      field: "username",
      headerName: "Username",
      minWidth: 110,
      // editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      type: "string",
      field: "roles",
      headerName: "Roles",
      width: 120,
      // editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      type: "boolean",
      field: "active",
      headerName: "status",
      minWidth: 110,
      // editable: true,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      type: "actions",
      headerName: "Actions",
      field: "actions",
      width:130,
      getActions: (params) => [
        <GridActionsCellItem sx={{p:1, py:'4px', borderRadius:0, color:'#1a75ff', boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
          onClick={(e) => { handleInitialiseEdit(params?.row)}}
          icon={<span>Edit</span>}
          label="Edit"
        ></GridActionsCellItem>,
        <GridActionsCellItem sx={{p:1,py:'4px', borderRadius:0, color:'#ff1a1a', boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
          onClick={(e) => handleStartDelete(params?.row)}
          icon={<span>Delete</span>}
          label="Delete"
        ></GridActionsCellItem>,
      ],
    },
  ];
  const UserFetch = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
  const handleStartDelete = (user) => {
    setopenDelete(true)
   
    setuserToDelete(user)
  }
  const handleInitialiseEdit = (user) => {
    window.scrollTo({top:collapseRef?.current?.offSetTop, behavior:'smooth'})

    setUserData({...user, password: "", confirmNewPassword: ""})
    // setopenEdit(true);
    setopenAdd(true)
    // setUserToEdit({ ...user, password: "", confirmNewPassword: "" });
  };
  // const handleCloseEdit = () => {
  //   setopenEdit(false);
  //   setUserToEdit(null);
  //   setstatusMessage({
  //     ...statusMessage,
  //     deleteSuccess: "",
  //     updateSuccess: "",
  //   });
  //   seterrorMessages({ ...errorMessages, deleteError: "", updateError: "" });
  // };

  const handleDeleteUser = async () => {
    setEditStatus({ ...EditStatus, deleting: true });

    const id = userToDelete?._id;
    await queryInstance
      .delete(`/users/${id}`)
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
  const validate = (values) => {
    const errors = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmNewPassword: "",
    };
    if (!values?.username) {
      errors.username = "Username is required";
    }
    if (!values?.firstName) {
      errors.firstName = "FirstName is required";
    }
    if (!values?.lastName) {
      errors.lastName = "LastName is required";
    }
    if (!values?.roles?.length) {
      errors.roles = "Roles is required";
    }
    if (values?.password?.trim()?.length > 0) {
      if (values?.password !== values?.confirmNewPassword) {
        if (values?.password !== values?.confirmNewPassword) {
          errors.confirmNewPassword = "Password must match";
        }
      }
    }
    return errors;
  };
  const handleUpdateuser = async () => {
    const id = UserData?._id;
    // console.log(UserData);
    const errors = validate(UserData);
    setuserErrors(errors);
    console.log(errors);

    if (Object.values(errors).every((val) => val !== "")) return;

    setEditStatus({ ...EditStatus, updating: true });
    await queryInstance
      .put(`/users/${id}`, UserData)
      .then((res) => {
        if (res.status === 200) {
          setstatusMessage({
            ...statusMessage,
            updateSuccess: res?.data?.message,
          });
          queryClient.invalidateQueries({ queryKey: ["users"] });

        } if(res?.response.status === 500) {
          seterrorMessages({
            ...errorMessages,
            updateError: "internal server error",
          }); return;
        }
        if(res?.response.status === 400) {
          seterrorMessages({
            ...errorMessages,
            updateError: res?.response?.data?.message,
          }); return;
        }else {
          seterrorMessages({
            ...errorMessages,
            updateError: res?.response?.data?.message,
          });
        }
        // console.log(res);
      })
      .catch((err) => {
        // alert(err?.response?.data?.message)
        seterrorMessages({
          ...errorMessages,
          updateError: err?.response?.data?.message,
        });
        console.log(err?.response?.data?.message);
        console.log(err);
      })
      .finally(async () => {
        setEditStatus({ ...EditStatus, updating: false });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      });
  };


  return (
    <div className="w-auto h-auto md:mt-6 mt-3">
      {UserFetch?.isLoading ? (
        <Box>
          <h3 className="p-2 text-lg">Loading....</h3>
        </Box>
      ) : (
        <Box height={"800px"}>
          <DataGrid
            loading={UserFetch?.isLoading}
            columns={userColumns}
            rows={UserFetch?.data?.users}
            getRowId={(param) => param?._id}
            onRowEditStart={() => {
              console.log("Edit start");
            }}
            onRowEditStop={(param) => {
              console.log(param);
            }}
            localeText={{
              toolbarDensity: "Size",
              toolbarDensityLabel: "Size",
              toolbarDensityCompact: "Small",
              toolbarDensityStandard: "Medium",
              toolbarDensityComfortable: "Large",
              toolbarFiltersTooltipActive: 2,
            }}
            sx={{
              maxWidth: "750px",
              p: 2,
              ml: {xl:2,lg:2,md:1, sm:'0', xs:'0' },mr:'auto',
              boxShadow:
                "0px 0px 7px 0px rgba(0,0,0,0.1), 0px 0px 7px 0px rgba(0,0,0,0.09)",
              [`& .${gridClasses.columnHeader}`]: {
                fontSize: "1rem",
                fontWeight: "700",
                color: "#3339",
              },
            }}
          />
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
        </Box>
      )}
      {/* {isAdmin || isManager ? (
        <Dialog
          open={openEdit}
          fullWidth
          TransitionComponent={Transition}
          sx={{ p: 3, width: "auto", height: "auto" }}
        >
          <DialogTitle
            sx={{
              p: 2,
              fontWeight: "bold",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.6)",
            }}
          >
            Edit User{" "}
            <span className="text-red-600">
              {" " + UserData?.firstName + " " + UserToEdit?.lastName}
            </span>
          </DialogTitle>
          <Box
            px={2}
            my={2}
            sx={{
              boxShadow:
                statusMessage?.deleteSuccess || statusMessage?.updateSuccess
                  ? "0px 0px 2px 0px rgba(0,0,0,0.4)"
                  : "",
            }}
          >
            {statusMessage?.deleteSuccess?.length ? (
              <Typography className="text-red-700 text-sm" color={"red"}>
                {statusMessage?.deleteSuccess}
              </Typography>
            ) : statusMessage?.updateSuccess?.length ? (
              <Typography className="text-green-700 text-sm" color={"green"}>
                {statusMessage?.updateSuccess}
              </Typography>
            ) : null}
          </Box>
          {(errorMessages?.deleteError || errorMessages?.updateError) && (
            <Box
              px={2}
              my={2}
              sx={{ boxShadow: "0px 0px 2px 0px rgba(20,0,0,0.4)" }}
            >
              {errorMessages?.deleteError?.length ? (
                <Typography className="text-red-400 text-sm">
                  {errorMessages?.deleteError}
                </Typography>
              ) : errorMessages?.updateError?.length ? (
                <Typography className="text-red-400 text-sm">
                  {errorMessages?.updateError}
                </Typography>
              ) : null}
            </Box>
          )}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xl: "1fr 1fr",
                lg: "1fr 1fr",
                md: "1fr 1fr",
                sm: "1fr 1fr",
                xs: "1fr",
                rowGap: "6px",
                my: 1,
              },
            }}
          >
            <Box width="auto" px={2}>
              <label className="font-semibold text-lg" htmlFor="FirstName">
                FirstName
              </label>
              <input
                className="px-2 py-4 w-full border-black border-2 rounded-md"
                type={"text"}
                value={UserToEdit?.firstName}
                id="FirstName"
                name="firstName"
                placeholder="firstName"
                onChange={handleInputChange}
              />
              {userErrors?.firstName && (
                <span className="text-red-600">{userErrors?.firstName}</span>
              )}
            </Box>
            <Box width="auto" px={2}>
              <label className="font-semibold text-lg" htmlFor="LastName">
                LastName
              </label>
              <input
                className="px-2 py-4 w-full border-black border-2 rounded-md"
                type={"text"}
                value={UserToEdit?.lastName}
                id="LastName"
                name="lastName"
                placeholder="lastName"
                onChange={handleInputChange}
              />
              {userErrors?.lastName && (
                <span className="text-red-600">{userErrors?.lastName}</span>
              )}
            </Box>
            <Box width="auto" px={2}>
              <label className="font-semibold text-lg" htmlFor="Username">
                Username
              </label>
              <input
                className="px-2 py-4 w-full border-black border-2 rounded-md"
                type={"text"}
                value={UserToEdit?.username}
                id="Username"
                name="username"
                placeholder="username"
                onChange={handleInputChange}
              />
              {userErrors?.username && (
                <span className="text-red-600">{userErrors?.username}</span>
              )}
            </Box>
            <Box width="auto" px={2}>
              <RolesSelect user={UserToEdit} setuser={setUserToEdit} />
              {userErrors?.roles && (
                <span className="text-red-600">{userErrors?.roles}</span>
              )}
            </Box>

            <Box width="auto" px={2}>
              <label className="font-semibold text-lg" htmlFor="password">
                New password
              </label>
              <input
                className="px-2 py-4 w-full border-black border-2 rounded-md"
                type={"password"}
                value={UserToEdit?.password}
                id="password"
                name="password"
                placeholder="New password"
                onChange={handleInputChange}
              />
              {userErrors?.password && (
                <span className="text-red-600">{userErrors?.password}</span>
              )}
            </Box>
            <Box width="auto" px={2}>
              <label className="font-semibold text-lg" htmlFor="confirmPass">
                ConfirmPassword
              </label>
              <input
                className="px-2 py-4 w-full border-black border-2 rounded-md"
                type={"password"}
                value={UserToEdit?.confirmNewPassword}
                name="confirmNewPassword"
                id="confirmPass"
                placeholder="confirm new password"
                onChange={handleInputChange}
              />
              {userErrors?.confirmNewPassword && (
                <span className="text-red-600">
                  {userErrors?.confirmNewPassword}
                </span>
              )}
            </Box>
            <Box width="auto" px={3}>
              <label
                htmlFor="active"
                className="block font-semibold text-base pb-1 mt-2"
              >
                Active
              </label>
              <input
                type={"checkbox"}
                id="active"
                defaultChecked={UserToEdit?.active}
                name="acitve"
                onChange={(e) =>
                  setUserToEdit({
                    ...UserToEdit,
                    active: Boolean(e.target.checked),
                  })
                }
                className={`text-red-700 fifty-percent-radius ${
                  UserToEdit?.active ? "bg-green-800" : "bg-red-800"
                } 
                        p-1 pl-0 h-10 w-10 rounded-3xl checked:bg-green-400  `}
              />
            </Box>
          </Box>

          <DialogActions
            sx={{ boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.4)", bottom: "0" }}
          >
            <Stack direction={"row"} spacing={3}>
              <Button
                size="medium"
                variant="outlined"
                color={`info`}
                disabled={EditStatus?.deleting || EditStatus?.updating}
                sx={{ mr: 2, fontSize: { md: "11px", sm: "7px", xs: "7px" } }}
                onClick={handleCloseEdit}
              >
                Close
              </Button>
              <Button
                size="medium"
                variant="contained"
                color={`success`}
                sx={{ mr: 2, fontSize: { md: "11px", sm: "7px", xs: "7px" } }}
                onClick={handleUpdateuser}
              >
                {EditStatus?.updating ? "Updating..." : "Edit"}
              </Button>
              </Stack>
          </DialogActions>
        </Dialog>
      ) : null} */}
    </div>
  );
};

export default UsersTable;
