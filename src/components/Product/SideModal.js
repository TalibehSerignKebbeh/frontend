import React, { useEffect, useRef, useState } from 'react';
import './SideModal.css'
import { queryInstance, serverUrl } from '../../api';
import  CircularProgress from '@mui/material/CircularProgress';
import { QueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import SuccessMessage from '../StatusMessages/SuccessMessage';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import axios from 'axios';

const initialValues = {
    name: '',stockId: '', price: 0, quantity: 0,
    dimensions: '', description: '', picture: '', producedDate: '',
    expiryDate: '',
}
const SideModal = ({ showSideModal, setShowSideModal, socket }) => {
    const {token} = useAuth()
    const [product, setproduct] = useState(initialValues);
    const [stocks, setstocks] = useState([]);
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
        await queryInstance.get(`/stocks`,{headers:{Authorization: `Bearer ${token}`}, signal:getStockcontroller.signal})
            .then(res => {
        setstocks(res?.data?.stocks)
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
            .then(res => {
                if (res?.status === 200) {
                    queryClient.invalidateQueries({queryKey: ["products"]})
                setsuccessMessage(res?.data?.message)
                    socket.emit("notify_add_product")
                    setError('')
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
            rounded-md bg-white shadow-md
            shadow-white  pb-4`}>
            <div className="close-div mt-1 text-2xl mr-2  mb-3">
                <span id="close" title='Close' onClick={() => setShowSideModal(false)}>x</span>
            </div>
            {successMessage ?
                <SuccessMessage message={successMessage} 
                    resetFunction={()=>setsuccessMessage('')}
                /> : null}
            {error ?
                <ErrorMessage error={error} 
                    handleReset={()=>setError('')}
                /> : null}
            <div  className="  
                 md:px-12 py-5  px-6 overflow-y-scroll
                 relative border-y-2 border-gray-600">
                <div className='flex flex-col gap-1 '>

                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="name">Name</label>
                        <input ref={nameRef}
                            className='w-full border-2 border-black '
                            type="text" name="name" id="name" placeholder='product name'
                            value={product?.name} onChange={e => setproduct({ ...product, name: e.target.value })} />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="price">price</label>
                        <input className='w-full border-2 border-black '
                            type="text" name="price" id="price" placeholder='product price'
                            value={product?.price || ''}
                            onChange={e => setproduct({ ...product, price: Number(e.target.value) })}
                        />
                    </div>

                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="quantity">quantity</label>
                        <input className='w-full border-2 border-black 
                        ' type="text" name="quantity" id="quantity"
                            placeholder='product quantity'
                            value={product?.quantity || ''}
                            onChange={e => setproduct({ ...product, quantity: Number(e.target.value) })}
                        />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="category">Category</label>
                        <select value={product?.stockId}
                            id="category" name='stockId'
                            onChange={e => setproduct({ ...product, stockId: e.target.value })}
                            className='w-full border-2 border-black h-12 p-2 rounded-lg '
                        >
                           {!product?.stockId? <option>Select Category</option>: null}
                            {stocks?.map((stock, id) => (
                                <option value={stock?._id} key={id}
                                className="p-1  font-normal">
                                    {stock?.name}
                                </option>
                        ))}
                        </select>
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="description">description</label>
                        <input className='w-full border-2 border-black '
                            type="text" name="description" id="description"
                            value={product?.description}
                            placeholder="product description"
                            onChange={e => setproduct({ ...product, description: e.target.value })}
                        />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="Produced date">Produced date</label>
                        <input className='w-full border-2 border-black ' type="date" name="producedDate"
                            id="Produced date" value={product?.producedDate}
                            onChange={e => setproduct({ ...product, producedDate: e.target.value })}

                        />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="expired date">expired date</label>
                        <input className='w-full border-2 border-black '
                            type="date" name="expiryDate" id="expired date"
                            value={product?.expiryDate}
                            onChange={e => setproduct({ ...product, expiryDate: e.target.value })}
                        />
                    </div>

                </div>

                {/* <div className="mt-2 md:w-72 sm:w-60 w-56 buttons">
                    <button className="reset bg-red-300" type="reset">Reset</button>
                    <button className="submit bg-teal-500" type="submit">Submit</button>
                </div> */}
            </div>
            <div className="mt-1 md:w-72 sm:w-60 w-50 p-3  
                  mx-auto md:ml-5 ml-1 flex flex-row gap-14 mb-2 ">
                {!uploading? <button className="reset py-2 px-5 rounded-md
                 text-lg bg-red-300" type="reset"
                    onClick={() => setproduct(initialValues)}
                >Reset
                </button> : null}
                {uploading? <button className="reset py-2 px-5 rounded-md
                 text-lg bg-red-300" type="reset"
                    disabled={!uploading}
                    onClick={e=>postController.abort}
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
