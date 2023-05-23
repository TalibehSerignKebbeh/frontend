import React from 'react';

const ErrorMessage = ({ error, handleReset }) => {
    return (
        <div style={{backgroundColor:'red', color:'white'}} className='bg-red-800 md:w-96 w-11/12
        h-auto flex flex-row justify-between
        items-center px-1 py-2 mx-auto rounded-sm'>
            <p className='text-black text-base my-auto'>{error}</p>
            <span className=' text-base text-black  py-1 px-2 hover:bg-white 
                cursor-pointer rounded-2xl' onClick={handleReset}>
                X
            </span>
        </div>
    );
}

export default ErrorMessage;
