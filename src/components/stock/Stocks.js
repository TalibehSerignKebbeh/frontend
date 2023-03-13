import React, { useEffect, useState } from 'react';
import { queryInstance } from '../../api';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Stack } from '@mui/system';
import './index.css'
import Header from '../other/Header';
import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from '../../api/index'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Store } from '@mui/icons-material';
import { format } from 'date-fns';

const StocksPage = () => {
    const [stocksData, setstocksData] = useState([]);
    const [pageSize, setpageSize] = useState(5);
    const [page, setpage] = useState(1);
    const [numberOfPages, setnumberOfPages] = useState(1);
   
    const {isLoading, error, data} = useQuery({
        queryKey: ['stocks'],
        queryFn:()=>fetchStocks()
    })
    const columns = [
         { field: 'name', headerName: 'Name', width: 140 },
        { type: 'number', field: 'quantity', headerName: 'Quantity', width: 90, },

       { type: 'number', field: 'productCount', headerName: 'Products', width: 100, },

       {
            field: 'createdDate', headerName: 'AddedAt', width: 120,
            valueGetter: ({ value }) => value ? format(new Date(value), 'do MMM yyyy') : 'missing'
        },
        {
            field: 'lastUpdate', headerName: 'LastUpdated', width: 120,
            valueGetter: ({ value }) => value ? format(new Date(value), 'do MMM yyyy') : 'missing'
        },
    ]
    // useEffect(() => {
    //     const fetchStocksData = async () => {
    //          await queryInstance.get(`/stocks?page=${page-1}&&pageSize=${pageSize}`)
    //             .then(res => {
    //                 console.log(res);
    //                 setstocksData(res?.data?.stocks)
    //                 setnumberOfPages(res?.data?.totalPages)
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 console.log(err?.status);
    //                 console.log(err?.response?.status);
    //             })


    //     }
    //     fetchStocksData()
    //     return () => {

    //     };
    // }, [pageSize, page]);
 
    return (
        <Box sx={{
           mb: 10,ml:1,px:1, display: 'flex',
            flexDirection: 'column', alignItems: 'baseline',
            justifyContent: 'flex-start', width: {xl:'50%', lg:'70%', md:'85%', sm:'95%', xs:'100%'},
            '& .':{}, minHeight:'500px',alignSelf:'baseline', textAlign:'start'
        }}
        >
            <Header title={"Manage Stocks"} icon={<Store sx={{ scale: 2 }} />} />
            
             <DataGrid rows={data?.stocks?.length? data?.stocks : []} columns={columns}
                pageSize={pageSize} page={page}
                onPageChange={newPage => setpage(newPage)}
                loading={isLoading}
                columnBuffer={4}
            columnThreshold={2} 
                // checkboxSelection
                rowsPerPageOptions={[10,20, 30, 50,70, 100]}
                onPageSizeChange={newSize => setpageSize(newSize)}
                components={{
                    Toolbar: GridToolbar,
                    // MoreActionsIcon: GridM
                }}

                localeText={{
                    toolbarDensity: 'Size',
                    toolbarDensityLabel: 'Size',
                    toolbarDensityCompact: 'Small',
                    toolbarDensityStandard: 'Medium',
                    toolbarDensityComfortable: 'Large',
                    // toolbarQuickFilterDeleteIconLabel: ''
                }}

                getRowId={row => row._id}
                onRowDoubleClick={params => {  }}
                sx={{
                    bgcolor: '#fff', boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
                    height: '600px', width: '100%',
                    pt: 1, px: 1, mb: 4
                }}
            />
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


        </Box>
    );
}



export default StocksPage;
