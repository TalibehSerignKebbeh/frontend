// import { Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { queryInstance } from '../../api';

const initialStatus= { uploading: false, error: false, success: false}
const AddStock = () => {
    const nameRef = useRef()
    const [statusMessages, setstatusMessages] = useState({success:"", error:''});
    const [AddStatus, setAddStatus] = useState(initialStatus)
    const [success, setsuccess] = useState(false);
    const [loading, setloading] = useState(false);
    const [successMessage, setsuccessMessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [stockData, setstockData] = useState({
        name: '', description: ''
    });

    useEffect(() => {
        nameRef.current.focus()
    }, []);

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setloading(true)
        setsuccess(false)
        await queryInstance.post("/stocks",  {...stockData, createdDate: new Date()} ).then(res => {
            setAddStatus({ ...AddStatus, success: true })
            console.log(res);
            console.log(res?.data?.message);
            setstatusMessages(res?.data?.message)
        }).catch(err => {
            console.log(err);
            seterrorMessage(err?.data?.message)
        }).finally(()=> setloading(false))
    }
    return (
        <div className='w-full h-auto '>
            <form onSubmit={handleSubmitForm}
                className='p-6  w-fit mx-auto flex-auto
             bg-white shadow shadow-white my-10'>
                <h3 className='text-black text-lg font-semibold'
                >Add Product</h3>
               {successMessage?.length? <div className='md:w-96 sm:w-52 flex flex-row justify-around items-center'>
                    <small className='text-green-500'>
                        {successMessage}
                    </small> 
                    <span className='text-xs cursor-pointer'
                        onClick={e => setstatusMessages('')}>X</span>
                </div> : null}
                {errorMessage?.length? <div className='md:w-96 sm:w-52 flex flex-row justify-around items-center'>
                    <small className='text-red-500'>
                        {errorMessage}
                    </small> 
                    <span className='text-xs cursor-pointer'
                        onClick={e => seterrorMessage('')}>X</span>
                </div> : null}
                <div className='md:w-96 sm:w-52 text-start mb-2 p-1'>
                    <label className='block py-1 text-gray-900' htmlFor='name' >Name</label>
                    <input type={'text'} id="name" 
                    className="w-full p-2 border-2 border-slate-900 rounded-md"
                        value={stockData.name}
                        ref={nameRef}
                        onChange={e => setstockData({ ...stockData, name: e.target.value })}
                    />
                </div>
                <div className='md:w-96 sm:w-52 text-start mb-2 p-1'>
                    <label className='block py-1 text-gray-900' htmlFor='description' >Description</label>
                    <input type={'text'} id="description" 
                    className="w-full p-2 border-2 border-slate-900 rounded-md"
                        value={stockData.description}
                        onChange={e => setstockData({ ...stockData, description: e.target.value })}
                    />
                </div>
                {/* <div className='md:w-96 sm:w-52 text-start mb-2 p-1'>
                    <label className='block py-1 text-gray-900' htmlFor='price' >CostPrice</label>
                    <input type={'text'} id="price" 
                    className="w-full p-2 border-2 border-slate-900 rounded-md"
                        value={stockData.costPrice || ''}
                        onChange={e => setstockData({ ...stockData, costPrice: e.target.value })}
                    />
                </div> */}
                <div className='md:w-96 sm:w-52 text-start mt-6 p-1'>
                    <button className="w-full py-3 rounded 
                    bg-blue-500 shadow shadow-blue-600
                    text-white text-xl"
                        disabled={loading}
                        >{`${loading? 'Posting...':'Submit'}`}</button>
                </div>

            </form>

        </div>
    );
}

export default AddStock;
