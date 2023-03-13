import  Box  from '@mui/system/Box';
import React from 'react';
import {  fetchProductsStats, fetchSalesStats, fetchSalesToday } from '../../api';
import  {useQueries}  from '@tanstack/react-query';
import CircularProgress  from '@mui/material/CircularProgress';
import SalesDataGridVir from '../sales/SalesDataGridVir';
import Header from '../other/Header';
import DashboardRounded  from '@mui/icons-material/DashboardRounded';
import DashboardProductStats from '../Product/DashboardProductStats';
import DashBoardSalesStats from '../sales/DashBoardSalesStats';

const Dashboard = () => {
    const { "0": salesStatsQuery, "1": productsStatesQuery,
    "2":salesTodayQuery } = useQueries({
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
        ],
    })
    //    useEffect(() => {
    //     console.log(salesTodayQuery);
    //     return () => {
            
    //     };
    // }, [salesTodayQuery]);
        const isLoading = salesStatsQuery.isLoading && productsStatesQuery.isLoading && salesTodayQuery.isLoading;
    if (isLoading) return <Box><CircularProgress /></Box>

    return (
        <Box sx={{ mx: 2, display: 'flex', flexDirection:'column', rowGap:3, mb:10}}
            // className='w-full h-auto flex flex-col gap-5 md:mx-6 my-2 mb-9'
        >
            <Header title={"Welcome, Your Dashboard "}
                icon={<DashboardRounded sx={{transform:'scale(1.5)', mb:1, zIndex:0 }} className='' />} 
                />
            <div className='flex flex-row md:flex-nowrap sm:flex-wrap flex-wrap justify-start items-end w-full
               gap-4'>
                <DashboardProductStats
                    productsStatesQuery={productsStatesQuery} 
                />
                <DashBoardSalesStats salesStatsQuery={salesStatsQuery} />
            </div>
            <SalesDataGridVir data={salesTodayQuery?.data?.sales}
                loading={salesTodayQuery?.isLoading}
            />
        </Box>
    );
}

export default Dashboard;
