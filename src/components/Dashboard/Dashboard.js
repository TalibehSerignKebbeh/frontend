import  Box  from '@mui/system/Box';
import React, { useEffect, useState } from 'react';
import {  fetchProductsStats, fetchSalesStatistic, fetchSalesStats, fetchSalesToday } from '../../api';
import  {useQueries}  from '@tanstack/react-query';
import SalesDataGridVir from '../sales/SalesDataGridVir';
import Header from '../other/Header';
import DashboardRounded  from '@mui/icons-material/DashboardRounded';
import DashboardProductStats from '../Product/DashboardProductStats';
import DashBoardSalesStats from '../sales/DashBoardSalesStats';
import DateReportComponent from '../Report/DateReportComponent';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import SpinnerLoader from '../Loaders/SpinnerLoader';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
    const {token} = useAuth()
    const [errorMessage, seterrorMessage] = useState('');
    const { "0": salesStatsQuery, "1": productsStatesQuery,
    "2":salesTodayQuery, "3":dayStatsQuery } = useQueries({
        queries: [
            {
                queryKey: ['salesStats'],
                queryFn: () => fetchSalesStats({token}),

            }, {
                queryKey: ['productsStats'],
                queryFn: () => fetchProductsStats({token})
            },
            {
                queryKey: ['todaysSales'],
                queryFn: () => fetchSalesToday({token})
            },
            {
                queryKey: ['salesstatistics'],
                queryFn: () => fetchSalesStatistic({token})
            }
        ],
    })
    useEffect(() => {
        // console.log(salesStatsQuery?.data);
        console.log(salesTodayQuery?.data);
            // console.log(salesStatsQuery);

        if (salesStatsQuery?.isError) {
            seterrorMessage(GetError(salesStatsQuery?.error))
        }
        if (salesStatsQuery?.failureReason) {
      seterrorMessage(GetError(salesStatsQuery?.error))
    }
           

       }, [dayStatsQuery.data, salesStatsQuery, salesStatsQuery?.data, salesStatsQuery?.isSuccess, salesTodayQuery]);
    
        const isLoading = salesStatsQuery.isLoading && productsStatesQuery.isLoading && salesTodayQuery.isLoading;
    if (isLoading) return (
        <SpinnerLoader />)

    return (
        <Box sx={{width:'100vw', mx: 2, display: 'flex', flexDirection:'column', rowGap:3, mb:10}}
            // className='w-full h-auto flex flex-col gap-5 md:mx-6 my-2 mb-9'
        >
            {errorMessage?.length ? <ErrorMessage 
                error={errorMessage}
                handleReset={()=>seterrorMessage('')}
            />:null}
            <Header title={"Welcome, Your Dashboard "}
                icon={<DashboardRounded sx={{transform:'scale(1.5)', mb:1, zIndex:0 }} className='' />} 
            />
            {/* <div className='flex flex-row content-center justify-start items-baseline w-full mx-2'>
                <div className='beatiful-shadow md:w-72 w-64 flex flex-col items-start bg-white p-1 rounded-lg '>
                    <div className='' >
                        <ReviewsOutlined sx={{width:'65px', height:'56px'}}/>
                    </div>
                    <div className='flex flex-row w-full items-center justify-between text-start'>
                        <div className='p-2 rounded-md'>
                            <h2>Amount</h2>
                             <h3>D234000</h3> 
                        </div>
                        <div className='p-2'>
                            <h2>Profit</h2>
                             <h3>D120000</h3> 
                        </div>

                    </div>

                </div>

            </div> */}
            <div className='flex flex-row md:flex-nowrap sm:flex-wrap flex-wrap justify-start items-end w-full
               gap-1'>
                 <DashBoardSalesStats salesStatsQuery={salesStatsQuery} />
                <DashboardProductStats
                    productsStatesQuery={productsStatesQuery} 
                />
               
            </div>
            <SalesDataGridVir data={salesTodayQuery?.data?.sales}
                loading={salesTodayQuery?.isLoading}
                total={salesTodayQuery?.data?.money}
            />
            <DateReportComponent />
        </Box>
    );
}

export default Dashboard;
