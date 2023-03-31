import React from 'react';
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate()
    const navigateBack = () => {
        navigate(-1)
    }
    return (
        <div className='h-auto md:w-1/2 w-full text-center '>
            <div className='p-3  w-full mx-auto'>
                <h2 className=''>404 | Page not found</h2>
            </div>
            <button className='px-2 py-1 bg-slate-100 rounded-md'
                onClick={navigateBack}>back
            </button>
            
        </div>
    );
}

export default PageNotFound;
