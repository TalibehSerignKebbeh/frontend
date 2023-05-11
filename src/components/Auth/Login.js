import React, { useEffect, useState, useRef } from 'react';
// import { setCredentials } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {queryInstance} from '../../api'
// import { useLoginMutation } from '../../features/auth/authApiSlice'
import './login.css'
import LoginIcon from '../../imgs/newIncon.png'
import { GetError } from '../other/OtherFuctions';
import { useContextHook } from '../../context/AuthContext';


const Login = ({ socket }) => {
    const {storeAuthToken }  = useContextHook()
    const navigate = useNavigate();
    const usernameRef = useRef()
    const [user, setuser] = useState({ username: '', password: '' });
    // const [LoginRequest, { isLoading, error }] = useLoginMutation()

    const [errorMsg, seterrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    const [usernameError, setusernameError] = useState("");
    const [passwordError, setpasswordError] = useState('');
    const [usernameTouch, setusernameTouch] = useState(false);
    const [passwordTouch, setpasswordTouch] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    
    useEffect(() => {
        usernameRef.current.focus();
        return () => { };
    }, []);
    useEffect(() => {
        setpasswordError(!user?.password?.length ? 'password is required' :
            user?.password?.length < 5 ? "password must exceed 4 characters" : '')
    }, [user?.password])
    useEffect(() => {
        setusernameError(!user?.username?.length ? 'username is required'
            : (user?.username?.length <= 3 && user?.username.split(' ') > 1) ?
            "username cannot contain spaces, must exceed 4 characters"
            : user?.username?.length <= 3 ? "username must exceed 4 characters"
                : user?.username?.split(' ') > 1 ? "username cannot contain spaces" : '')
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
        await queryInstance.post(`/auth`, user)
            .then(res => {
                storeAuthToken(res?.data?.token)
                localStorage.setItem('token', res?.data?.token)
            setsuccessMsg(res?.data?.message)
            // console.log(res);
            socket.emit('notify_login', {username: user?.username, date:new Date()},)
            navigate("dashboard")
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
        <div className='form-container '>
            {/* <canvas style={{backgroundColor:'red'}}
            width={200} height={100}>Your browser does not support canvas</canvas> */}
            <form onSubmit={handleSubmit}
                className='login-form  border-2 shadow
                 shadow-white md:px-10 px-6 m-auto overflow-x-hidden 
                 h-auto w-96 justify-self-center 
                 place-items-center mb-auto flex flex-col 
                 items-center justify-center rounded-md
                 
                '>
                <img src={LoginIcon} alt="Login Icon" 
                    className='w-16 h-16 mt-2 bg-white text-green-500'
                />
                {/* <h1 className='text-lg text-center font-bold w-full md:py-2 '>
                    Login
                </h1> */}
                {successMsg ? <p className='text-green-500 text-lg font-medium p-1'>
                    {successMsg}
                </p> : null}
                {errorMsg?.length ?
                    <p className='text-red-500 text-lg font-medium px-1'>
                        {errorMsg}
                    </p> : null}
                <div className='md:w-60  sm:w-56 w-44 m-auto text-start mb-2'>
                    <label className='-ml-1 text-lg text-start  font-normal font-serif 
                    px-1 float-left -mb-1 py-2 opacity-75' htmlFor='username'>Username
                    </label>
                    <input ref={usernameRef}
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
                <div className='md:w-60 sm:w-56 w-44 m-auto  text-start'>
                    <label className='-ml-1 text-lg text-start font-normal 
                    px-1 float-left -mb-1 py-2 opacity-75' htmlFor='password'>Password</label>
                    <input className={`${(passwordError && passwordTouch) ? 'border-red-600' : 'border-slate-500 focus:shadow-md'}
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
                {/* <div className='my-2 mt-4 text-start
                md:w-60 w-56 m-auto  '>
                    <p className='text-xs font-semibold '>
                        Don't have an account
                        <Link to={'/register'}
                            className=" px-1 underline" >
                            Register
                        </Link> here
                    </p>
                </div> */}
                <button type='submit' disabled={isLoading}
                    className='md:text-xl text-sm md:w-60 w-48 md:h-14 h-10 
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
