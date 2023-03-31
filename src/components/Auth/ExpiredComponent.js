import React from 'react';
import { Link } from 'react-router-dom';

const ExpiredComponent = () => {
    return (
        <div className='py-4 text-lg text-start w-full 
        px-1 bg-inherit flex flex-col text-black'>
            <h2>You token has expired please login again</h2>
            <p className='text-lg w-full'>
                <Link className='float-right px-1 py-2 text-green-700'
                    to={'/'} >Login</Link>
            </p>
        </div>
    );
}

export default ExpiredComponent;
