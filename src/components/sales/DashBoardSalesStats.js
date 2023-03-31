import React from 'react';
import SalesCard from '../Dashboard/card/SalesCard';
import Box from '@mui/material/Box'

const DashBoardSalesStats = ({ salesStatsQuery }) => {
   
    return (
        <Box
            sx={{
                    bgcolor: "#fff", p: '4px', display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', gap: '12px',
                width: 'auto', borderRadius: '6px',
                //     boxShadow:
                // "0px 1px 1px 0px rgba(0,0,0,0.04), 0px 1px 1px 0px rgba(0,0,0,0.09)",

                }}>
            <h3 className='w-full px-1 text-start text-2xl font-semibold opacity-70 '>
                Sales Statistics</h3>
             <SalesCard stats={salesStatsQuery?.data?.thisWeekStats}
                      text={'This Weeks'}  />
                    <SalesCard stats={salesStatsQuery?.data?.thisMonthStats} text={'This Month'} />
                    <SalesCard stats={salesStatsQuery?.data?.thisYearStats} text={'This Year'} />
                </Box>
    );
}

export default DashBoardSalesStats;
