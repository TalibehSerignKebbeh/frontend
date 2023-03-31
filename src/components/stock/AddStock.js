import React, { useState, useEffect, useRef } from 'react';
import { queryInstance } from '../../api';
import { QueryClient } from '@tanstack/react-query';

const initialStatus= { uploading: false, error: false, success: false}
const AddStock = ({stock, setstock}) => {
    const nameRef = useRef()
    const queryClient = new QueryClient()
    const [addstatusMessages, setaddstatusMessages] = useState({ success: "", error: '' });
    const [updateStatusMessages, setupdateStatusMessages] = useState({success: "", error: '' });
    const [AddStatus, setAddStatus] = useState(initialStatus)
    const [loading, setloading] = useState(false);

    useEffect(() => {
        nameRef.current.focus()
    }, []);

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setloading(true)
        if (stock?._id?.length) {
            await queryInstance.put(`/stocks/${stock?._id}`, { ...stock, lastUpdate: new Date() }).then(res => {
                console.log(res);
                if (res?.status === 200) {
                    queryClient.invalidateQueries({queryKey: ['stocks']})
                }
                setupdateStatusMessages({
                    ...updateStatusMessages,
                success:res?.data?.message, error: res?.response?.data?.message})
            }).catch((err) => {
                setupdateStatusMessages({
                    ...updateStatusMessages,
                success:"", error: err?.response?.data?.message})
            }).finally(()=>{setloading(false)})

            return;
        }
        await queryInstance.post("/stocks", { ...stock, createdDate: new Date() }).then(res => {
            if (res?.status === 200) {
                    queryClient.invalidateQueries({queryKey: ['stocks']})
                }
            setAddStatus({ ...AddStatus, success: true })
            console.log(res);
            console.log(res?.data?.message);
            setaddstatusMessages({...addstatusMessages, error:res?.response?.data?.message, success:res?.data?.message})
        }).catch(err => {
            console.log(err);
            setaddstatusMessages({...addstatusMessages, error:'', success:err?.response?.data?.message})
           
        }).finally(()=> setloading(false))
    }
  
    return (
        <div className='w-full h-auto '>
            <form onSubmit={handleSubmitForm}
                className='p-6 py-2 w-fit mx-auto flex-auto
             bg-white shadow shadow-white my-3
             apply-form-boxshadow'>
                <h3 className='text-black text-lg text-center '
                >{stock?._id?.length? "Edit": "Add"} Category</h3>
                {/* add status messages */}
                {addstatusMessages?.success?.length ?
                    <div className='bg-gray-100 py-3 px-3 rounded-md md:w-96 sm:w-52 flex flex-row justify-between items-center'>
                    <span className='text-green-500'>
                        {addstatusMessages?.success}
                    </span> 
                    <span title='close' className='text-xs px-2 py-1 rounded-lg hover:bg-red-400 cursor-pointer'
                        onClick={e => setaddstatusMessages({...addstatusMessages,success: ''})}>X</span>
                </div> : null}
                {addstatusMessages?.error?.length ?
                    <div className='bg-gray-100 py-3 px-3 rounded-md md:w-96 sm:w-52 flex flex-row justify-between items-center'>
                    <span className='text-red-500'>
                        {addstatusMessages?.error}
                    </span> 
                    <span title='close' className='text-xs px-2 py-1 rounded-lg hover:bg-red-400 cursor-pointer'
                        onClick={e => setaddstatusMessages({...addstatusMessages,error: ''})}>X</span>
                </div> : null}
                
                {/* update status messages */}
                {updateStatusMessages?.success?.length ?
                    <div className='bg-gray-100 py-3 px-3 rounded-md md:w-96 sm:w-52 flex flex-row justify-between items-center'>
                    <span className='text-green-500'>
                        {updateStatusMessages?.success}
                    </span> 
                    <span title='close' className='text-xs px-2 py-1 rounded-lg hover:bg-red-400 cursor-pointer'
                        onClick={e => setupdateStatusMessages({...updateStatusMessages,success: ''})}>X</span>
                </div> : null}
                {updateStatusMessages?.error?.length ?
                    <div className='bg-gray-100 py-3 px-3 rounded-md md:w-96 sm:w-52 flex flex-row justify-between items-center'>
                    <span className='text-red-500'>
                        {updateStatusMessages?.error}
                    </span> 
                    <span title='close' className='text-xs px-2 py-1 rounded-lg hover:bg-red-400 cursor-pointer'
                        onClick={e => setupdateStatusMessages({...updateStatusMessages,error: ''})}>X</span>
                </div> : null}

                {/* form fields */}
                <div className='md:w-96 sm:w-52 text-start mb-2 p-1'>
                    <label className='block py-1 text-gray-900' htmlFor='name' >Name</label>
                    <input type={'text'} id="name" 
                    className="w-full p-2 border-2 border-slate-900 rounded-md"
                        value={stock.name}
                        name="name"
                        ref={nameRef}
                        onChange={e => setstock({ ...stock, name: e.target.value })}
                    />
                </div>
                <div className='md:w-96 sm:w-52 text-start mb-2 p-1'>
                    <label className='block py-1 text-gray-900' htmlFor='description' >Description</label>
                    <input type={'text'} id="description" name='description' 
                    className="w-full p-2 border-2 border-slate-900 rounded-md"
                        value={stock.description}
                        onChange={e => setstock({ ...stock, description: e.target.value })}
                    />
                </div>
                <div className='md:w-96 sm:w-52 text-start mt-6 p-1'>
                    <button className="w-full py-3 rounded 
                    bg-blue-500 shadow shadow-blue-600
                    text-white text-xl"
                        disabled={loading}
                    >{loading ? 'Posting...' : stock?._id?.length ? "Update" : "Submit"}</button>
                </div>

            </form>

        </div>
    );
}

export default AddStock;
