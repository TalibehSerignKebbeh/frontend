import React from 'react';
import SalesCard from '../Dashboard/card/SalesCard';
import Box from '@mui/material/Box'

const DashBoardSalesStats = ({salesStatsQuery}) => {
    return (
        <Box
                    sx={{
                    bgcolor: "#fff", p: 2, display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', gap: '20px',
                width: 'auto', borderRadius: '10px',
                    boxShadow:
                "0px 1px 1px 0px rgba(0,0,0,0.09), 0px 1px 1px 2px rgba(0,0,0,0.09)",

                }}>
                    <h3 className='w-full px-1 text-start text-2xl '>Sales Statistics</h3>
                    <SalesCard quantity={salesStatsQuery?.data?.totalSalesToday} text={'Todays '} />
                    <SalesCard quantity={salesStatsQuery?.data?.totalYesterday} text={'Yesterday'} />
                    <SalesCard quantity={salesStatsQuery?.data?.thisWeeksTotal} text={'This Weeks'} />
                    <SalesCard quantity={salesStatsQuery?.data?.lastWeeksTotal} text={'Last Weeks'} />
                </Box>
    );
}

export default DashBoardSalesStats;
