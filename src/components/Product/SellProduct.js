import React, { useState, useEffect } from 'react';
import './sellModal.css'
import { queryInstance } from '../../api/index'

import { AiFillCaretDown, } from "react-icons/ai"
import useAuth from '../../hooks/useAuth';
import  Add  from '@mui/icons-material/Add';
import SellTable from './Sell/SellTable';
import { QueryClient } from '@tanstack/react-query';
import  Box  from '@mui/system/Box';

const initialProductValues = { productId: '', quantity: 0, price: 0, name: '' }
const initialStatusMessages = { success: '', error: '' }
const initialUploadStatus = { loading: false, success: false, error: false }

const SellProductPopper = ({ showSellModal, setshowSellModal, products, setproducts, socket }) => {
    const queryClient = new QueryClient()
    const [product, setproduct] = useState({ productId: '', quantity: 0, price: 0, name: '' });
    const [uploadStatus, setuploadStatus] = useState(initialUploadStatus);
    const [statusMessages, setstatusMessages] = useState(initialStatusMessages);
    const [submittable, setsubmittable] = useState(false);
    const { token } = useAuth()
    // const [products, setproducts] = useState([]);
    const [productsTosell, setproductsTosell] = useState([]);

    const handleSellProduct = async (e) => {
        e.preventDefault()
        if (!showSellModal || !token) return;
        productsTosell?.map(sale => sale.saleDate = new Date().toUTCString())
        //    productsTosell?.
        console.log(productsTosell);
        // return
        setuploadStatus({ ...uploadStatus, success: false, loading: true, error: false })
        await queryInstance.post(`/sales`, productsTosell)
            .then(res => {
                console.log(res);
                let status = res?.status;
                if (status === 200) {
                    socket.emit('notify_sale')
                    setuploadStatus({ ...uploadStatus, success: true, loading: false, error: false })
                    setstatusMessages({ ...statusMessages, success: res?.data?.message, error: '' })
                    setproductsTosell([])
                    queryClient.invalidateQueries({ queryKey: ['products'] })
                    queryClient.invalidateQueries({ queryKey: ['todaysSales'] })
                    setproductsTosell([])
                    return
                }
                setuploadStatus({ ...uploadStatus, success: false, loading: false, error: true })
                setstatusMessages({ ...statusMessages, success: '', error: res?.response?.data?.message })
            }).catch(err => {
                setuploadStatus({ ...uploadStatus, error: true, success: false, loading: false })
                console.log(err);
                setstatusMessages({ ...statusMessages, success: '', error: err?.response?.data?.message })
                // setisError(true)
            })
    }
    const handleChangeProduct = (e) => {
        const value = e.target.value;
        const selectedProduct = products?.find(prod => prod?._id === value)
        setproduct({
            ...product, productId: value, name: selectedProduct?.name,
            price: selectedProduct?.price,
        })
    }
    const handleAddProductToCart = (e) => {
        e.preventDefault();
        if (!product?.quantity || !product?.productId) return;
        setproductsTosell([...productsTosell, {...product, total:product?.price * product?.quantity}])

    }
    const handleResetSale = () => {
        setproductsTosell([])
        setproduct(initialProductValues)
    }
    useEffect(() => {
        if (!productsTosell?.length) { setsubmittable(false) }
        else { setsubmittable(true) }

    }, [submittable, productsTosell]);
    useEffect(() => {
        if (!token) return new AbortController().abort()
    }, [token]);
    if (!token)
        return null

    return (
        <div className={`sell-modal ${showSellModal ? 'active' : ''}
        bg-white shadow-lg shadow-white 
        rounded-sm z-20 `}>
            <div className='w-full h-auto  
                  pt-0 flex flex-row align-top
                  justify-between my-0 relative'>
                <h3 className='px-2  pl-0 py-1 text-lg 
                  text-green-800 font-semibold'>
                    Sell Product
                </h3>
                <button
                    title='close sell modal'
                    className={`cursor-pointer text-lg 
                    ${showSellModal ? 'relative m-auto mt-0 ml-auto mr-0 scale-125' : ''}`}
                    onClick={() => setshowSellModal(prev => !prev)}>
                    <AiFillCaretDown className='drop-icon' />
                </button>
            </div>
            <Box sx={{
                display: 'flex', flexDirection: 'row',gap:'15px',
                flexWrap: { xl: "wrap-reverse", lg: "wrap", md: "wrap", sm: "wrap-reverse", xs: 'wrap' }
            }}>
                <div>
                    {statusMessages?.success?.length ?
                        <div className=' w-fit h-auto flex flex-row gap-x-40 content-between 
                items-center bg-slate-100 px-2 rounded'>
                            <p className='text-green-700 text-lg'>{statusMessages?.success}</p>
                            <span className='text-base py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white
                cursor-pointer m-auto rounded-full' onClick={() => setstatusMessages(initialStatusMessages)}>
                                X
                            </span>
                        </div> : null}
                    {statusMessages?.error?.length ?
                        <div className='bg-slate-100 w-full h-auto flex flex-row content-between'>
                            <p className='text-red-700 text-base'>{statusMessages?.error}</p>
                            <span className='float-right text-base  p-2 hover:bg-red-400 
                cursor-pointer m-auto' onClick={() => setstatusMessages(initialStatusMessages)}>
                                X
                            </span>
                        </div> : null}
                    <div className='w-full bg-white md:p-3 p-2'>
                        <form className={`text-start flex flex-row flex-wrap gap-2
                    items-end mt-2`}
                            onSubmit={handleAddProductToCart}>
                            {/* <span>{productsTosell?.length}</span> */}
                            <div className=" w-auto  h-auto ">
                                <label className='block -mb-1 px-1 text-lg' htmlFor="id">Product</label>
                                <select
                                    className='border-2 border-gray-700 w-60 
                            h-12 rounded-md px-2 mx-auto my-3 p-1'
                                    value={product?.productId} id="id" name='id'
                                    multiple={false} onChange={handleChangeProduct}
                                >
                                    <option value={''}>None</option>
                                    {products?.map((aproduct, id) => (
                                        <option key={id} value={`${aproduct?._id}`}>
                                            {`${aproduct?.name} D${aproduct?.price} ${aproduct?.quantityInStock}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className=" w-auto h-auto ">
                                <label className='block -mb-1 px-1 text-lg' htmlFor="quantity">quantity</label>
                                <input className='border-2 border-gray-700
                         w-28 h-12 rounded-md px-2 mx-auto my-3'
                                    type="text" id="quantity"
                                    placeholder='quantity'
                                    value={product?.quantity || ''}
                                    onChange={e => setproduct({ ...product, quantity: Number(e.target.value) })}
                                />
                            </div>
                            <div className=' py-2 mb-1 pb-3'>
                                <button type='submit'
                                    className='relative my-auto ml-auto mr-6 bg-white
                           shadow-white p-1  rounded-2xl hover:bg-zinc-300'
                                    disabled={!product?.productId || !product?.quantity}
                                    onClick={() => handleAddProductToCart}
                                >
                                    <Add className='scale-150' />
                                </button>
                            </div>

                        </form>
                        <div className='m-auto flex flex-row justify-evenly 
                    gap-x-6 mt-20 w-full h-auto '>
                            <button className="reset py-2 md:px-14 px-8 rounded-md
                                 text-white md:text-xl text-sm bg-red-300" type="reset"
                                onClick={handleResetSale}
                            >Reset
                            </button>
                            <button onClick={handleSellProduct}
                                disabled={!productsTosell?.length || uploadStatus?.loading}
                                className="submit text-white py-3 
                                 md:px-14 px-8 rounded-md md:text-xl text-sm bg-teal-500"
                                type="submit">
                                {uploadStatus?.loading ? "adding" : "Submit"}
                            </button>

                        </div>
                    </div>
                </div>
                {productsTosell?.length ?
                    <SellTable setproducts={setproductsTosell}
                        products={productsTosell} /> : null}
                

            </Box>


        </div>
    );
}

export default SellProductPopper;
