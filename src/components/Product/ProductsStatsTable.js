import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ProductsStatsTable({ data }) {

  

    return (
        <div className='w-auto overflow-y-auto h-auto'>
            <TableContainer
                component={Paper}
                sx={{overflow:'auto'}}
            >
                <Table sx={{ width:'370px', }}
                    className='w-fit md:p-2 p-1  shadow-xl'
                    stickyHeader
                >
                    <TableHead 
                        className=''>
                        <TableRow className='bg-slate-50 dark:bg-slate-700
                        border border-gray-600 '>
                            <TableCell className=''>
                                <span className='text-xs    text-slate-100
                                bg-slate-500 rounded p-3'>
                                    Name
                                </span>
                            </TableCell>
                            <TableCell className=''>
                                <span className='text-xs    text-slate-100
                                bg-slate-500 rounded p-3'>
                                    Quantity
                                </span>
                            </TableCell>
                            <TableCell className=''>
                                <span className='text-xs text-slate-100 p-2 rounded bg-teal-400'>
                                    Profit
                                </span>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row, index) => (
                            <TableRow className='bg-slate-50 dark:bg-slate-700'
                                key={index}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className='' align="left">
                                    <span className='text-xs text-slate-600 dark:text-white '>
                                        {row?.name}
                                    </span>
                                </TableCell>
                                <TableCell className='' align="left">
                                    <span className='text-xs text-slate-600 dark:text-white '>
                                        {row?.quantity}
                                    </span>
                                </TableCell>
                                <TableCell className='' align="left">
                                    <span className='text-xs text-slate-600 dark:text-white '>
                                        {row?.profit}
                                    </span>
                                </TableCell>
                              
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    )
}
