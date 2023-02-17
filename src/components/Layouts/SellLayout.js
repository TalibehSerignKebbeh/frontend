import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SellProductPopper from '../Product/SellProduct';
import { fetchProducts } from '../../api';
import {useQuery} from '@tanstack/react-query'
const SellLayout = () => {

    const { isLoading, data, isSuccess, isError, error } =
        useQuery(['products'], ()=> fetchProducts())
    // useEffect(() => {        
    //     const fetchProducts = async () => {
    //         setloading(true)
    //         await queryInstance.get(`/products`)
    //             .then(res => {
    //                 setproducts(res?.data?.products)
    //             }).catch(err => {
    //                 console.log(err);
    //             }
    //             ).finally(() => { setloading(false) })
    //     }
    //     fetchProducts()
        
    //     return () => {

    //     };
    // }, []);

    // if(loading)
    const [showSellModal, setshowSellModal] = useState(false);

    return (
        <>
            <>
                <button className='showSellBtn'
                    onClick={() => setshowSellModal(prev => !prev)}>
                    {/* <AiFillCaretUp className=''/> */}
                    Sell
                </button>
                <SellProductPopper showSellModal={showSellModal}
                    setshowSellModal={setshowSellModal}
                    products={data?.products || []} loading={isLoading}
                />
            </>
            <Outlet />

        </>
    );
}

export default SellLayout;
