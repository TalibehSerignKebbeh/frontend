import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import  DeleteOutline  from '@mui/icons-material/DeleteOutline';

                
const ExpiredTableRow = ({ data, expiredProducts, setexpiredProducts }) => {

    const handleChange = (e) => {
        const { target: { value } } = e;
        if (isNaN(value) || Number(value) <= 0) {
            return 
        }
        const update =  Number(value)
        setexpiredProducts(expiredProducts?.map((obj) => (
            (obj?._id === data?._id) ?
                { ...obj, quantity: update }
                : obj
        )))
    }

    const handleRemove = () => {
        setexpiredProducts(expiredProducts?.filter((obj)=>obj._id !== data?._id))
    }
    return (
        <TableRow>
            <TableCell className='' align="left">
                <span className='text-xs text-slate-600
                 dark:text-white '>
                    {data?.name}
                </span>
            </TableCell>
            <TableCell className='flex flex-col gap-1' align="left"
            >
                <span className='text-xs text-slate-600
                 dark:text-white '>
                    {data?.quantity}
                </span>
                
            </TableCell>
            <TableCell>
                <input type="text" name="quantity" id="quantity" 
                        className='p-[3px] w-16 h-6
                        border border-gray-400 dark:border-gray-100'
                    value={data?.quantity}
                    onChange={handleChange}
                />
            </TableCell>
            {/* <TableCell>
                <button className='text-red-800
                cursor-pointer p-2'
                    onClick={handleRemove}
                >

                    <DeleteOutline sx={{
                        transform: 'scale(1.4)',
                    cursor:'pointer'}} />
                </button>
            </TableCell> */}
        </TableRow>
    );
}

export default ExpiredTableRow;
