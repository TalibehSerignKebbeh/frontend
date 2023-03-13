import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import { fetchUsers, queryInstance } from "../../api";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  CircularProgress,
  Collapse,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material";

import { Add } from "@mui/icons-material";
import { Box } from "@mui/system";
import useAuth from "../../hooks/useAuth";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { registerRoles } from "../../config/allowedRoles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const initialUser = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
  roles: [],
};

const UserPage = ({ socket }) => {
  const queryClient = new QueryClient();
  const { isAdmin, isManager } = useAuth();
  const theme = useTheme();
  const [userToAdd, setuserToAdd] = useState(initialUser);
  const [openAdd, setopenAdd] = useState(false);
  const [adding, setadding] = useState(false);
  const [addMessages, setaddMessages] = useState({ error: "", success: "" });

  const UserFetch = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const handleCloseAdd = () => {
    setopenAdd(false);
    setuserToAdd(initialUser);
    formik.handleReset()
  };

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setuserToAdd({ ...userToAdd, [name]: value });
  };
  function getStyles(role, roles, theme) {
    return {
      fontWeight:
        roles?.indexOf(role) === -1
          ? theme?.typography?.fontWeightRegular
          : theme?.typography?.fontWeightMedium,
    };
  }
  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Firstname is required";
    }
    if (!values.lastName) {
      errors.lastName = "Lastname is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (values.username.indexOf(" ") > -1) {
      errors.username = "Username can't have space character";
    }
    if (values.username.length > 15) {
      errors.username = "Username can't must be less than 15 characters";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password && values.confirmPassword !== values.password) {
      errors.confirmPassword = "confirmpassword must match password";
    }
    if (!values.roles.length) {
      errors.roles = "Roles is required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: initialUser,
    validate,
    onSubmit: async (values) => {
      setadding(true);
      setaddMessages({ success: "", error: "" });
      await queryInstance
        .post(`/users`, values)
        .then((res) => {
          setaddMessages({ ...addMessages, success: res?.data?.message });
          console.log(res);
          socket.emit("notify_add_user");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        })
        .catch((err) => {
          setaddMessages({ ...addMessages, error: err?.data?.message });
          console.log(err?.response?.data?.message);
          console.log(err);
        })
        .finally(() => {
          setadding(false);
        });
    },
  });

  return (
    <Box sx={{ mb: 10, mx: 3, px: 1 }} className="w-full h-full ">
      {UserFetch?.isLoading ? (
        <div>
          <p>Loading ..... </p>
        </div>
      ) : (
        <>
          {isAdmin || isManager ? (
            <Box
              mt={2}
              sx={{
                // float: { xl: 'right', lg: 'right', md: 'right', sm: 'none', xs: 'none' },
                zIndex: 2,
                // ml: 'auto', mr: {lg:'40px', xl:'80px', md: '40px', sm: '20px', xs: "20px" },
                mb: { md: "0", sm: "10px", xs: "10px" },
              }}
              >
                
                {/* <Collapse in={openAdd} timeout="auto" unmountOnExit>
                  <h2>lets see</h2>
                  <h2>lets see</h2>
              </Collapse> */}
              <Button
                endIcon={<Add />}
                variant="contained"
                onClick={(e) => setopenAdd((prev) => !prev)}
              >
                Add User
              </Button>
            </Box>
          ) : null}

          {UserFetch?.data?.users?.length ? (
            <UsersTable users={UserFetch?.data?.users} />
          ) : (
            <div className="p-3 ">
              <h3>No Users</h3>
            </div>
          )}
        </>
      )}
      {isAdmin || isManager ? (
        <Dialog
          open={openAdd}
          onClose={handleCloseAdd}
          scroll={"paper"}
          TransitionComponent={Transition}
        >
          <DialogTitle id="scroll-dialog-title">Add User</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              // ref={descriptionElementRef}
              tabIndex={-1}
            >
              {addMessages?.error?.length ? (
                <span
                  className={`text-red-700 text-lg text-center m-auto`}
                >
                  {addMessages?.error}
                </span>
              ) : null}
              {addMessages?.success?.length ? (
                <span
                  className={`text-green-700 text-lg
                            text-center m-auto`}
                >
                  {addMessages?.success}
                </span>
              ) : null}
            </DialogContentText>
            <form
              onSubmit={formik.handleSubmit}
              className="  
                                    md:py-3 py:2  px-1 "
            >
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 ">
                <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
                  <label className="font-normal text-lg" htmlFor="firstname">
                    Firstname
                  </label>
                  <input
                    className={`w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black`}
                    type="text"
                    name="firstName"
                    id="firstname"
                    placeholder="firstname"
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched && formik.errors.firstName ? (
                    <p className="text-red-700">{formik.errors.firstName}</p>
                  ) : null}
                </div>
                <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
                  <label className="font-normal text-lg" htmlFor="lastname">
                    Lastname
                  </label>
                  <input
                    className={`w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black`}
                    type="text"
                    name="lastName"
                    id="lastname"
                    placeholder="lastname"
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched && formik.errors.lastName ? (
                    <p className="text-red-700">{formik.errors.lastName}</p>
                  ) : null}
                </div>

                <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
                  <label className="font-normal text-lg" htmlFor="username">
                    Username
                  </label>
                  <input
                    className={`w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black`}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.touched && formik.errors.username ? (
                    <p className="text-red-700">{formik.errors.username}</p>
                  ) : null}
                </div>
                <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
                  <label className="font-normal text-lg" htmlFor="password">
                    Password
                  </label>
                  <input
                    className={`w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched && formik.errors.password ? (
                    <p className="text-red-700">{formik.errors.password}</p>
                  ) : null}
                </div>
                <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
                  <label
                    className="font-normal text-lg"
                    htmlFor="confirm password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className={`w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black`}
                    type="password"
                    name="confirmPassword"
                    id="confirm password"
                    placeholder="confirm password"
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  {formik.touched && formik.errors.confirmPassword ? (
                    <p className="text-red-700">
                      {formik.errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
                <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
                  <label
                    className="font-semibold text-lg -mb-1"
                    htmlFor="roles-select'"
                  >
                    Roles
                  </label>
                  <FormControl
                    sx={{ width: "100%", border: "2px solid black" }}
                    className={`rounded-lg `}
                  >
                    <Select
                      labelId="roles-select"
                      value={formik.values.roles}
                      multiple
                      onChange={formik.handleChange}
                      name="roles"
                      id="roles"
                      // input={<OutlinedInput label="roles" />}
                    >
                      {registerRoles?.map((role, id) => (
                        <MenuItem
                          value={role}
                          key={role}
                          id={role}
                          style={getStyles(role, formik.values.roles, theme)}
                        >
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.roles && formik.errors.roles ? (
                    <p className="text-red-700">{formik.errors.roles}</p>
                  ) : null}
                </div>
                {/* <RolesSelect user={userToAdd} setuser={setuserToAdd} /> */}
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size="medium"
              color="warning"
              sx={{ mr: 3 }}
              onClick={handleCloseAdd}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              // disabled={}
              size="medium"
              color="success"
              sx={{ mr: 1 }}
              onClick={formik.handleSubmit}
            >
              {adding ? <CircularProgress /> : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </Box>
  );
};

export default UserPage;
