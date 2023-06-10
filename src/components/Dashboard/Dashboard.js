import  Box  from '@mui/system/Box';
import React, { useEffect, useState } from 'react';
import {  fetchProductsStats,  fetchSalesStats } from '../../api';
import  {useQueries}  from '@tanstack/react-query';
// import SalesDataGridVir from '../sales/SalesDataGridVir';
import Header from '../other/Header';
import DashboardRounded  from '@mui/icons-material/DashboardRounded';
import DashboardProductStats from '../Product/DashboardProductStats';
import DashBoardSalesStats from '../sales/DashBoardSalesStats';
import DateReportComponent from '../Report/DateReportComponent';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import useAuth from '../../hooks/useAuth';
// import SalesTodayStats from './TodayStats/SalesTodayStats';
import SkeletonLoaders from '../Loaders/SkelelonLoader';
import IntervalReport from '../Report/IntervalReport';

const Dashboard = ({socket, setactiveNavLink}) => {
    const { token } = useAuth()
    
    const [errorMessage, seterrorMessage] = useState('');
    const { "0": salesStatsQuery, "1": productsStatesQuery,
  } = useQueries({
        queries: [
            {
                queryKey: ['salesStats'],
                queryFn: () => fetchSalesStats({token}),

            }, {
                queryKey: ['productsStats'],
                queryFn: () => fetchProductsStats({token})
            },
            // {
            //     queryKey: ['salesstatistics'],
            //     queryFn: () => fetchSalesStatistic({token})
            // }
        ],
    })
    useEffect(() => {
        setactiveNavLink('dashboard')
        // console.log(salesStatsQuery?.data);
        // console.log(salesTodayQuery?.data);
            // console.log(salesStatsQuery);
    //    console.log(salesStatsQuery?.data);
        if (salesStatsQuery?.isError) {
            seterrorMessage(GetError(salesStatsQuery?.error))
        }
        if (salesStatsQuery?.failureReason) {
      seterrorMessage(GetError(salesStatsQuery?.error))
    }
           

       }, [salesStatsQuery, salesStatsQuery.data, salesStatsQuery.isSuccess, setactiveNavLink]);
    
        const isLoading = salesStatsQuery.isLoading && productsStatesQuery.isLoading;
    if (isLoading) return (
        <SkeletonLoaders />)

    return (
        <Box sx={{width:'100vw', mx: 2, display: 'flex', flexDirection:'column', rowGap:3, mb:10}}
            // className='w-full h-auto flex flex-col gap-5 md:mx-6 my-2 mb-9'
        >
            {errorMessage?.length ? <ErrorMessage 
                error={errorMessage}
                handleReset={()=>seterrorMessage('')}
            />:null}
            <Header title={"Welcome, Your Dashboard "}
                icon={<DashboardRounded
                    sx={{ transform: 'scale(1.5)', mb: 1, zIndex: 0 }}
                    className='text-gray-800 dark:text-white' />} 
            />
         
            <div className='flex flex-col  justify-start 
            items-start w-full
               gap-8 bg-inherit'>
                 <DashBoardSalesStats salesStatsQuery={salesStatsQuery} />
                <DashboardProductStats
                    productsStatesQuery={productsStatesQuery} 
                />
               
            </div>

           {/* <SalesTodayStats /> */}
            <DateReportComponent />
            {/* <IntervalReport /> */}
        </Box>
    );
}

export default Dashboard;
