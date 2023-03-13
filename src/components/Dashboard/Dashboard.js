import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import {  fetchProductsStats, fetchSalesStats, fetchSalesToday, queryInstance } from '../../api';
import { useQueries } from '@tanstack/react-query';
import QuantityCard from './card/QuantityCard';
import { CircularProgress, Typography } from '@mui/material';
// import SalesCard from './card/SalesCard';
import {BiAnalyse} from 'react-icons/bi'
import SalesDataGridVir from '../sales/SalesDataGridVir';
import { ContentPasteGo } from '@mui/icons-material';
import SalesCard from './card/SalesCard';
import Header from '../other/Header';

const Dashboard = () => {



    const results = useQueries({
        queries: [
            {
                queryKey: ['salesStats'],
                queryFn: () => fetchSalesStats(),

            }, {
                queryKey: ['productsStats'],
                queryFn: () => fetchProductsStats()
            },
            {
                queryKey: ['todaysSales'],
                queryFn: () => fetchSalesToday()
            }
        ]
    })
    // useEffect(() => {
    //     // console.log(new Date().g);
    //     const fetchSalesAndOthers = async () => {
    //         setloading(true)
    //         // await queryInstance.get(`/sales/stats`)
    //         await axios.all([queryInstance.get(`/sales/stats`), queryInstance.get(`/products/stats`)])
    //             .then(res => {
    //                 console.log(res);
    //                 // sales response data
    //                 // setsalesToday(res[0]?.data?.salesToday)
    //                 settotalSales(res[0]?.data?.totalSales)
    //                 settodaysTotal(res[0]?.data?.totalSalesToday)
    //                 setthisWeeksTotal(res[0]?.data?.thisWeeksTotal)
    //                 setlastWeeksTotal(res[0]?.data?.lastWeeksTotal)
    //                 settotalYesterday(res[0]?.data?.totalYesterday)
    //                 // product response data
    //                 setproductsCount(res[1]?.data?.productsCount)
    //                 setproductsOutOfStock(res[1]?.data?.outOfStockCount)
    //             }).catch(err => {
    //                 console.log(err);
    //             }).finally(() => { setloading(false) })
    //     }
    //     fetchSalesAndOthers()
    //     return () => {

    //     };
    // }, []);
    // useEffect(() => {
    //     setloadingSalesToday(true)
    //     const fetchSalesToday = async () => {
    //         await queryInstance.get(`/sales?saleDate=${new Date()}&&page=${0}&&pageSize=${20}`)
    //             .then(res => {
    //                 console.log(res);
    //                 setsalesToday(res?.data?.sales)
    //             }).catch(err => {
    //                 console.log(err);
    //             }).finally(res => setloadingSalesToday(false))
    //     }
    //     fetchSalesToday()
    // }, []);
    useEffect(() => {
        console.log(results);
        return () => {
            
        };
    }, [results]);
    const isLoading = results?.some(res => res?.isLoading)
    if (isLoading) return <Box><CircularProgress /></Box>

    return (
        <div className='w-full h-auto flex flex-col gap-5 md:ml-6 my-8'>
            <Header title={"Dashboard "} icon={<BiAnalyse /> } />
            {/* <h2>Dashboard</h2> */}
            <div className='flex flex-row md:flex-nowrap sm:flex-wrap flex-wrap justify-start items-end w-full
            gap-4'>
                <Box
                    sx={{
                    bgcolor: "#fff", p: 2, display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', gap: '10px',
                    width: "auto",  textAlign: 'start'
                }}
                >
                    <div className='w-full h-auto text-start'>
                        <Typography sx={{ fontSize: '1.3rem', fontWeight: 'semibold' }}>
                            Products Details
                        </Typography>
                    </div>
                    <QuantityCard header={"Count of all products"}
                        quantityText={results?.[1]?.data?.productsCount}
                        linkTo={'/products'}
                    />
                    <QuantityCard header={"Products out of stock"}
                        quantityText={results?.[1]?.data?.outOfStockCount}
                        linkTo={'/products'}
                    />
                </Box>
                <Box
                    sx={{
                    bgcolor: "#fff", p: 2, display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', gap: '20px',
                    width: 'auto', borderRadius: '10px',

                }}>
                    <h3 className='w-full px-1 text-start text-2xl '>Sales Statistics</h3>
                    <SalesCard quantity={results?.[0]?.data?.totalSalesToday} text={'Todays '} />
                    <SalesCard quantity={results?.[0]?.data?.totalYesterday} text={'Yesterday'} />
                    <SalesCard quantity={results?.[0]?.data?.thisWeeksTotal} text={'This Weeks'} />
                    <SalesCard quantity={results?.[0]?.data?.lastWeeksTotal} text={'Last Weeks'} />
                </Box>
            </div>
            <Box
                sx={{
                    height: 'auto', ml: '7px', borderRadius: '6px',
                    width: 'auto'
                }}>
                {isLoading ?
                    <Box py={'20px'} ml='7px' width={'300px'} bgcolor="white">
                        <ContentPasteGo />
                        <h3 className='text-semibold opacity-95 text-lg'>
                            Loading
                        </h3>
                    </Box>
                    : results?.[2]?.data?.sales?.length ?
                        <Box width={'auto'} height={'auto'}>
                            <h3 className='py-1 text-2xl text-start'>Sales Today</h3>
                            <SalesDataGridVir
                                loading={isLoading}
                                data={results?.[2]?.data?.sales}
                            />
                        </Box>
                        : <Box py={'20px'} ml='7px' width={'300px'} bgcolor="white">
                            <ContentPasteGo />
                            <h3 className='text-semibold opacity-95 text-lg'>
                                No Sales Today so far
                            </h3>
                        </Box>}
            </Box>
        </div>
    );
}

export default Dashboard;
