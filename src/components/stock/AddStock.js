import React, { useState, useEffect, useRef } from 'react';
import { queryInstance } from '../../api';
import { QueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import SuccessMessage from '../StatusMessages/SuccessMessage';
import ErrorMessage from '../StatusMessages/ErrorMessage';

const initialStatus= { uploading: false, error: false, success: false}
const AddStock = ({ stock, setstock }) => {
    const {token} = useAuth()
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
            await queryInstance.put(`/categories/${stock?._id}`, { ...stock, lastUpdate: new Date() }, {headers:{Authorization: `Bearer ${token}`}}).then(res => {
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
        await queryInstance.post("/categories", { ...stock, createdDate: new Date() },{headers:{Authorization: `Bearer ${token}`}}).then(res => {
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
             bg-white dark:bg-slate-700
              shadow shadow-white my-3
             apply-form-boxshadow
             text-gray-700 dark:text-white'>
                <h3 className='text-lg text-center mt-2 '
                >{stock?._id?.length? "Edit": "Add"} Category</h3>
                {/* add status messages */}
                {addstatusMessages?.success?.length ?
                    <SuccessMessage message={addstatusMessages?.success} 
                        resetFunction={() => {
                            setaddstatusMessages({
                                ...addstatusMessages,
                                success: ''
                            })
                        }}
                    /> : null}
                {addstatusMessages?.error?.length ?
                    <ErrorMessage
                        error={addstatusMessages?.error}
                        handleReset={() => {
                            setaddstatusMessages({
                                ...addstatusMessages,
                                error: ''
                            })
                        }}
                    /> : null}
                
                {/* update status messages */}
                {updateStatusMessages?.success?.length ?
                    <SuccessMessage message={updateStatusMessages?.success} 
                        resetFunction={() => {
                            setupdateStatusMessages({
                                ...updateStatusMessages,
                                success: ''
                            })
                        }}
                    /> : null} 
                {updateStatusMessages?.error?.length ?
                    <ErrorMessage
                        error={updateStatusMessages?.error}
                        handleReset={() => {
                            setupdateStatusMessages({
                                ...addstatusMessages,
                                error: ''
                            })
                        }}
                    />: null}

                {/* form fields */}
                <div className='md:w-96 sm:w-52 text-start mb-2 p-1'>
                    <label className='block py-1 ' htmlFor='name' >Name</label>
                    <input type={'text'} id="name" 
                    className="bg-white dark:bg-slate-400 
                    text-slate-700 dark:text-white
                    text-xl w-full p-2 border-2 border-slate-900 rounded-md"
                        value={stock.name}
                        name="name"
                        ref={nameRef}
                        onChange={e => setstock({ ...stock, name: e.target.value })}
                    />
                </div>
                <div className='md:w-96 sm:w-52 text-start mb-2 p-1'>
                    <label className='block py-1 ' htmlFor='description' >Description</label>
                    <input type={'text'} id="description" name='description' 
                    className="bg-white dark:bg-slate-400 
                    text-slate-700 dark:text-white
                    text-xl w-full p-2 border-2 border-slate-900 rounded-md"
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
