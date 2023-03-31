import React from 'react';
import QuantityCard from '../Dashboard/card/QuantityCard';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const DashboardProductStats = (props) => {
    const { productsStatesQuery} = props;
    return (
        <Box
                    sx={{
                    bgcolor: "#fff", p: 1, display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', gap: '.8rem',columnGap:'.6rem', borderRadius:'4px',
                width: "auto", textAlign: 'start',
            //   boxShadow:
            //     "0px 1px 1px 0px rgba(0,0,0,0.09), 0px 1px 1px 0px rgba(0,0,0,0.09)",
       
                }}
                >
                    <div className='w-full h-auto text-start'>
                        <Typography sx={{ fontSize: '1.3rem', fontWeight: 'semibold' }}>
                            Products Details
                        </Typography>
                    </div>
                    <QuantityCard header={"Total products"}
                        quantityText={productsStatesQuery.data?.productsCount}
                        linkTo={'/products'}
                    />
                    <QuantityCard header={"#out of stock"}
                        quantityText={productsStatesQuery.data?.outOfStockCount}
                        linkTo={'/products'}
                    />
                </Box>
    );
}

export default DashboardProductStats;
