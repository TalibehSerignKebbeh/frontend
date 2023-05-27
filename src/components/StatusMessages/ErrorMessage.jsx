import React from 'react';

const ErrorMessage = ({ error, handleReset }) => {
    return (
        <div  className='bg-red-800 md:w-96 w-11/12
        h-auto flex flex-row justify-between
        items-center px-1 py-2 mx-auto rounded-sm'>
            <p className='text-black dark:text-white text-base my-auto'>{error}</p>
            <button className=' text-base  text-white  
             px-2 w-7 h-7
                cursor-pointer rounded-2xl
                bg-slate-500' onClick={handleReset}>
                X
            </button>
        </div>
    );
}

export default ErrorMessage;
