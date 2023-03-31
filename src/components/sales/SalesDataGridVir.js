import React from 'react';
import Box from '@mui/material/Box'
import  Typography  from '@mui/material/Typography';
import { formatNumber } from '../../other/format';
import MyDataGrid from './MyDataGrid';
const SalesDataGridVir = ({ data, loading, total }) => {

    return (
        <Box
            sx={{
            bgcolor: '#fff',
                // boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
  boxShadow: '2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)',
            
            width: 'auto', height: 'auto'
        }}>
            <Typography sx={{ fontSize: '1.2rem' }}
                className='py-2 px-2 text-start md:px-2'>
                Sales Today
            </Typography>
            <div className='text-start mx-2 my-2'>
                <span className='bg-green-800 text-white rounded-md py-1 px-2 '>
                 {formatNumber(total)}
                </span>
           </div>
        <MyDataGrid data={data} loading={loading} />
        </Box>


    );
}

export default SalesDataGridVir;
