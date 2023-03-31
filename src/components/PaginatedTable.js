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

            
              {/* <TableContainer
                    component={Paper}
                    sx={{
                        width: {
                            xs: "100%",
                            md: "90%",
                            xl: "80%",
                            lg: "80%",
                        },
                        my: 2,
                        mx: { md: "10px", sm: "3px" },
                        px: 1,
                        py: 1,
                        overflowX: "scroll",
                        mb: 4,
                        textAlign: "center",
                    }}
                >
                    <Table sx={{ m: "auto", p: 1, py: 2 }} stickyHeader>
                        <TableHead>
                            <TableRow className="font-semibold text-gray-900">
                                <TableCell>Name</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Roles</TableCell>
                                <TableCell>Status</TableCell>
                                {isAdmin || isManager ? (
                                    <TableCell align="justify" colSpan={2}>
                                        Actions
                                    </TableCell>
                                ) : null}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {UserFetch?.data?.users?.map((user, id) => (
                                <TableRow key={id}>
                                    <TableCell>
                                        {user?.firstName} {user?.lastName}
                                    </TableCell>
                                    <TableCell>{user?.username}</TableCell>
                                    <TableCell>{user?.roles?.toString()}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`p-1 rounded-md ${user?.active ? "bg-green-400" : "bg-red-400"
                                                }`}
                                        >
                                            {user?.active ? "active" : "inactive"}
                                        </span>
                                    </TableCell>

                                    {isAdmin || isManager ? (
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color={`success`}
                                                sx={{ fontSize: { md: "11px", sm: "7px", xs: "7px" } }}
                                                onClick={() => handleInitialiseEdit(user)}
                                            >
                                                <EditSharp />
                                            </Button>
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                        </TableContainer> */}
            

             {/* <TableContainer component={Paper}
                sx={{
                    width: {
                        sx: '100%', md: '75%', xl: '60%', lg: '65%',
                    }, my: 2,
                    // mx: { md: '14px', sm: '3px' },
                    px: 3, py: 4,   
                    
                }}
            >
                
                <Table stickyHeader  sx={{position: 'relative'}}>
                    <TableHead sx={{position: ''}}>
                        <TableRow className="font-semibold bg-white shadow-sm shadow-white">
                            <TableCell>Name</TableCell>
                            <TableCell>#Products</TableCell>
                            <TableCell>#Sales</TableCell>
                            <TableCell align='center' colSpan={2} >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            stocksData?.map((stock, index) => (
                                <TableRow key={index}>
                                    <TableCell className="w-40 text-gray-800">{stock?.name}</TableCell>
                                    <TableCell className="w-40 text-gray-800">{stock?.productCount}</TableCell>
                                    <TableCell className="w-40 text-gray-800">{stock?.totalSales}</TableCell>
                                    <TableCell className='w-28 text-gray-800' align='center'>
                                        <Stack direction={'row'}
                                            spacing={2}>
                                            <Button size="small" color={"success"}
                                                variant="contained" sx={{ }}
                                                LinkComponent={'a'} href={`/stocks/${stock?._id}/page`}
                                            >
                                                View
                                            </Button>
                                            <Button size="small" color={"warning"}
                                                variant="contained">
                                                Edits
                                            </Button>
                                        </Stack>

                                    </TableCell>

                                </TableRow>

                            ))
                        }
                    </TableBody>
                    <TableFooter sx={{width:'100%'}}>
                        
                    </TableFooter>
           
                </Table>
                <div className='w-auto px-4 my-2 flex items-end'>
                    <Select value={pageSize}
                        label={''}
                        onChange={e => {
                            setpageSize(e.target.value)
                            setpage(1)
                        }}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                    <Pagination page={page} siblingCount={2}
                            boundaryCount={1}
                            count={numberOfPages} onChange={(e, val)=>setpage(val)}
                     />
                </div>
            </TableContainer> */}


        </div>
    );
}

export default PaginatedTable;
