import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SellProductPopper from '../Product/SellProduct';
import { fetchProducts } from '../../api';
import {useQuery} from '@tanstack/react-query'
import { Button } from '@mui/material';
import { AiFillCaretUp } from 'react-icons/ai';
const SellLayout = ({socket}) => {

    const { isLoading, data } =
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
            <Outlet />
            <>
                <Button sx={{
                    color: '#fff', bgcolor: '#00802b',opacity:.8,px:3,py:'6px',
                    ':hover': { bgcolor: '#00802b',opacity:1, }
                }} color='success' className='showSellBtn py-2'
                    onClick={() => setshowSellModal(prev => !prev)}
                endIcon={<AiFillCaretUp />}>
                    Sell
                </Button>
                {showSellModal && <SellProductPopper showSellModal={showSellModal}
                    setshowSellModal={setshowSellModal}
                    products={data?.products || []} loading={isLoading}
                    socket={socket}
                />}
            </>

        </>
    );
}

export default SellLayout;
