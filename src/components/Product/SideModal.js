import React, { useEffect, useRef, useState } from 'react';
import './SideModal.css'
import { queryInstance } from '../../api';
import { CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const initialValues = {
    name: '',stockId: '', price: 0, quantity: 0,
    dimensions: '', description: '', picture: '', producedDate: '',
    expiryDate: '',
}
const SideModal = ({ showSideModal, setShowSideModal, socket }) => {
    const [product, setproduct] = useState(initialValues);
    const [stocks, setstocks] = useState([]);
    const nameRef = useRef(showSideModal)
    const [uploading, setuploading] = useState(false);
    const [isError, setisError] = useState(false);
    const [successMessage, setsuccessMessage] = useState('');

    const fetchCategories = async()=> {
        await queryInstance.get(`/stocks`)
            .then(res => {
        setstocks(res?.data?.stocks)
            }).catch((err) => {
            console.log(err);
        })
    
    }
    useEffect(() => {
        if (showSideModal) {
            nameRef.current.focus()
            fetchCategories()
        }
        return () => {
        };
    }, [showSideModal]);
    const handleSubmit = (e) => {
        if (!showSideModal) return;
        setisError(false)
        setuploading(true)
        setsuccessMessage('')
        queryInstance.post(`/products`, product)
            .then(res => {
                console.log(res);
                setsuccessMessage(res?.data?.message)
                socket.emit("notify_add_product")
            }).catch(err => {
                setsuccessMessage('')   
                console.log(err);
                setisError(true)
            }).finally(() => setuploading(false))

    }

    if (!showSideModal)
        return null
    return (
        <div
            className={` side-modal ${showSideModal ? 'active' : ''} 
            rounded-md bg-white shadow-md
            shadow-white  pb-4`}>
            <div className="close-div mt-1 text-2xl mr-2  mb-3">
                <span id="close" title='Close' onClick={() => setShowSideModal(false)}>x</span>
            </div>
            {successMessage ?
                <div className='w-full h-auto flex text-start
                justify-between bg-green-300 items-center rounded-2xl'>
                <span className='text-gray-700 text-lg mx-auto'>{successMessage}</span>
                <IconButton onClick={e=>setsuccessMessage('')}><Close /> </IconButton>
            </div> : null}
            <form onSubmit={handleSubmit} className="  
                 md:px-12 py-5  px-6 overflow-y-scroll
                 relative border-y-2 border-gray-600">
                <div className='flex flex-col gap-1 '>

                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="name">Name</label>
                        <input ref={nameRef}
                            className='w-full border-2 border-black '
                            type="text" name="" id="name" placeholder='product name'
                            value={product?.name} onChange={e => setproduct({ ...product, name: e.target.value })} />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="price">price</label>
                        <input className='w-full border-2 border-black '
                            type="text" name="" id="price" placeholder='product price'
                            value={product?.price || ''}
                            onChange={e => setproduct({ ...product, price: Number(e.target.value) })}
                        />
                    </div>

                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="quantity">quantity</label>
                        <input className='w-full border-2 border-black 
                        ' type="text" name="" id="quantity"
                            placeholder='product quantity'
                            value={product?.quantity || ''}
                            onChange={e => setproduct({ ...product, quantity: Number(e.target.value) })}
                        />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="category">Category</label>
                        <select value={product?.stockId}
                            id="category"
                            onChange={e => setproduct({ ...product, stockId: e.target.value })}
                            className='w-full border-2 border-black h-12 p-2 rounded-lg '
                        >
                           {!product?.stockId? <option>Select Category</option>: null}
                            {stocks?.map((stock, id) => (
                                <option value={stock?._id} key={id}
                                className="p-1 italic font-normal">
                                    {stock?.name}
                                </option>
                        ))}
                        </select>
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="description">description</label>
                        <input className='w-full border-2 border-black '
                            type="text" name="" id="description"
                            value={product?.description}
                            placeholder="product description"
                            onChange={e => setproduct({ ...product, description: e.target.value })}
                        />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="Produced date">Produced date</label>
                        <input className='w-full border-2 border-black ' type="date" name=""
                            id="Produced date" value={product?.producedDate}
                            onChange={e => setproduct({ ...product, producedDate: e.target.value })}

                        />
                    </div>
                    <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                        <label className='text-lg' htmlFor="expired date">expired date</label>
                        <input className='w-full border-2 border-black '
                            type="date" name="" id="expired date"
                            value={product?.expiryDate}
                            onChange={e => setproduct({ ...product, expiryDate: e.target.value })}
                        />
                    </div>

                </div>

                {/* <div className="mt-2 md:w-72 sm:w-60 w-56 buttons">
                    <button className="reset bg-red-300" type="reset">Reset</button>
                    <button className="submit bg-teal-500" type="submit">Submit</button>
                </div> */}
            </form>
            <div className="mt-1 md:w-72 sm:w-60 w-50 p-3  
                  mx-auto md:ml-10 ml-4 flex flex-row gap-16 mb-2 ">
                <button className="reset py-2 px-5 rounded-md
                 text-lg bg-red-300" type="reset"
                    onClick={() => setproduct(initialValues)}
                >Reset
                </button>
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
