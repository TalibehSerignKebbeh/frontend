import React from 'react';

const ErrorMessage = ({ error, handleReset }) => {
    return (
        <div className='bg-slate-100 md:w-96 w-11/12
        h-auto flex flex-row justify-between
        items-center px-1 py-2 mx-auto rounded-sm'>
            <p className='text-red-700 text-base my-auto'>{error}</p>
            <span className=' text-base  py-1 px-2 hover:bg-red-400 
                cursor-pointer rounded-2xl' onClick={handleReset}>
                X
            </span>
        </div>
    );
}

export default ErrorMessage;
