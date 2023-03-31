import React from 'react';
import { TableContainer, Table, TableBody, TableHead, TableCell, TableFooter, Paper, TableRow } from '@mui/material'
import ProductTableRow from './TableRow';
import './table.css'

const ProductTable = ({ products }) => {
    
    
    return (
        <TableContainer component={Paper}
            sx={{
                width: {
                    xs: '100%', md: '90%', xl: '80%', lg: '80%',
                },my: {lg:"20px", xl:"30", md:'30px', sm:'6px'},
                pb: 5, pt: 1, px: 1, overflowX: 'scroll', mb: 4,
                  textAlign:'center'
            }}
        >
            <Table sx={{m:'auto', p:4, py:3}}>
                <TableHead>
                    <TableRow className="font-semibold text-gray-900">
                        <TableCell>Product</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell className='text-xs'>In Stock</TableCell>
                        <TableCell>ProducedAt</TableCell>
                        <TableCell>ExpiredAt</TableCell>
                        <TableCell colSpan={2} >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products?.map((product, index) => (
                            <ProductTableRow key={index} product={product} />
                        ))
                    }
                </TableBody>
                <TableFooter>
                    {/* <span>My Footer</span> */}
                </TableFooter>
            </Table>
          
            </TableContainer>
    );
}

export default ProductTable;
