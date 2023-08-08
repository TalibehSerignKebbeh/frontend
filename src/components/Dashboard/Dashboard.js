import  Box  from '@mui/system/Box';
import React, { useEffect, useState } from 'react';
import {    fetchSalesStats, queryInstance } from '../../api';
import  {useQueries}  from '@tanstack/react-query';
import Header from '../other/Header';
import DashboardRounded  from '@mui/icons-material/DashboardRounded';
// import DashboardProductStats from '../Product/DashboardProductStats';
import DashBoardSalesStats from '../sales/DashBoardSalesStats';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import SkeletonLoaders from '../Loaders/SkelelonLoader';
import SaleReport from '../Report/SaleReport';
import GeneralStats from './card/GeneralStats';
// import MoneyStats from './MoneyStats';
// import AdUnitsOutlined from '@mui/icons-material/AccountTreeOutlined'
// import { PoolRounded } from '@mui/icons-material';


const Dashboard = ({socket}) => {
    const { token } = useAuth()
    
    const [errorMessage, seterrorMessage] = useState('');

    const fetches = useQueries({
        queries: [
            {
                queryKey: ['salesStats'],
                queryFn: () => fetchSalesStats({token}),

            },
            {
                queryKey: ['generalStats'],
                queryFn:  () =>  queryInstance.get(`/dashboardstatistics`,
                    { headers:{Authorization:`Bearer ${token}`} })
                    .then(res =>
                    { return res?.data })
                .catch(err=>{return err})
            }
        ],
    })
    useEffect(() => {
        if (fetches[0]?.isError) {
            seterrorMessage(GetError(fetches[0]?.error))
        }
        if (fetches[0]?.failureReason) {
      seterrorMessage(GetError(fetches[0]?.failureReason))
    }
    }, [fetches]);
    
  
    const isLoading = fetches[0].isLoading;
    if (isLoading) return (
        <SkeletonLoaders />)

    return (
        <Box sx={{width:'100vw', mx: 2, display: 'flex', flexDirection:'column', rowGap:3, mb:10}}
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
                
                {/* <MoneyStats data={fetches[0]?.data} /> */}
                <GeneralStats data={fetches[0]?.data} /> 
                 <DashBoardSalesStats salesStatsQuery={fetches[0]} />
            </div>
            <SaleReport />
        </Box>
    );
}

export default Dashboard;
