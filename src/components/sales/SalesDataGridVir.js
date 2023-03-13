import React from 'react';
import {
    DataGrid, GridToolbar,
    // gridDateTimeFormatter,
} from '@mui/x-data-grid'
import { salesColumns } from './data';
import Box from '@mui/material/Box'
import { TextField, Typography } from '@mui/material';
const SalesDataGridVir = ({ data, loading }) => {

    return (
        <Box
            sx={{
            bgcolor: '#fff',
            boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
            width: 'auto', height: 'auto'
        }}>
            <Typography sx={{fontSize:'1.2rem'}} className='py-1 text-start p-1 md:px-2'>
                Sales Today
            </Typography>

        <DataGrid columns={salesColumns} autoHeight
            rows={data?.length ? data : []} columnBuffer={4}
            columnThreshold={2} 
            hideFooterPagination={true}
            getRowId={row => row?._id}
            loading={loading}
        components={{
            Toolbar: GridToolbar,
            BaseTextField: TextField,
                    }}
            localeText={{
                        toolbarDensity: 'Size',
                        toolbarDensityLabel: 'Size',
                        toolbarDensityCompact: 'Small',
                        toolbarDensityStandard: "Medium",
                        toolbarDensityComfortable: 'Large',
                        toolbarFiltersTooltipActive: 2,
                    }}
            sx={{ 

                width: {xl:'75%', lg:'80%', md:'95%', sm:'95%', xs:'98%'}, p: 2
            }}
        />
        </Box>


    );
}

export default SalesDataGridVir;
