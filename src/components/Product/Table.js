import React, { useState } from 'react';
import { TableContainer, Table, TableBody, TableHead, TableCell, TableFooter, Paper, TableRow } from '@mui/material'
import ProductTableRow from './TableRow';
// const useStyles = makeStyles((theme) => ({
//     main: {
//         padding: theme.spacing(8, 0, 6)
//     },
//     tableContainer: {
//         padding: theme.spacing(8, 6, 6),
//         backgroundColor: 'red',
//     }
// }))

const ProductTable = ({ products }) => {
    
    // const [sizeOfPage, setsizeOfPage] = useState(6);
    // const [totalProducts, settotalProducts] = useState(90);
    // const [pagesOnView, setpagesOnView] = useState(9);
    // const totalPages = Math.ceil(totalProducts / sizeOfPage)
    // const [currentPage, setcurrentPage] = useState(12);
    // const [rightOffsetPosition, setrightOffsetPosition] = useState(totalPages - 2);
    // const [leftOffsetPosition, setleftOffsetPosition] = useState(currentPage - 2);

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
                        <TableCell className='text-sm'>In Stock</TableCell>
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
            {/* <div className='py-4 flex flex-row mx-auto justify-center'>
                {totalPages <= pagesOnView ?
                    [...Array(totalPages)]?.map((n, i) => (
                        <button
                            onClick={() => setcurrentPage(i + 1)}
                            className={`${currentPage === (i + 1) ?
                                'text-red-400' : ''} mx-1`} key={i}>
                            {i + 1}
                        </button>
                    )) :
                    <>
                        {currentPage > 3 ?
                            <>
                                <button
                                    onClick={() => setcurrentPage(1)}
                                    className={`${currentPage === (1) ?
                                        'text-red-400' : ''} mx-1`}>
                                    {1}
                                </button>
                                <p>....</p>
                                {leftArray?.map((n, i) => (
                                    <button
                                        onClick={() => setcurrentPage(leftOffsetPosition - i )}
                                        className={`${currentPage === (leftOffsetPosition + i) ?
                                            'text-red-400' : ''} mx-1`} key={i}>
                                        {leftOffsetPosition + i}
                                    </button>
                                ))}
                                <p>....</p>
                               
                            </>
                            :
                            <>
                                {

                                }
                            </>
                        }
                    </>

                }

            </div> */}
            </TableContainer>
    );
}

export default ProductTable;
