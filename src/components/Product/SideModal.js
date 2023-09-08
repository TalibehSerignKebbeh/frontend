import React, { useEffect, useRef, useState } from 'react';
import './SideModal.css'
import { queryInstance, serverUrl } from '../../api';
import  CircularProgress from '@mui/material/CircularProgress';
import { QueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
// import SuccessMessage from '../StatusMessages/SuccessMessage';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import SuccessStatusComponent from '../StatusMessages/SuccessStatusComponent';
import axios from 'axios';

const initialValues = {
    name: '',sub_name:'',stockId: '', price: 0, unit_cost:0, quantity: 0,
    dimensions: '', description: '', picture: '', producedDate: '',
    expiryDate: '',
}
const SideModal = ({ showSideModal, setShowSideModal, socket }) => {
    const {token} = useAuth()
    const [product, setproduct] = useState(initialValues);
    const [categories, setCategories] = useState([]);
    const nameRef = useRef(showSideModal)
    const [uploading, setuploading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setsuccessMessage] = useState('');
    const queryClient = new QueryClient()
    const postController = new AbortController()
    const getStockcontroller = new AbortController()
    
    useEffect(() => {
            // nameRef.current.focus()

        const fetchCategories = async()=> {
        await queryInstance.get(`/categories`,{headers:{Authorization: `Bearer ${token}`}, signal:getStockcontroller.signal})
            .then(res => {
        setCategories(res?.data?.categories)
            }).catch((err) => {
            console.log(err);
        })
    
    }
        if (showSideModal) {
            fetchCategories()
        }
        return () => {
        };
    }, [getStockcontroller.signal, showSideModal, token]);
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!showSideModal) {
            postController.abort()
        };
        setuploading(true)
        setError('')
        setsuccessMessage('')
        axios.post(`${serverUrl}/products`, product, {headers:{Authorization: `Bearer ${token}`}, signal:postController.signal})
            .then(async(res) => {
                if (res?.status === 200) {
                setsuccessMessage(res?.data?.message)
                    socket.emit("notify_add_product")
                    setError('')
                    await queryClient.invalidateQueries({queryKey: ["products"]})
                    return
                }
                setError(GetError(res))

            }).catch(err => {
                setsuccessMessage('')  
                if (axios.isCancel(err)) {
                    setError(`requst cancelled`, err?.message)
                }
                // console.log(err);
                setError(GetError(err))
            }).finally(() => setuploading(false))

    }

    if (!showSideModal) {
        postController.abort()
        getStockcontroller.abort()
        return null
    }
    return (
        <div
            className={` side-modal ${showSideModal ? 'active' : ''} 
            rounded-md bg-white dark:bg-slate-600 shadow-md
            shadow-white dark:shadow-gray-600 `}>
            <div className="close-div mt-1 text-2xl mr-2  mb-3 py-4">
                <span id="close" title='Close'
                    className='text-slate-800 dark:text-white'
                    onClick={() => setShowSideModal(false)}>x</span>
            </div>
            <div className='h-auto w-full'>

            {error?.length ?
                <ErrorMessage error={error} 
                    handleReset={()=>setError('')}
                    />
                    : null
            }
            </div>
             <div className="md:px-12 py-5  px-6 overflow-y-scroll
                 relative border-b-2 border-t-2
                 border-green-700 flex-grow"
                >
                {successMessage?.length ?
                    <SuccessStatusComponent
                        successMessage={successMessage}
                        handleReset={() => {
                            setsuccessMessage('')
                        }}
                    /> :
               
                    <div className='flex flex-col gap-1 '>

                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="name">Name</label>
                            <input ref={nameRef}
                                className='w-full border border-slate-500 dark:border-slate-100 
                            bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3
                            text-lg'
                                type="text" name="name" id="name" placeholder='product name'
                                value={product?.name} onChange={e => setproduct({ ...product, name: e.target.value })} />
                        </div>
                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="name">Sub Name</label>
                            <input
                                className='w-full border border-slate-500 dark:border-slate-100 
                            bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3
                            text-lg'
                                type="text" name="sub_name" id="sub_name" placeholder='product sub name'
                                value={product?.sub_name} onChange={e => setproduct({ ...product, sub_name: e.target.value })} />
                        </div>
                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="price">price</label>
                            <input className='w-full border border-slate-500 dark:border-slate-100 
                        bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3
                        text-lg'
                                type="text" name="price" id="price" placeholder='product price'
                                value={product?.price || ''}
                                onChange={e => setproduct({ ...product, price: Number(e.target.value) })}
                            />
                        </div>
                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="price">Cost Per Unit</label>
                            <input className='w-full border border-slate-500 dark:border-slate-100 
                        bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3
                        text-lg'
                                type="text" name="unit_cost" id="unit_cost" placeholder='product per unit cost'
                                value={product?.unit_cost || ''}
                                onChange={e => setproduct({ ...product, unit_cost: Number(e.target.value) })}
                            />
                        </div>

                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="quantity">quantity</label>
                            <input className='w-full border border-slate-500 dark:border-slate-100 
                        bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3
                        text-lg
                        ' type="text" name="quantity" id="quantity"
                                placeholder='product quantity'
                                value={product?.quantity || ''}
                                onChange={e => setproduct({ ...product, quantity: Number(e.target.value) })}
                            />
                        </div>
                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="category">Category</label>
                            <select value={product?.stockId}
                                id="category" name='stockId'
                                onChange={e => setproduct({ ...product, stockId: e.target.value })}
                                className='w-full border border-slate-500 dark:border-slate-100 
                            bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3h-12 p-2 rounded-lg 
                            text-lg'
                            >
                                {!product?.stockId ? <option>Select Category</option> : null}
                                {categories?.map((category, id) => (
                                    <option value={category?._id} key={id}
                                        className="p-1 font-normal text-slate-700 dark:text-white">
                                        {category?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="description">description</label>
                            <input className='w-full border border-slate-500 dark:border-slate-100 
                        bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3
                        text-lg'
                                type="text" name="description" id="description"
                                value={product?.description}
                                placeholder="product description"
                                onChange={e => setproduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="Produced date">Produced date</label>
                            <input className='w-full border border-slate-500 dark:border-slate-100 
                        bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3  text-lg' type="date" name="producedDate
                       "
                                id="Produced date" value={product?.producedDate}
                                onChange={e => setproduct({ ...product, producedDate: e.target.value })}

                            />
                        </div>
                        <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                            <label className='text-lg text-slate-700 dark:text-slate-100'
                                htmlFor="expired date">expired date</label>
                            <input className='w-full border border-slate-500 dark:border-slate-100 
                        bg-white dark:bg-slate-300 text-slate-700 dark:text-white py-3
                        text-lg'
                                type="date" name="expiryDate" id="expired date"
                                value={product?.expiryDate}
                                onChange={e => setproduct({ ...product, expiryDate: e.target.value })}
                            />
                        </div>

                    </div>
                }
            </div>
            <div className="mt-1 w-full p-3 py-0 pb-1 
                  mx-auto flex flex-row
                  justify-between flex-shrink-0 flex-grow-0
                  order-3">
                {!uploading? <button className="reset py-2 px-5 rounded-md
                 text-lg bg-slate-400" type="reset"
                    onClick={() => setproduct(initialValues)}
                >Reset
                </button> : null}
                {uploading? <button className="reset py-2 px-5 rounded-md
                 text-lg bg-red-400" type="reset"
                    disabled={!uploading}
                    onClick={e=>postController.abort(`user cancelled request`)}
                >Cancell
                </button> : null}
                <button onClick={handleSubmit}
                    className="submit py-2 px-5 rounded-md text-lg bg-teal-500"
                    type="submit">
                    {uploading ? <CircularProgress sx={{ w: 1, h: 1 }} /> : "Submit"}
                </button>
            </div>

        </div>
    );
}

export default SideModal;
