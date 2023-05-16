import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SellProductPopper from '../Product/SellProduct';
import { fetchProducts } from '../../api';
import {useQuery,QueryClient} from '@tanstack/react-query'
import { Button } from '@mui/material';
import { AiFillCaretUp } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';

const SellLayout = ({ socket }) => {
    const {token} = useAuth()
    const client = new QueryClient()
   
    const { isLoading, data, error, failureReason } =
        useQuery(['products'], ()=> fetchProducts({token, startDate: null, endDate:null, quantityThreshold:0,revenueThreshold:0}))
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
    if (data?.response?.status === 403) {
        return <div>
            <h2>Token has expired login again</h2>
        </div>
    }
    if (error?.response?.status === 403) { 
          console.log(error);
    }
    if (failureReason?.response?.status === 403) { 
          console.log(failureReason);
    }

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
