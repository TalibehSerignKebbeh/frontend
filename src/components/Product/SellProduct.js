import React, { useState, useEffect } from 'react';
import './sellModal.css'
import { queryInstance } from '../../api/index'
import { AiFillCaretDown, } from "react-icons/ai"
import useAuth from '../../hooks/useAuth';
import SellTable from './Sell/SellTable';
import { QueryClient } from '@tanstack/react-query';
import Box from '@mui/system/Box';
import SellForm from './SellForm';
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
                display: 'flex', flexDirection: 'row', gap: '15px',
                flexWrap: { xl: "wrap-reverse", lg: "wrap", md: "wrap", sm: "wrap-reverse", xs: 'wrap' }
            }}>
                <div>
                    {statusMessages?.success?.length ?
                        <div className=' w-fit h-auto flex flex-row gap-x-40 content-between 
                items-center bg-slate-100 px-2 py-2 rounded'>
                            <p className='text-green-700 text-lg my-auto'>{statusMessages?.success}</p>
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
                        <SellForm product={product} setproduct={setproduct}
                            products={products} setproductsTosell={setproductsTosell}
                            productsTosell={productsTosell}
                        />
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
