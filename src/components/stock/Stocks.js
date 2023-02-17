import React, { useEffect, useState } from 'react';
import { queryInstance } from '../../api';
import {
    Paper, TableContainer, Table, TableBody,
    TableCell, TableRow, TableHead, TableFooter,
    Button,
    Pagination,
    Select,
    MenuItem
} from '@mui/material';
import { Stack } from '@mui/system';
import './index.css'
import Header from '../other/Header';
import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from '../../api/index'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Store } from '@mui/icons-material';

const StocksPage = () => {
    const [stocksData, setstocksData] = useState([]);
    const [pageSize, setpageSize] = useState(5);
    const [page, setpage] = useState(1);
    const [numberOfPages, setnumberOfPages] = useState(1);

    const stockResults = useQuery({
        queryKey: ['stocks'],
        queryFn:()=>fetchStocks()
    })
    useEffect(() => {
        const fetchStocksData = async () => {
             await queryInstance.get(`/stocks?page=${page-1}&&pageSize=${pageSize}`)
                .then(res => {
                    console.log(res);
                    setstocksData(res?.data?.stocks)
                    setnumberOfPages(res?.data?.totalPages)
                })
                .catch(err => {
                    console.log(err);
                    console.log(err?.status);
                    console.log(err?.response?.status);
                })


        }
        fetchStocksData()
        return () => {

        };
    }, [pageSize, page]);
 
    return (
        <div className='w-full h-auto text-start'>
            <Header title={"Manage Stocks"} icon={<Store sx={{scale:2}}/>}  />
            <TableContainer component={Paper}
                sx={{
                    width: {
                        sx: '100%', md: '75%', xl: '60%', lg: '65%',
                    }, my: 2, mx: {md:'14px', sm:'3px'},  px: 3, py: 4,   
                    
                }}
            >
                
                <Table sx={{position: 'relative'}}>
                    <TableHead sx={{position: ''}}>
                        <TableRow className="font-semibold bg-white shadow-sm shadow-white">
                            <TableCell>Name</TableCell>
                            <TableCell>#Products</TableCell>
                            <TableCell>#Sales</TableCell>
                            {/* <TableCell>Price</TableCell> */}
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
                                    {/* <TableCell className='w-28 text-gray-800' >{'D' + stock?.costPrice}</TableCell> */}
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
                                                // LinkComponent={'a'} href={`/stocks/${stock?._id}`}
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
            </TableContainer>


        </div>
    );
}



export default StocksPage;
