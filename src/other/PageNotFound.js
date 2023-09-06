import React from 'react';
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate()
    const navigateBack = () => {
        navigate(-1)
    }
    return (
        <div className='h-fit w-fit text-center self-center justify-self-center
        m-auto flex flex-col items-center justify-center
        bg-slate-50 dark:bg-slate-700
        py-6 px-4 rounded-sm shadow shadow-slate-50 dark:shadow-slate-600'>
            <div className='p-3  w-full mx-auto'>
                <h2 className='text-black dark:text-white
                text-2xl capitalize'
                >404 | Page not found</h2>
            </div>
            <button className='px-12 py-1 pb-[6px] bg-slate-800 text-white
             rounded-md '
                onClick={navigateBack}>back
            </button>
            
        </div>
    );
}

export default PageNotFound;
