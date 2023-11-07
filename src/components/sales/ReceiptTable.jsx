import React from 'react'
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined'
import Minimize from '@mui/icons-material/MinimizeRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useAuth from '../../hooks/useAuth';
import ReceiptRow from './ReceiptRow';



export default function ReceiptTable({ selected,
  setselected,
  handleDecrement
  , handleIncrement }) {
  const { isAdmin } = useAuth()
  
  function handleDateChange(e){
   
  }
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
            {isAdmin? <TableCell className='' align="right">
                  <span className='text-slate-700 dark:text-slate-100'>
                    Date
                  </span>
            </TableCell>
              : null}

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
                <ReceiptRow key={index} value={value}
                  
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  setselected={setselected}
                  selected={selected}
                />
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
