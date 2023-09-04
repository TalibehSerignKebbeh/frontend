import React from 'react';
import useAuth from '../../hooks/useAuth';

const MyNewTopBar = () => {
    const { token } = useAuth()
    
     if (!token) return null;
    return (
        <div
            className={` self-stretch flex flex-row justify-between items-center
             md:py-6 py-4 px-1 bg-white dark:bg-slate-700
             `}
        >
            <div>

            <h3>Hi from topbar</h3>
            </div>

            <div className='px-2'>
                Notification side
            </div>
            
        </div>
    );
}

export default MyNewTopBar;
