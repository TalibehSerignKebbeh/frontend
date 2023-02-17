import  CircularProgress  from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiFillDelete,  AiFillEdit } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { queryInstance } from '../../api';
import './editProduct.css'
const EditProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setproduct] = useState({});
    const [stocks, setstocks] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [updateLoading, setupdateLoading] = useState(false);
    const [updateError, setupdateError] = useState(false);
    const [deleting, setdeleting] = useState(false);
    const [deleteError, setdeleteError] = useState('');
    // const [isdeleteError, setisdeleteError] = useState(false);
    // const {data, isLoading, isError,isSuccess } = useQuery(['product', { productId: id }],
    //    await queryInstance.get(`/products/${id}`))
    // // console.log(data);
    // if (isSuccess) {
    //     setproduct(data?.product)
    //     console.log(data);
    // }
    useEffect(() => {

        const fetchProduct = async () => {
            setisLoading(true)
            setisSuccess(false)
                // queryInstance(`/products/${id}`)
            await axios.all([queryInstance.get(`/products/${id}`), queryInstance.get(`/stocks`)])
                .then(res => {
                    console.log(res);
                    setproduct(res[0]?.data?.product)
                    setstocks(res[1]?.data?.stocks)
                    setisSuccess(true)
                })
                .catch(err => {
                    console.log(err);
                }).finally(() => setisLoading(false))
        }
        fetchProduct()
        return () => {

        };
    }, [id]);

    const handleEditProduct = async (e) => {
        e.preventDefault()
        setupdateLoading(true)
        console.log(product);
        await queryInstance.put(`/products/${id}`, product)
            .then(res => {
                console.log(res);
                // alert("update successfull")
                // navigate(-1)
                let status = res?.data?.status;
                if (status === "success") {
                alert("update successfull")
                } else {
                alert("An error occured")
                }
            })
            .catch(err => {
                console.log(err);
                setupdateError(true)
            }).finally(() => setupdateLoading(false))
    }

    const handleDeleteProduct = async () => {
        setdeleting(true)
        setdeleteError('')
        await queryInstance.delete(`/products/${id}`)
            .then(res => {
                console.log(res);
                navigate(-1)
            }).catch(err => {
                console.log(err);
                setdeleteError(err?.data?.message)
            }).finally(() => setdeleting(false))
    }
    return (
        <div className='w-full h-full flex flex-row
         items-center justify-center md:mt-12 mt-5'>
            {isLoading ? <div className='md:mt-14 mt-6'>
                <CircularProgress sx={{ color: 'red' }} />
            </div>
                : product ?
                    <form className='flex flex-row flex-wrap 
                        items-center md:w-11/12 w-full gap-y-4 
                        gap-x-3 m-auto md:justify-start justify-center
                        md:mb-3 mb-14'
                    >
                        <div className='w-full h-auto p-1'>
                            <div className='actionBtns float-right px-2 py-2 flex flex-row gap-14
                            md:mr-72 sm:mr-20 mr-4'>
                                <IconButton onClick={handleEditProduct}>
                                    {updateLoading ? <CircularProgress />
                                        : <AiFillEdit className='scale-150 text-blue-700'
                                        />}
                                </IconButton>
                                <IconButton onClick={handleDeleteProduct}
                                    disabled={deleting}>
                                    {deleting ? <CircularProgress /> :
                                        <AiFillDelete className='scale-150 text-red-600' />}
                                </IconButton>

                            </div>
                        </div>
                        {deleteError?.length ?
                            <div className='w-full h-auto'>
                                <p className='text-red-600
                                text-base'>{deleteError}</p>
                            </div> : null}
                        {deleteError?.length ?
                            <div className='w-full h-auto'>
                                <p className='text-red-600
                                text-base'>{deleteError}</p>
                            </div> : null}
                        <div className='md:w-72 sm:w-68 w-52 text-start'>
                            <label className='text-gray-900 font-semibold text-lg
                             w-full block' htmlFor='name'>Name</label>
                            <input className='text-xl font-medium py-3 px-2 border-2 border-gray-500
                                 rounded-md w-full' type={'text'}
                                value={product?.name || ''}
                                onChange={e => setproduct({ ...product, name: e.target.value })}
                                id="name" placeholder='product name' />
                        </div>
                        <div className='md:w-72 sm:w-68 w-52 text-start'>
                            <label className='text-gray-900 font-semibold text-lg
                             w-full block' htmlFor='quantity'>Quantity</label>
                            <input className='text-xl font-medium py-3 px-2 border-2 border-gray-500
                                 rounded-md w-full' type={'text'}
                                value={product?.quantity || ''}
                                onChange={e => setproduct({ ...product, quantity: e.target.value })}
                                id="quantity" placeholder='product quantity' />
                        </div>
                        <div className='md:w-72 sm:w-68 w-52 text-start'>
                            <label className='text-gray-900 font-semibold text-lg
                             w-full block' htmlFor='price'>Price</label>
                            <input className='text-xl font-medium py-3 px-2 border-2 border-gray-500
                                 rounded-md w-full' type={'text'}
                                value={product?.price || ''}
                                onChange={e => setproduct({ ...product, price: e.target.value })}
                                id="price" placeholder='product price' />
                        </div>
                        <div className='md:w-72 sm:w-68 w-52 text-start'>
                            <label className='text-gray-900 font-semibold text-lg
                             w-full block' htmlFor='stockId'>Category</label>
                            <select
                            className='border-2 border-gray-700 w-full 
                            h-14 rounded-md px-2 mx-auto my-3 p-1'
                            value={product?.stockId} id="stockId"
                            onChange={(e) => setproduct({ ...product, stockId: e.target.value })}
                            multiple={false}
                        >
                            {/* {!product?.s ? <option>None</option> : null} */}
                            {stocks?.map((stock, id) => (
                                <option key={id} value={stock?._id}
                                className={`first-letter:uppercase`}>
                                    {`${stock?.name},  ${stock?.description || ''}`}
                                </option>
                            ))}
                        </select>
                         
                        </div>
                        <div className='md:w-72 sm:w-68 w-52 text-start'>
                            <label className='text-gray-900 font-semibold text-lg
                             w-full block' htmlFor='producedDate'>Produced Date</label>
                            <input className='text-xl font-medium py-3 px-2 border-2 border-gray-500
                                 rounded-md w-full' type={'date'}
                                value={product?.producedDate?.slice(0, 10)?.toString() || ''}
                                onChange={e => setproduct({ ...product, producedDate: e.target.value })}
                                id="producedDate" placeholder='product category' />
                        </div>
                        <div className='md:w-72 sm:w-68 w-52 text-start'>
                            <label className='text-gray-900 font-semibold text-lg
                             w-full block' htmlFor='expiryDate'>Expiry Date</label>
                            <input className='text-xl font-medium py-3 px-2 border-2 border-gray-500
                                rounded-md w-full' type={'date'}
                                value={product?.expiryDate?.slice(0, 10)?.toString() || ''}
                                onChange={e => setproduct({ ...product, expiryDate: e.target.value })}
                                id="expiryDate" />
                        </div>
                        {/* <div className='md:w-72 sm:w-68 w-52 text-start
                        mt-5'>
                            <button className='w-full rounded-md
                            py-2 bg-blue-700 text-white text-lg '
                            >
                                {updateLoading ? <CircularProgress /> : 'Submit'}
                            </button>
                        </div> */}
                    </form>
                    :
                    <div className='p-6 text-center my-5'>
                        <p>Product no found</p>
                    </div>
            }
        </div>
    );
}

export default EditProductPage;
