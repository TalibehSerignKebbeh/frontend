import React, { useState } from 'react';
// import SearchProducts from '../../sales/Select/SearchProducts';
import Button from '../../Buttons/Button';
// import ExpiredTable from './ExpiredTable';
import { queryInstance } from '../../../api';
import SingleProductSearch from '../../sales/Select/SingleProductSearch';
import { GetError } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import SuccessMessage from '../../StatusMessages/SuccessMessage';
import useAuth from '../../../hooks/useAuth';
import TableContainerComponent from './TableContainerComponent';
import CancelledTable from './CancelledTable';
// import RegisterSale from '../../sales/RegisterSale';
const OptionsValues = ['expire', 'spoil']

const Page = ({socket}) => {
    const {token} = useAuth()
    // const [product, setproduct] = useState(null);
    const [product, setproduct] = useState('');
    const [type, setType] = useState('');
    const [quantity, setquantity] = useState(1);
    const [uploading, setuploading] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
     const [tab, setTab] = useState("live")
    // const [products, setproducts] = useState([]);
    // const [expiredProducts, setexpiredProducts] = useState([]);
    // const [selectedProducts, setselectedProducts] = useState([]);

    const SubmitExpiredData = async () => {
        if (!product?.length || !(quantity > 0)) {
            const msg = (!product?.length && !(quantity > 0)) ? 'Product are quantity are required'
                : !product?.length? 'product is required' : 'quantity most be greater than zero(0)'
            seterrorMsg(msg)
            return
        }
        if (uploading) {
            return;
        }
        setuploading(true)
        seterrorMsg('')
        setsuccessMsg('')
        await queryInstance.post(`/expires`, { product, quantity,type, date: new Date() }
            , { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                // console.log(res);
                if (res?.status === 200) {
                    
                socket.emit('notify_update_product')
                    setsuccessMsg(res?.data?.message)
                    return;
                }
                seterrorMsg(GetError(res))
            }).catch((err) => {
                seterrorMsg(GetError(err))
              
                console.log(err);
            }).finally(() => setuploading(false))
    }

    const handleChange = (e) => {
        const { target: { value } } = e;
        if (isNaN(value) || Number(value) < 0) {
            return
        }
        const update = Number(value)
        setquantity(update)
    }

    return (
        <div className='w-full  h-full self-stretch'>
            {/* <div className='md:px-0 sm:px-0 px-2'>
                <h3 className='text-lg font-normal
                font-sans md:mx-20 sm:mx-10 mx-auto'>Register Expired Products</h3>
                <div  className='flex flex-col justify-start  
                items-start md:w-1/2 sm:w-11/12 w-full'>
                    <SearchProducts
                        products={products}
                        setproducts={setproducts}
                        selected={selectedProducts}
                        setselected={setselectedProducts}
                    />
                   <Button 
                            clickEvent={e=>setexpiredProducts([...expiredProducts, ...selectedProducts])}
                            classNa={`text-lg bg-green-700 
                            px-3 py-2 text-center
                            rounded-md text-white
                            justify-self-end
                            self-end md:mr-[310px] sm:mr-[156px] mr-[10px]
                            md:my-6 sm:my-3 my-3`}
                            text={`add`}
                        />
                </div>
               
            </div>
             <div className='my-3
                lg:w-1/2 md:w-3/4 sm:w-full '>
                    <ExpiredTable
                        expiredProducts={expiredProducts}
                        setexpiredProducts={setexpiredProducts}
                    />
                    <div className='flex items-center justify-end
                    w-full'>

                        <Button 
                            clickEvent={()=>{}}
                            classNa={`text-lg bg-green-700 
                            px-3 py-2 text-center
                            rounded-md text-white
                            justify-self-end
                            self-end mr-[156px]
                            mt-6 ml-auto mr-4`}
                            text={`Register`}
                        />
                    </div>
                </div> */}
            <div className='w-full flex flex-wrap 
            bg-slate-300 dark:bg-slate-700
            items-stretch md:justify-center md:gap-x-[200px] justify-evenly 
            my-6   py-5
            md:px-0 sm:px-5 px-3 gap-y-7
            '>
                <div className='bg-white dark:bg-slate-500
                text-black dark:text-white 
                flex flex-col gap-y-12 items-center justify-center p-2
                md:w-[400px] w-auto text-start
                rounded-lg h-fit py-14 px-8 my-auto' >
                    <div className=''>
                        <h3 className='text-start justify-self-start
                    font-sans text-lg'>
                        Register Expired/Spoilt Products
                    </h3>
                    <p
                        className='text-start justify-self-start
                        max-w-sm'>
                        Search for a product, enter the quantity expired or spoilt
                            and click the register button
                        </p>
                    </div>
                </div>
                <div className='
                 flex flex-col flex-wrap gap-3 
            justify-stretch items-start py-5 md:px-10 px-6 bg-white dark:bg-slate-500
            rounded-lg md:w-[400px] sm:w-[300px]
            w-[200px]
             '>
                    {errorMsg?.length ?
                        <ErrorMessage 
                            error={errorMsg}
                            handleReset={()=>seterrorMsg('')}
                        /> : null}
                    {successMsg?.length ?
                        <SuccessMessage
                            message={successMsg}
                            resetFunction={()=>setsuccessMsg('')}
                        /> : null}
                    <div className='flex flex-col'>
                        <span className='text-lg font-sans  
                        text-black dark:text-white '>
                            Search Product
                        </span>
                        <SingleProductSearch
                            product={product}
                            setproduct={setproduct}
                            onClear={() => setproduct('')}
                            onSelect={(value) => setproduct(value)}
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label className='text-lg font-sans capitalize 
                        text-black dark:text-white'
                            htmlFor='quantity'>
                            Quantity
                        </label>
                        <input id='quantity' name='quantity'
                            type='text'
                            onChange={handleChange}
                            value={quantity}
                            className='px-2 py-3 w-36
                    border border-orange-200
                    rounded-md bg-white
                    dark:bg-slate-400 
                    text-black dark:text-white '
                        />
                    </div>
                     <div className='flex flex-col'>
                        <label className='text-lg font-sans capitalize 
                        text-black dark:text-white'
                            htmlFor='type'>
                            Type
                        </label>
                        <select value={type}
                            onChange={e => setType(e.target.value)}
                        className='px-2 py-3 w-32
                    border border-orange-200
                    rounded-md bg-white
                    dark:bg-slate-400 
                    text-black dark:text-white   '>
                            {type?.length ? <option value="">None</option>
                            : null}
                            {OptionsValues?.map((opt, ind) => (
                                <option value={opt}
                                key={ind}>{opt}</option>
                         ))}
                        </select>
                        </div>
                    <Button
                        clickEvent={SubmitExpiredData}
                        classNa={`text-lg bg-green-700 
                            px-3 py-2 text-center
                            rounded-md text-white
                            mt-10 float-right
                            justify-self-end
                            `}
                        text={`${uploading ? "posting..." : "Register"}`}
                    />
                    {/* 
                        ${(!product?.length || !quantity>0)? 'cursor-none': uploading? 'cursor-progress':'cursor-none'}
                     */}
                </div>
            </div>
            <div className='bg-slate-300 dark:bg-slate-600
            md:w-[400px] sm:w-[400px] w-full px-1 py-2 
            flex gap-0 rounded-lg
            my-5 md:mx-8 sm:mx-5 mx-3'>
            <Button
                    text={`Live`}
                    clickEvent={() => {
                        setTab('live')
                    }}
                    classNa={`px-3 py-1 ${tab === 'live' ? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Cancelled`}
                    clickEvent={() => {
                        setTab('cancelled')
                    }}
                    classNa={`px-3 py-1 ${tab === 'cancelled' ? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
            </div>
            {tab === 'live' &&
                <TableContainerComponent
                    socket={socket}
                />
            }
            {tab === 'cancelled' &&
                <CancelledTable
                    socket={socket}
                />
            }


        </div>
    );
}

export default Page;
