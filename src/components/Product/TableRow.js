import React from 'react';
import  TableRow from '@mui/material/TableRow'
import  TableCell from '@mui/material/TableCell'
import  Stack from '@mui/material/Stack'
import  Button from '@mui/material/Button'
import  format  from 'date-fns/format'
import './table.css'

const ProductTableRow = ({ product }) => {
    const customTime = '00:00:00.000';
    return (
        <TableRow>
            <TableCell className="w-40">{product?.name }</TableCell>
            <TableCell className="w-40">{product?.category }</TableCell>
            <TableCell className='w-28 ' >{'D' + product?.price}</TableCell>
            
            <TableCell className='w-28 ' align='left'>
                <span className=''>
                   {product?.quantity}
                </span>
            </TableCell>
            <TableCell className='w-28 ' align='left'>
                <span className=''>
                   {product?.quantityInStock}
                </span>
            </TableCell>
            {/* <TableCell className="w-40">{product?.expired?.toString() }</TableCell> */}
            <TableCell className="w-40">
                {product?.producedDate ?
                    format(new Date(`${product?.producedDate?.slice(0, 10)} ${customTime}`), 'do MMM yyyy') : "missing"}
            </TableCell>
            <TableCell className="w-40"
            >
                {product?.expiryDate ?
                    format(new Date(`${product?.expiryDate?.slice(0, 10)} ${customTime}`), 'do MMM yyyy')
                    :
                    "missing"}
            </TableCell>
            <TableCell>
                <Stack direction={'row'}
                spacing={2}>
                <Button size='small' variant='contained'
                        color='success' LinkComponent={'a'}
                        href={`/products/${product?._id}`}
                >Edit</Button>
                <Button size='small' variant='contained'
                        color='success' LinkComponent={'a'}
                        href={`/products/${product?._id}/sales`}
                    >Sales</Button>
                </Stack>
            </TableCell>

        </TableRow>
    );
}

export default ProductTableRow;
