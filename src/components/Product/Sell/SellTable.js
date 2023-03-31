import React, { useEffect, useState } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';
import './style.css'
const SellTable = ({ products, setproducts,  }) => {
  const [total, settotal] = useState(0);
    const handleCancell = (product) => {
        // console.log(product);
        const newProducts = products?.filter(prod => prod?.productId !== product.productId)
        setproducts(newProducts)
    }
    useEffect(() => {
        settotal(0)
        let newTotal = products?.reduce((total, product) => total + product?.total, 0)       
        settotal(newTotal)
    }, [products]);
    
    return (
        <TableContainer component={Paper} 
        sx={{maxWidth: {xl:'500px',lg:'500px',  md:'400px', sm:'500px', xs:'500px'},
            //  float:'right',mr:{lg:2,xl:3,md:2,sm:0,xs:0},
                overflowY: 'scroll', maxHeight: '300px', mt: '2px', p: 1, pb: 2,
                scrollBehavior: 'smooth', scrollbarWidth: 'thin',
                    bgcolor: '#fff', boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
            }}>
                <Table stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize:'.7rem'}}>Name</TableCell>
                            <TableCell sx={{fontSize:'.7rem'}}>#Qty</TableCell>
                            <TableCell sx={{fontSize:'.7rem'}}>Price</TableCell>
                            <TableCell sx={{fontSize:'.7rem'}}>Total</TableCell>
                            <TableCell sx={{fontSize:'.7rem'}}>Cancell</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.length ? (
                            products?.map((prod, id) => (

                                <TableRow key={id}>
                                    <TableCell sx={{fontSize:'.8rem'}}>{prod?.name}</TableCell>
                                    <TableCell sx={{fontSize:'.8rem'}}>{prod?.quantity}</TableCell>
                                    <TableCell sx={{fontSize:'.8rem'}}>{prod?.price}</TableCell>
                                    <TableCell sx={{fontSize:'.8rem'}}>{prod?.total}</TableCell>
                                    <TableCell sx={{fontSize:'.8rem'}}>
                                        <IconButton
                                            onClick={() => handleCancell(prod)}
                                        sx={{":hover": {color: 'red'}}}>
                                            <CancelOutlined />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            ))
                        )
                        : null}
                    <TableRow>
                        <TableCell align='right' colSpan={2}
                            sx={{fontSize:'.7rem'}}
                        >Total:</TableCell>
                        <TableCell colSpan={2} sx={{ fontSize: '.7rem' }}
                        >D{' '+total }</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    );
}

export default SellTable;
