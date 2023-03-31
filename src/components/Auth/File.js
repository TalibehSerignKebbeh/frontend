import React, { useEffect, useState, useRef } from "react";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
import LoginIcon from "../../imgs/newIncon.png";
import { queryInstance } from "../../api";

const Login = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const [user, setuser] = useState({ username: "", password: "" });

  const [errorMsg, seterrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [usernameError, setusernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameTouch, setusernameTouch] = useState(false);
  const [passwordTouch, setpasswordTouch] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
    return () => {};
  }, []);
  useEffect(() => {
    setpasswordError(
      !user?.password?.length
        ? "password is required"
        : user?.password?.length < 5
        ? "password must exceed 4 characters"
        : ""
    );
  }, [user?.password]);
  useEffect(() => {
    setusernameError(
      !user?.username?.length
        ? "username is required"
        : user?.username?.length <= 3 && user?.username.split(" ") > 1
        ? "username cannot contain spaces, must exceed 4 characters"
        : user?.username?.length <= 3
        ? "username must exceed 4 characters"
        : user?.username?.split(" ") > 1
        ? "username cannot contain spaces"
        : ""
    );
  }, [user?.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError?.length || passwordError?.length) {
      setpasswordTouch(true);
      setusernameTouch(true);
      return;
    }
    setisLoading(true);
    seterrorMsg("");
    await queryInstance
      .post(`/auth`, user)
        .then((res) => {
          console.log(res);
        if (res?.status === 200) {
            dispatch(setCredentials(res));
            setTimeout(() => {
                
            }, 500);
          socket.emit("notify_login", {
            username: user?.username,
            date: new Date(),
          });
            navigate("dashboard");
            return
          }
          if (res?.response?.status===400) {
              seterrorMsg(res?.response?.data?.message)
              return;
            }
             if (res?.response?.status===500) {
              seterrorMsg("Internal server error")
              return;
            }
            if (!res?.response) { seterrorMsg("No server response");  return}
      })
        .catch((err) => {
        console.log(err);
          if (err?.response?.status===400) {
              seterrorMsg(err?.response?.data?.message)
              return;
            }
            if (err?.response?.status===500) {
              seterrorMsg("Internal server error")
              return;
            }
            if (!err?.response) { seterrorMsg("No server response");  return}
            
        seterrorMsg(err?.response?.data?.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <div className="form-container">
      {/* <canvas style={{backgroundColor:'red'}}
            width={200} height={100}>Your browser does not support canvas</canvas> */}
      <form
        onSubmit={handleSubmit}
        className="login-form  border-2 shadow
                 shadow-white md:px-10 px-6 m-auto overflow-x-hidden 
                 h-auto w-96 justify-self-center 
                 place-items-center mb-auto flex flex-col 
                 items-center justify-center rounded-md
                 
                "
      >
        <img
          src={LoginIcon}
          alt="Login Icon"
          srcSet=""
          className="w-16 h-16 mt-2 bg-white text-green-400"
        />

        {errorMsg?.length ? (
          <p className="text-red-500 text-lg font-medium px-1">{errorMsg}</p>
        ) : null}
        <div className="md:w-60  sm:w-56 w-44 m-auto text-start mb-2">
          <label
            className="-ml-1 text-lg text-start  font-normal 
                    px-1 float-left -mb-1 py-2 opacity-90"
            htmlFor="username"
          >
            Username
          </label>
          <input
            ref={usernameRef}
            className={`${
              usernameError && usernameTouch
                ? "border-red-600"
                : "border-slate-500 focus:shadow-md"
            } 
                         mx-auto border-2  h-11 px-4
                          py-2 text-gray-800 rounded-xl w-full
                          `}
            type={"text"}
            value={user?.username}
            id="username"
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            onBlur={() => setusernameTouch(true)}
            placeholder="Username ..."
          />
          {usernameError && usernameTouch ? (
            <span
              className="w-full text-red-500 px-1  
                         font-semibold text-start text-base first-letter:uppercase"
            >
              {usernameError}
            </span>
          ) : null}
        </div>
        <div className="md:w-60 sm:w-56 w-44 m-auto  text-start">
          <label
            className="-ml-1 text-lg text-start font-normal 
                    px-1 float-left -mb-1 py-2 opacity-90"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`${
              passwordError && passwordTouch
                ? "border-red-600"
                : "border-slate-500 focus:shadow-md"
            }
                        mx-auto border-2  h-11
                        px-4 py-2 text-gray-800 rounded-xl w-full
                        `}
            type={"password"}
            value={user?.password}
            id="password"
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            onBlur={() => setpasswordTouch(true)}
            placeholder="Password ..."
          />
          {passwordError && passwordTouch ? (
            <span
              className="mr-auto ml-0 text-red-500 px-1 
                        font-normal text-start text-base first-letter:uppercase"
            >
              {passwordError}
            </span>
          ) : null}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="md:text-xl text-sm md:w-60 w-48 md:h-14 h-10 
                    m-auto my-8 bg-orange-400 text-white
                    shadow-xl opacity-80 hover:opacity-100 rounded-md"
        >
          {isLoading ? "Loading......" : "Submit"}
        </button>

              </form>

          </div>
  );
};

export default Login;
