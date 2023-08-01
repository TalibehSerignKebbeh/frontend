import React from 'react'
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined'
import Minimize from '@mui/icons-material/MinimizeRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export default function ReceiptTable({ selected, handleDecrement, handleIncrement }) {
  return (
    <div>
       
          <Table sx={{
            minWidth: '200px',maxWidth:"600px",
            maxHeight: '500px',overflowY:"auto"

          }}

          >
            <TableHead className='bg-slate-100 dark:bg-gray-800'>
              <TableRow className=''>
                <TableCell className=''>
                  <span className='text-slate-600 dark:text-slate-100'>
                    Name
                  </span>
                </TableCell>
                <TableCell className=''>
                  <span className='text-slate-600 dark:text-slate-100'>
                    Quantity
                  </span>
                </TableCell>
                <TableCell className='' align="center">
                  <span className='text-slate-600 dark:text-slate-100'>
                    Price
                  </span>
                </TableCell>
                <TableCell className='' align="right">
                  <span className='text-slate-700 dark:text-slate-100'>
                    Total
                  </span>
                </TableCell>

                <TableCell className='' align="center"
                  colSpan={2}>
                  <span className='text-slate-700 dark:text-slate-100'>
                    Actions
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selected?.map((value, index) => (
                <TableRow className='bg-slate-50 dark:bg-slate-700'
                  key={index}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className='text-red-500' align="left">

                    <span className='text-slate-600 dark:text-white text-base'>
                      {value?.name}
                    </span>
                  </TableCell>

                 
                  <TableCell className='text-red-500' align="left">
                    <span className='text-slate-600 dark:text-white text-base'>
                      {value?.quantity}
                    </span>
                  </TableCell>
                   <TableCell className='text-red-500' align="left">
                    <span className='text-slate-600 dark:text-white text-base'>
                      {value?.price}
                    </span>
                  </TableCell>
                  <TableCell className='text-red-500' align="right">

                    <span className='text-slate-600 dark:text-white text-base'>
                      {value?.quantity * value?.price}
                    </span>

                  </TableCell>
                  <TableCell className='text-red-500' align="right">
                     <button onClick={e=>handleIncrement(value)}
                     className='text-slate-600 dark:text-slate-100
                    '>
                     <AddCircle />
                </button>
                  

                  </TableCell>
                  <TableCell>
                    <button onClick={e=>handleDecrement(value)}
                    className='text-slate-600 dark:text-slate-100
                    inline-flex items-stretch justify-stretch'>
                      <Minimize
                        sx={{
                          transform: 'scale(2)', margin: 'auto',
                        mt:'-17px'}} />
                </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
             <TableFooter>
              <TableRow
              className='bg-slate-50 dark:bg-slate-700'>
                <TableCell colSpan={3}>
              <span className='text-slate-700 dark:text-slate-100
                  text-base'>
                    Grand Total
                  </span>
            </TableCell>
                <TableCell align='right'>
              <span className='text-slate-700 dark:text-slate-100
                  text-base'>
                    {selected?.reduce((prev, current) =>
                    { return prev + (current?.quantity * current?.price) }, 0)}
                  </span>
            </TableCell>
          </TableRow>
        </TableFooter>

      </Table>
      </div>
        
    )
}
