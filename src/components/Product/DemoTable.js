import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../../api';
import { TableContainer, Table, TableBody, TableHead, TableCell, TableFooter, Paper, TableRow, Typography, Button } from '@mui/material'
import { Box } from '@mui/system';
import SellProduct from '../SellProduct';

const DemoTable = () => {
    const [loading, setloading] = useState(false);
    const [products, setproducts] = useState([]);
    const [saledProducts, setsaledProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setloading(true)
            await axios.get(`${serverUrl}/product/all`)
                .then(res => {
                    console.log(res?.data?.products);
                    setproducts(res?.data?.products)
                    setsaledProducts(res?.data?.saledProducts)
                })
                .catch(err => {
                    console.log(err);
                }).finally(() => { setloading(false) })
        }
        fetchProducts()
    }, [])
    if (loading) return <p>Loading ....</p>
    return (
        <div className='w-full h-auto mt-1'>
            <Box
                sx={{
                    float: {
                        md: 'right'
                    },
                    width: {
                        sx: '100%', md: '25%', xl: '40%', lg: '35%',
                    },
                }}
            >
                <Box sx={{ ml: { md: "6px", sm: 0 } }}
                    className="bg-white shadow shadow-gray-500 p-2 rounded-md">

                    <Typography sx={{ textAlign: 'left', p: 2 }}>
                        Sale Statistcis
                    </Typography>
                    <Box display={'flex'} justifyContent="normal" columnGap={4}>
                        <Box padding={4} className="shadow shadow-slate-100">
                            <Typography>Total Sale </Typography>
                            <Typography>{saledProducts?.length}</Typography>
                        </Box>
                        <Box padding={4} className="shadow-xl shadow-slate-100">
                            <Typography>Top Selling </Typography>
                            <Typography>{saledProducts?.length}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper}
                sx={{
                    width: {
                        sx: '100%', md: '75%', xl: '60%', lg: '65%',
                    },
                }}
            >
                <Table >
                    <TableHead>
                        <TableRow className="font-semibold bg-gray-50">
                            <TableCell>Product</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>isSoled</TableCell>
                            <TableCell align='center' colSpan={2} >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products?.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell className="w-40">{product?._id?.name}</TableCell>
                                    <TableCell className="w-40">{product?._id?.category}</TableCell>
                                    <TableCell className='w-28 ' >{'D' + product?._id?.price}</TableCell>
                                    <TableCell className='w-28 ' align='left'>
                                        <span className=''>
                                            {product?.count}
                                        </span>
                                    </TableCell>
                                    <TableCell className="w-40">
                                        {product?._id?.isSoled ?
                                            <span className='bg-green-300 py-1 px-2 rounded-lg text-white'>soled</span> :
                                            <span className='py-1 px-2'>available</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='text' size='small'
                                        > edit</Button>                                     </TableCell>
                                    <TableCell>
                                        <Button variant='text'
                                        size='small'>delete</Button>
                                    </TableCell>
                                </TableRow>

                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        {/* <span>My Footer</span> */}
                    </TableFooter>
                </Table>

            </TableContainer>
            {/* <div className='w-full mx-4'>
                {
                    saledProducts?.map((sale, index) => (
                        <div className='shadow shadow-gray-700 py-3 px-2 flex flex-row gap-2'
                            key={index}>
                           <span>{sale?._id?.name}</span>
                           <span>{sale?._id?.category}</span>
                           <span>{sale?._id?.price}</span>
                           <span>{sale?.count}</span>
                        </div>
                    ))
                }

            </div> */}
        </div>
    );
}

export default DemoTable;
