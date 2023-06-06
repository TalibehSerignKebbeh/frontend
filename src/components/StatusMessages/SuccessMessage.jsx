import React from 'react';

const SuccessMessage = ({ message, resetFunction }) => {
    return (
        <div className=' w-fit mx-auto h-auto flex flex-row gap-x-40 
        content-between-center bg-slate-300 dark:bg-slate-400 
        px-2 py-2 rounded
        shadow-lg'>
            <p className='text-green-700 text-lg my-auto'>{message}</p>
            <span className='text-base py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white
                cursor-pointer m-auto rounded-full'
                onClick={resetFunction}>
                X
            </span>
        </div>
    );
}

export default SuccessMessage;
