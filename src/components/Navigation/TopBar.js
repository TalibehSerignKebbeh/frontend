import React from 'react';
// import img from '../../imgs/unnamed.webp'
import useAuth from '../../hooks/useAuth';
import { CircularProgress, IconButton } from '@mui/material';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const [logoutRequest, {isLoading,}] = useSendLogoutMutation()
    const { token, username } = useAuth()
    const navigate = useNavigate()
    if (!token)
        return null
    
    const handleLogout = async () => {
        await logoutRequest().unwrap()
            .then(res => {
                console.log(res)
                 navigate('/')
                localStorage.removeItem('persist:root')
            })
    }
    return (
        <div className=' w-full p-2 h-14 bg-white shadow-yellow-50'>
            
            <div className='h-full float-right m-auto text-center mt-auto mb-1'>
                <div className='w-fit h-4 items-center my-auto 
                    place-items-center  flex flex-row gap-0 py-4 m-auto
                       rounded rounded-r-lg text-sm text-gray-700'
                >
                    {/* <img src={img} style={{ borderRadius: '50%', zIndex: '2' }} alt=''
                        className=' w-10 h-10 float-left -mr-2' /> */}
                    <IconButton sx={{
                        bgcolor: 'whitesmoke',mr:{md:2, sm:1, sx:0}
                    }} onClick={handleLogout}
                    >{isLoading? <CircularProgress /> :<AiOutlineLogout className='text-black' />}</IconButton>
                    <span className='py-1 pb-2 justify-self-center  
                     px-3 rounded-br-xl rounded-tr-xl self-center
                     font-bold text-xs bg-slate-100 capitalize'>
                        {username}
                    </span> 
                </div>
            </div>
        </div>
    );
}

export default TopBar;
