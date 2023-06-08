import React from 'react';
import QuantityCard from '../Dashboard/card/QuantityCard';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ProductsStatsTable from './ProductsStatsTable';

const DashboardProductStats = ({productsStatesQuery}) => {
    // const { productsStatesQuery } = props;
    const { data } = productsStatesQuery;
    console.log(data);

    return (
        <Box className={`bg-white dark:bg-slate-700`}
                    sx={{
                p: 3, display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', gap: '1rem',columnGap:'1rem', borderRadius:'4px',
                width: "100%", textAlign: 'start',
                }}
                >
            <div className='w-full h-auto text-start font-light
                    text-gray-700 dark:text-white'>
                        <Typography sx={{ fontSize: '1.3rem', }}>
                            Products Details
                        </Typography>
            </div>
            <div className='flex gap-2 '>

                    <QuantityCard header={"Total products"}
                        quantityText={data?.productsCount}
                        linkTo={'/products'}
                    />
                    <QuantityCard header={"#out of stock"}
                        quantityText={data?.outOfStockCount}
                        linkTo={'/products'}
                    />
            </div>
            {/* <div className='w-auto h-auto'>
                <h3 className='text-lg text-slate-700
                dark:text-white px-2 mt-6 font-normal'
                >
                    Top Selling products last seven days
                </h3>
                <ProductsStatsTable data={data?.topSellingProductByQuantity} />
            </div> */}
                </Box>
    );
}

export default DashboardProductStats;
