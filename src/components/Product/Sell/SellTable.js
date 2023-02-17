import React from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CancelOutlined } from '@mui/icons-material';

const SellTable = ({ products, setproducts, total }) => {

    const handleCancell = (product) => {
        // console.log(product);
        const newProducts = products?.filter(prod => prod?.productId !== product.productId)
        setproducts(newProducts)
    }
    return (
        <TableContainer component={Paper} 
        sx={{maxWidth: {lg:'500px', xl:'500px', md:'400px', sm:'500px', xs:'500px'},
                overflowY: 'scroll', maxHeight: '300px', mt: '2px', p: 1, pb: 2,
            scrollBehavior:'smooth', scrollbarWidth:'thin'}}>
                <Table stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Cancell</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.length ? (
                            products?.map((prod, id) => (

                                <TableRow key={id}>
                                    <TableCell sx={{fontSize:'.99rem'}}>{prod?.name}</TableCell>
                                    <TableCell sx={{fontSize:'.99rem'}}>{prod?.quantity}</TableCell>
                                    {/* <TableCell sx={{fontSize:'.99rem'}}>{prod?.quantity * prod?.price}</TableCell> */}
                                    <TableCell sx={{fontSize:'.99rem'}}>
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
                        <TableCell align='right' colSpan={3}
                            sx={{fontSize:'1.2rem'}}
                        >Total</TableCell>
                        <TableCell sx={{ fontSize: '1.2rem' }}
                        >D{' '+total }</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    );
}

export default SellTable;
