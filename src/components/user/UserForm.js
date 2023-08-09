import Box from "@mui/material/Box";
import React, { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import {  useFormik } from "formik";
import { queryInstance } from "../../api";
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import {useTheme} from '@mui/material'
import { registerRoles } from "../../config/allowedRoles";
import { getStyles } from "../../other/format";
import { GetError } from "../other/OtherFuctions";
import SuccessMessage from "../StatusMessages/SuccessMessage";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import useAuth from "../../hooks/useAuth";

const UserForm = ({ socket, UserData, setUserData, resetFunction }) => {
  const {token } = useAuth()
  const queryClient = new QueryClient();
  const [adding, setadding] = useState(false);
  const [updating, setupdating] = useState(false);
  const [addMessages, setaddMessages] = useState({ error: "", success: "" });
  const [updateStatusMessage, setupdateStatusMessage] = useState({
    success: "",
    error: "",
  });
  const theme = useTheme();

  const validate = (values) => {
    const errors = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      roles: "",
      active:''
    };
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
    if (values.username.length > 20) {
      errors.username = "Username must be less than 20 characters";
    }
    if (!UserData?._id?.length && !values.password) {
      errors.password = "Password is required";
    }
    if (values.password?.length && values.password?.length < 4) {
      errors.password = "Password must be more than 5 characters";
    }

    if (values.password && values.confirmPassword !== values.password) {
      errors.confirmPassword = "confirmpassword must match password";
    }
    if (!values.roles.length) {
      errors.roles = "Roles is required";
    }
    if (!typeof values?.active === 'boolean') {
      errors.roles = "active status undefined";
    }
    if (values?.salary <= 0) {
      errors.salary = "salary is required";
    }
    return errors;
  };
  const handleCloseAdd = () => {
    resetFunction();
    setaddMessages({ ...addMessages, error: "", success: "" });
    formik.handleReset();
  };
  const submitData = async () => {
    const values = formik.values;
    setupdating({ error: "", success: "" });
    setaddMessages({ success: "", error: "" });
    if (values?._id?.trim()?.length) {
      setupdating(true);
      const id = values?._id;
      await queryInstance
        .put(`/users/${id}/profile`, values,{headers:{Authorization:`Bearer ${token}`}})
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setupdateStatusMessage({
              ...updateStatusMessage,
              success: res?.data?.message,
            });
            queryClient.invalidateQueries({ queryKey: ["users"] });
            return;
          }
          updateStatusMessage({
            ...updateStatusMessage,
            error: GetError(res),
          });
        })
        .catch((err) => {
          console.log(err);
          setupdateStatusMessage({
            ...updateStatusMessage,
            error: GetError(err),
          });

        })
        .finally(async () => {
          setupdating(false);
          queryClient.invalidateQueries({ queryKey: ["users"] });
        });

    } else {
      setadding(true);
      await queryInstance
        .post(`/users`, values,{headers:{Authorization:`Bearer ${token}`}})
        .then((res) => {
          console.log(res);
          setaddMessages({ ...addMessages, success: res?.data?.message });
          // console.log(res);
          socket.emit("notify_add_user");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        })
        .catch((err) => {
          setaddMessages({
            ...addMessages, error: GetError(err) });
          // console.log(err?.response?.data?.message);
          console.log(err);
        })
        .finally(() => {
          setadding(false);
          queryClient.invalidateQueries({ queryKey: ["users"] });

        });
    }

  }
  const formik = useFormik({
    initialValues: { ...UserData },
    validate: validate,

    // onSubmit: async (values) => {
    //   console.log("submitting");
    //   setupdating({ error: "", success: "" });
    //   setaddMessages({ success: "", error: "" });

    //   if (values?._id?.trim()?.length) {
    //     setupdating(true);
    //     const id = values?._id;
    //     await queryInstance
    //       .put(`/users/${id}`, UserData)
    //       .then((res) => {
    //         if (res.status === 200) {
    //           setupdateStatusMessage({
    //             ...updateStatusMessage,
    //             updateSuccess: res?.data?.message,
    //           });
    //           queryClient.invalidateQueries({ queryKey: ["users"] });
    //           return;
    //         }
    //          updateStatusMessage({
    //           ...updateStatusMessage,
    //           updateError: GetError(res),
    //         });
    //       })
    //       .catch((err) => {
    //         updateStatusMessage({
    //           ...updateStatusMessage,
    //           updateError: GetError(err),
    //         });

    //       })
    //       .finally(async () => {
    //         setupdating(false);
    //         queryClient.invalidateQueries({ queryKey: ["users"] });
    //       });

    //   }else{
    //   setadding(true);
    //   await queryInstance
    //     .post(`/users`, values)
    //     .then((res) => {
    //       setaddMessages({ ...addMessages, success: res?.data?.message });
    //       console.log(res);
    //       socket.emit("notify_add_user");
    //       queryClient.invalidateQueries({ queryKey: ["users"] });
    //     })
    //     .catch((err) => {
    //       setaddMessages({ ...addMessages, error: err?.data?.message });
    //       console.log(err?.response?.data?.message);
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       setadding(false);
    //     });
    // }
    // }
  });
  return (
    <Box
      sx={{ mx: { xl: 2, lg: 2, md: 1, sm: "0", xs: "0" }, mr: "auto" }}
      className="bg-white dark:bg-slate-700
      shadow-white dark:sahdow-slate-500 
      drop-shadow-xl py-2 h-auto
          "
    >
      <div>
        {addMessages?.success?.length ?
          <SuccessMessage message={addMessages?.success}
          resetFunction={() => { setaddMessages({ ...addMessages, success: '' }) }} /> : null}

        {updateStatusMessage?.success?.length? <SuccessMessage message={updateStatusMessage?.success}
          resetFunction={() => { setupdateStatusMessage({ ...updateStatusMessage, success: '' }) }} /> : null}
        {updateStatusMessage?.error?.length? 
          <ErrorMessage error={updateStatusMessage?.error}
          handleReset={()=>setupdateStatusMessage('')}
          /> : null}
        {addMessages?.error?.length? 
          <ErrorMessage error={addMessages?.error}
          handleReset={()=>setaddMessages('')}
        /> : null}
      </div>
      <form onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className=" md:py-3 py:2  px-1 ">
        
        <div className="flex flex-row flex-wrap gap-x-2 gap-y-3 md:px-3 mb-14 ">
          <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label
              className=" text-start text-slate-700 dark:text-slate-50
               font-normal text-lg"
              htmlFor="firstname"
            >
              FirstName
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 
              bg-white dark:bg-slate-400 
                text-slate-700 dark:text-slate-100
                 border-2 border-black`}
              type="text"
              name="firstName"
              id="firstname"
              placeholder="firstname"
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.touched && formik.errors.firstName ? (
              <p className=" text-start text-red-700">
                {formik.errors.firstName}
              </p>
            ) : null}
          </div>
          <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label
              className=" text-start text-slate-700 dark:text-slate-50
               font-normal text-lg"
              htmlFor="lastname"
            >
              LastName
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 
              bg-white dark:bg-slate-400 
                text-slate-700 dark:text-slate-100
                 border-2 border-black`}
              type="text"
              name="lastName"
              id="lastname"
              placeholder="lastname"
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.touched && formik.errors.lastName ? (
              <p className=" text-start text-red-700">
                {formik.errors.lastName}
              </p>
            ) : null}
          </div>

          <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label
              className=" text-start text-slate-700 dark:text-slate-50
               font-normal text-lg"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 
              bg-white dark:bg-slate-400 
                text-slate-700 dark:text-slate-100
                 border-2 border-black`}
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onBlur={formik.handleBlur}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched && formik.errors.username ? (
              <p className=" text-start text-red-700">
                {formik.errors.username}
              </p>
            ) : null}
          </div>
          <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label
              className=" text-start text-slate-700 dark:text-slate-50
               font-normal text-lg"
              htmlFor="salary"
            >
              salary
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 
              bg-white dark:bg-slate-400 
                text-slate-700 dark:text-slate-100
                 border-2 border-black`}
              type="number"
              name="salary"
              id="salary"
              placeholder="salary"
              onBlur={formik.handleBlur}
              value={formik.values.salary}
              onChange={formik.handleChange}
            />
            {formik.touched && formik.errors.salary ? (
              <p className=" text-start text-red-700">
                {formik.errors.salary}
              </p>
            ) : null}
          </div>
          <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label
              className=" text-start text-slate-700 dark:text-slate-50
               font-normal text-lg"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 
              bg-white dark:bg-slate-400 
                text-slate-700 dark:text-slate-100
                 border-2 border-black`}
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched && formik.errors.password ? (
              <p className=" text-start text-red-700">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          
          <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label
              className=" text-start text-slate-700 dark:text-slate-50
               font-normal text-lg"
              htmlFor="confirm password"
            >
              Confirm Password
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 
              bg-white dark:bg-slate-400 
                text-slate-700 dark:text-slate-100
                 border-2 border-black`}
              type="password"
              name="confirmPassword"
              id="confirm password"
              placeholder="confirm password"
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {formik.touched && formik.errors.confirmPassword ? (
              <p className=" text-start text-red-700">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div className=" md:w-64 sm:w-60 w-56  h-12 input-container">
            <label
              className="font-semibold text-lg -mb-1
               text-slate-700 dark:text-slate-50
              "
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
                className="bg-white dark:bg-slate-400 
                text-slate-700 dark:text-slate-100
                h-12"
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
              <p className=" text-start text-red-700">{formik.errors.roles}</p>
            ) : null}
          </div>
        </div>
        <div className="w-auto -mt-8 mb-3 md:mx-2 mx-1 
        h-auto p-1
         rounded-md input-container">
          <span className="py-2 text-lg
           font-normal text-slate-700 dark:text-slate-50 
           ">Active</span>
            <label
            className={`${formik?.values?.active ?
              'bg-green-400' : 'bg-gray-400'} 
            w-24 rounded-md
             shadow-md p-[2px]
             text-start font-normal 
              text-lg cursor-pointer
              flex items-center justify-start`}
              htmlFor="active"
            >
            
              <input
              className={ `hidden peer w-full h-full rounded-md `}
              type="checkbox"
              name="active"
              id="active"
                placeholder=""
                checked={formik.values.active}
              onBlur={formik.handleBlur}
              value={formik.values.active}
              onChange={formik.handleChange}
            />
            <span className="
            bg-slate-200 
            h-10 w-10 rounded-[50%] 
            transform   
            transition-transform ease-in-out 
            translate-x-[1px] peer-checked:translate-x-[53px]
            "></span>
            </label>
              
            {formik.touched && formik.errors.active ? (
              <p className=" text-start text-red-700">
                {formik.errors.active}
              </p>
            ) : null}
          </div>
        <div className="grid grid-cols-2 gap-x-3 md:w-80 w-full mr-1 ml-auto">
          <button
            disabled={adding || updating}
            className="px-10 py-2 text-lg text-white bg-orange-700 rounded-md"
            type="reset"
            onClick={handleCloseAdd}
          >
            Reset
          </button>
          <button
            // disabled={adding || updating}
            className="px-10 py-2 text-lg text-white bg-green-700 rounded-md"
            type="submit"
            onClick={submitData}
          // disabled={false}
          >
            {adding || updating ? (
              <CircularProgress />
            ) : UserData?._id?.length ? (
              "Edit"
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </Box>
  );
};

export default UserForm;
