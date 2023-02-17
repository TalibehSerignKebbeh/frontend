import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridActionsCellItem, gridDateFormatter } from '@mui/x-data-grid'
import { Delete, Edit } from '@mui/icons-material';
import { gridClasses } from '@mui/x-data-grid';
import { sales } from '../data/SalesData';
import { Button, IconButton } from '@mui/material';
import { format } from 'date-fns';

const PaginatedTable = () => {
    const [rowId, setrowId] = useState('');
    const [pageSize, setpageSize] = useState(5);
    const [page, setpage] = useState(0);
    const [saleToEdit, setsaleToEdit] = useState(null);
    const customTime = '00:00:00.000';

    const columns = useMemo(() => [

        { field: 'product', headerName: 'Product', minWidth: 110 },
        {
            type: 'number', field: 'price', headerName: 'Price', width: 120,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                }
                const valueFormatted = Number(params.value).toLocaleString();
                return `D ${valueFormatted}`;
            },
        },
        {
            type: 'dateTime', field: 'saleDate', headerName: 'Date', width: 260,
             valueGetter: ({ value }) => value && format(new Date(value), 'do MMM yyyy'),
        },

        {
            field: 'seller', headerName: 'Seller', minWidth: 150,
            valueFormatter: (params) => {
                return params?.value?.firstName + " " + params?.value?.lastName
            }
        },

        {
            field: 'actions', type: 'actions', getActions: (params) => [
                <GridActionsCellItem icon={<IconButton LinkComponent={'a'}
                href={`/products/${params.id}`}><Delete /></IconButton>}
                    label='delete' 
                    />,
                <GridActionsCellItem icon={<Button size='small'><Edit /></Button> }
                    label='edit' LinkComponent={'a'}
                    onClick={()=>{}}
                    />
            ],
            width: 150,
           
        },

    ], [])

    useEffect(() => {

    }, [page])
    return (
        <div className='w-auto h-auto'>
            <DataGrid rows={sales} checkboxSelection
                // selectionModel={'grid'}
                columns={columns} getRowId={row => row?._id}
                onRowClick={(row) => { console.log(row); setsaleToEdit(row.row) }}
                pageSize={pageSize} paginationMode={'client'}
                onPageChange={(page) => setpage(page)}
                onPageSizeChange={newSize => setpageSize(newSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                // getRowClassName={params => params?.}
                // isRowSelectable={params => params?.row?.saleDate < new Date()}
                // isCellEditable={params=> params?.}
                getRowSpacing={params => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    minHeight: '500px',
                    width: { md: '600px', sm: '100%' },
                    [`& .${gridClasses.row}`]: {
                        fontSize: '.9rem',

                    },
                    [`& .${gridClasses.columnHeader}`]: {
                        fontSize: '1.1rem',
                    },
                    [`& .${gridClasses.actionsCell}`]: {
                        fontSize: '1.1rem',
                    }
                }}

            />

        </div>
    );
}

export default PaginatedTable;
