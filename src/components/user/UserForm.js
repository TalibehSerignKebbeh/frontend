import Box from "@mui/material/Box";
import React, { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { Formik, useFormik } from "formik";
import { queryInstance } from "../../api";
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { registerRoles } from "../../config/allowedRoles";
import { getStyles } from "../../other/format";
import { GetError } from "../other/OtherFuctions";

const UserForm = ({ socket, UserData,setUserData, resetFunction }) => {
  // console.log(UserData);
  const queryClient = new QueryClient();
  const [adding, setadding] = useState(false);
  const [updating, setupdating] = useState(false);
  const [addMessages, setaddMessages] = useState({ error: "", success: "" });
  const [statusMessage, setstatusMessage] = useState({
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
    return errors;
  };
  const handleCloseAdd = () => {
    resetFunction();
    setaddMessages({ ...addMessages, error: "", success: "" });
    formik.handleReset();
  };
  const formik = useFormik({
    initialValues: { ...UserData },
    validate,
    onSubmit: async (values, {setSubmitting}) => {
      console.log("submitting");
      setupdating({ error: "", success: "" });
      setaddMessages({ success: "", error: "" });

      if (values?._id?.trim()?.length) {
        setupdating(true);
        const id = values?._id;
        await queryInstance
          .put(`/users/${id}`, UserData)
          .then((res) => {
            if (res.status === 200) {
              setstatusMessage({
                ...statusMessage,
                updateSuccess: res?.data?.message,
              });
              queryClient.invalidateQueries({ queryKey: ["users"] });
              return;
            }
             statusMessage({
              ...statusMessage,
              updateError: GetError(res),
            });
          })
          .catch((err) => {
            statusMessage({
              ...statusMessage,
              updateError: GetError(err),
            });
          
          })
          .finally(async () => {
            setupdating(false);
            queryClient.invalidateQueries({ queryKey: ["users"] });
          });

      }else{
      setadding(true);
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
    }
    }
  });
  return (
    <Box
      sx={{ mx: { xl: 2, lg: 2, md: 1, sm: "0", xs: "0" }, mr: "auto" }}
      className="bg-white shadow-white drop-shadow-xl py-2 h-auto
          "
    >
      <form onSubmit={formik.handleSubmit} className=" md:py-3 py:2  px-1 ">
        {/* status messages starts */}
        <div>
          {addMessages?.error?.length ? (
            <div
              className=" w-fit h-auto flex flex-row gap-x-40 content-between 
                items-center bg-slate-100 px-2 rounded"
            >
              <p className="text-red-700 text-lg">{addMessages?.error}</p>
              <span
                className="text-base py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white
                cursor-pointer m-auto rounded-full"
                              onClick={() => setaddMessages({...addMessages, error: ""})}
              >
                X
              </span>
            </div>
                  ) : null}
                   {addMessages?.success?.length ? (
            <div
              className=" w-fit h-auto flex flex-row gap-x-40 content-between 
                items-center bg-slate-100 px-2 rounded"
            >
              <p className="text-green-700 text-lg">{addMessages?.success}</p>
              <span
                className="text-base py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white
                cursor-pointer m-auto rounded-full"
                              onClick={() => setaddMessages({...addMessages, success: ""})}
              >
                X
              </span>
            </div>
          ) : null}
          
             {statusMessage?.success?.length ? (
            <div
              className=" w-fit h-auto flex flex-row gap-x-40 content-between 
                items-center bg-slate-100 px-2 rounded"
            >
              <p className="text-green-700 text-lg">{statusMessage?.success}</p>
              <span
                className="text-base py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white
                cursor-pointer m-auto rounded-full"
                              onClick={() => setstatusMessage({...statusMessage, success: ""})}
              >
                X
              </span>
            </div>
          ) : null}
          {statusMessage?.error?.length ? (
            <div
              className=" w-fit h-auto flex flex-row gap-x-40 content-between 
                items-center bg-slate-100 px-2 rounded"
            >
              <p className="text-red-700 text-lg">{statusMessage?.error}</p>
              <span
                className="text-base py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white
                cursor-pointer m-auto rounded-full"
                              onClick={() => setstatusMessage({...statusMessage, error: ""})}
              >
                X
              </span>
            </div>
                  ) : null}
        </div>
        {/* status messages ends */}

        <div className="flex flex-row flex-wrap gap-x-2 gap-y-3 md:px-3 mb-14 ">
          <div className=" md:w-64 sm:w-60 w-56 h-auto input-container">
            <label
              className="text-start font-normal text-lg"
              htmlFor="firstname"
            >
              FirstName
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 text-black border-2 border-black`}
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
              className="text-start font-normal text-lg"
              htmlFor="lastname"
            >
              LastName
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 text-black border-2 border-black`}
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
              className="text-start font-normal text-lg"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 text-black border-2 border-black`}
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
              className="text-start font-normal text-lg"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 text-black border-2 border-black`}
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
              className="text-start font-normal text-lg"
              htmlFor="confirm password"
            >
              Confirm Password
            </label>
            <input
              className={`w-full py-1 px-2 rounded-lg text-lg h-12 text-black border-2 border-black`}
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
            // onClick={formik.handleSubmit}
            disabled={false}
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
