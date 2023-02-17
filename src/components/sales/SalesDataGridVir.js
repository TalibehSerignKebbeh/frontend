import React from 'react';
import {
    DataGrid, GridToolbar,
    // gridDateTimeFormatter,
} from '@mui/x-data-grid'
import { salesColumns } from './data';

const SalesDataGridVir = ({ data, loading }) => {

    return (
        <DataGrid columns={salesColumns} autoHeight
            rows={data?.length ? data : []} columnBuffer={4}
            columnThreshold={2} 
            hideFooterPagination={true}
            getRowId={row => row?._id}
            loading={loading}
        components={{
                        Toolbar: GridToolbar,
                    }}
            localeText={{
                        toolbarDensity: 'Size',
                        toolbarDensityLabel: 'Size',
                        toolbarDensityCompact: 'Small',
                        toolbarDensityStandard: "Medium",
                        toolbarDensityComfortable: 'Large',
                        toolbarFiltersTooltipActive: 2,
                    }}
            sx={{ boxShadow:'2px 3px 4px rgba(0 0 0 0.4)',bgcolor:'white',
                width: {xl:'75%', lg:'80%', md:'95%', sm:'95%', xs:'98%'}, p: 2
            }}
        />


    );
}

export default SalesDataGridVir;
