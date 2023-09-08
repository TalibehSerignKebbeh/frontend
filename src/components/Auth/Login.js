import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryInstance } from '../../api'
import './login.css'
import LoginIcon from '../../imgs/newIncon.png'
import { GetError } from '../other/OtherFuctions';
import { useContextHook } from '../../context/AuthContext';
import jwtDecode from 'jwt-decode'
import {  definedRoles } from '../../config/allowedRoles';
import useAuth from '../../hooks/useAuth';




const Login = ({ socket }) => {
    const { storeAuthToken } = useContextHook()
    const {isAdmin, isSeller} = useAuth()
    const navigate = useNavigate();
    const usernameRef = useRef()
    const [user, setuser] = useState({ username: '', password: '' });

    const [errorMsg, seterrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    const [usernameError, setusernameError] = useState("");
    const [passwordError, setpasswordError] = useState('');
    const [usernameTouch, setusernameTouch] = useState(false);
    const [passwordTouch, setpasswordTouch] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        
        if (isAdmin) {
           navigate('/dashboard', {replace:true,}) 
        } else if (isSeller) {
           navigate('/sales', {replace:true,}) 
            
        } 
        return () => {
            
        };
    }, [isAdmin, isSeller, navigate]);
   
    useEffect(() => {
        usernameRef?.current?.focus();
    }, []);
    useEffect(() => {
        // setpasswordError(!user?.password?.length ? 'password is required' :
        //     user?.password?.length < 5 ? "password must exceed 4 characters" : ''
        // )
        setpasswordError(!user?.password?.length? 'password is required':'')
    }, [user?.password])
    useEffect(() => {
        // setusernameError(!user?.username?.length ? 'username is required'
        //     : (user?.username?.length <= 3 && user?.username.split(' ') > 1) ?
        //         "username cannot contain spaces, must exceed 4 characters"
        //         : user?.username?.length <= 3 ? "username must exceed 4 characters"
        //             : user?.username?.split(' ') > 1 ? "username cannot contain spaces" : ''
        // )
        setusernameError(!user?.username?.length? 'username is required' : '')
    }, [user?.username])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameError?.length || passwordError?.length) {
            setpasswordTouch(true)
            setusernameTouch(true)
            return;
        }
        seterrorMsg('')
        setisLoading(true)
        await queryInstance.post(`/auth`, { ...user, date: new Date() })
            .then(async (res) => {
                storeAuthToken(res?.data?.token)
                const decoded = jwtDecode(res?.data?.token)
                socket.emit('notify_login')

                const { roles } = decoded?.UserData
                if (roles?.includes(definedRoles?.admin)) {
                   return navigate("dashboard")
                }
                // localStorage.setItem('token', res?.data?.token)
                setsuccessMsg(res?.data?.message)
                // console.log(res);
                navigate("sales")
            }).catch(err => {
                // console.log(err?.toString())
                console.log(err);
                seterrorMsg(GetError(err))
                // console.log(err?.data?.message);
            }).finally(() => {
                setisLoading(false)
            })
    }


    return (
        <div className='form-container min-h-screen overflow-y-auto overflow-x-hidden'>
            {/* <canvas style={{backgroundColor:'red'}}
            width={200} height={100}>Your browser does not support canvas</canvas> */}
            <form onSubmit={handleSubmit}
                className='login-form  border-2 shadow
                 shadow-white md:px-10 sm:px-4 px-2 m-auto overflow-x-hidden 
                 min-h-max bg-white 
                 w-96 justify-self-center 
                 place-items-center mb-auto flex flex-col 
                 items-center justify-center rounded-md
                 
                '>
                <img src={LoginIcon} alt="Login Icon"
                    className='w-16 h-16 mt-2 bg-white text-green-500'
                />
               
                {successMsg ? <p className='text-green-500 text-lg font-medium p-1'>
                    {successMsg}
                </p> : null}
                {errorMsg?.length ?
                    <p className='text-red-500 p-1 bg-slate-200
                    rounded-sm mt-2 text-lg font-medium px-1'>
                        {errorMsg}
                    </p> : null}
                
                <div className='md:w-72  sm:w-64 w-10/12 m-auto text-start mb-2'>
                    <label className='-ml-1 text-lg text-start  font-normal font-serif 
                    px-1 float-left -mb-1 py-2 opacity-75' htmlFor='username'>Username
                    </label>
                    <input autoComplete='on' ref={usernameRef}
                        className={`${(usernameError && usernameTouch) ? 'border-red-600' : 'border-slate-500 focus:shadow-md'} 
                         mx-auto border-2  h-11 px-4
                          py-2 text-gray-800 rounded-xl w-full
                          `}
                        type={'text'} value={user?.username} id="username"
                        onChange={e => setuser({ ...user, username: e.target.value })}
                        onBlur={() => setusernameTouch(true)}
                        placeholder="Username ..."

                    />
                    {usernameError && usernameTouch ?
                        <span className='w-full text-red-500 px-1  
                         font-semibold text-start text-base first-letter:uppercase'>
                            {usernameError}
                        </span>
                        :
                        null}
                </div>
                <div className='md:w-72 sm:w-64 w-10/12 m-auto  text-start'>
                    <label className='-ml-1 text-lg text-start font-normal 
                    px-1 float-left -mb-1 py-2 opacity-75' htmlFor='password'>Password</label>
                    <input autoComplete='off' className={`${(passwordError && passwordTouch) ? 'border-red-600' : 'border-slate-500 focus:shadow-md'}
                        mx-auto border-2  h-11
                        px-4 py-2 text-gray-800 rounded-xl w-full
                        `}
                        type={'password'} value={user?.password} id="password"
                        onChange={e => setuser({ ...user, password: e.target.value })}
                        onBlur={() => setpasswordTouch(true)}
                        placeholder="Password ..."
                    />
                    {passwordError && passwordTouch ?
                        <span className='mr-auto ml-0 text-red-500 px-1 
                        font-normal text-start text-base first-letter:uppercase'>
                            {passwordError}
                        </span>
                        :
                        null}

                </div>
               
                <button type='submit' disabled={isLoading}
                    className='md:text-xl text-sm md:w-60 w-48 py-2 
                    m-auto my-8 bg-orange-400 text-white
                    shadow-xl opacity-80 hover:opacity-100 rounded-md'>
                    {isLoading ? "Loading......" : 'Submit'}
                </button>

                {/* <div data-value={'1'} className='bg first absolute'></div>
            <div data-value={'2'} className='bg second absolute'></div>
            <div data-value={'3'} className='bg third absolute'></div>
            <div data-value={'4'} className='bg fourth absolute'></div>
            <div data-value={'5'} className='bg fifth absolute'></div> */}
            </form>

            {/* background components */}
            {/* <div></div> */}

        </div>

    );
}

export default Login;
