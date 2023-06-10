import React from 'react';
import SalesCard from '../Dashboard/card/SalesCard';
import Box from '@mui/material/Box'
import DailyChart from '../Dashboard/chats/DailyChart';

const DashBoardSalesStats = ({ salesStatsQuery }) => {
    console.log(salesStatsQuery?.data);
    return (
        <Box className={`w-full bg-white dark:bg-slate-700
        shadow shadow-slate-200 dark:shadow-slate-500
        drop-shadow-lg
        md:px-8 sm:p-4 px-1`}
            sx={{
                display: 'flex',
                flexDirection: 'row', flexWrap: 'wrap', gap: '12px',
                width: 'auto', borderRadius: '6px',
            }}>
            <h3 className='w-full px-1 text-start text-2xl 
            font-normal text-gray-700 dark:text-white '>
                Sales Statistics</h3>
            <SalesCard stats={salesStatsQuery?.data?.thisWeekStats}
                text={'This Weeks'} />
            <SalesCard stats={salesStatsQuery?.data?.thisMonthStats}
                text={'This Month'} />
            <SalesCard stats={salesStatsQuery?.data?.thisYearStats}
                text={'This Year'} />
            <div className='h-auto overflow-auto my-7 max-w-full'>
                <h2 className='text-center text-lg font-normal
                text-slate-700 dark:text-slate-100
                bg-slate-100'
                >This Weeks Daily Sales Analysis</h2>
                <DailyChart chartData={salesStatsQuery?.data?.thisWeekStats} />
            </div>
        </Box>
    );
}

export default DashBoardSalesStats;
