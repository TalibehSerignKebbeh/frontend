import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

export default function SaleTable({ data }) {

    const FormatDate = (date) => {
        return isValid(parseISO(date)) ?
            format(parseISO(date), " EEE MMM dd yyyy, HH:mm b")
            : 'invalid date'
    }

    return (
        <div>
            <TableContainer
                component={Paper}
                sx={{overflow:'auto'}}
            >
                <Table sx={{ minWidth: 650, minHeight:'300px', maxHeight:'500px' }}
                    
                >
                    <TableHead className='bg-slate-50 dark:bg-slate-700'>
                        <TableRow className='bg-slate-50 dark:bg-slate-700'>
                            <TableCell className=''>
                                <span className='text-slate-600 dark:text-slate-100'>
                                    Action
                                </span>
                            </TableCell>
                            <TableCell className=''>
                                <span className='text-slate-600 dark:text-slate-100'>
                                    Date
                                </span>
                            </TableCell>
                            <TableCell className='' align="center">
                                <span className='text-slate-600 dark:text-slate-100'>
                                    Msg
                                </span>
                            </TableCell>
                            <TableCell className='' align="right">
                                <span className='text-slate-700 dark:text-slate-100'>
                                    #Qty</span>
                            </TableCell>
                            <TableCell className='' align="right">
                                <span className='text-slate-700 dark:text-slate-100'>
                                    Price(GMD)
                                </span>
                            </TableCell>
                            <TableCell className='' align="right">
                                <span className='text-slate-700 dark:text-slate-100'>
                                    User</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row, index) => (
                            <TableRow className='bg-slate-50 dark:bg-slate-700'
                                key={index}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className='text-red-500' align="left">

                                    <span className='text-slate-600 dark:text-white text-base'>
                                        {row?.action}
                                    </span>
                                </TableCell>
                                <TableCell className='text-red-500' component="th" scope="row">

                                    <span className='text-slate-600 dark:text-white text-base'>
                                        {FormatDate(row?.created_at)}
                                    </span>
                                </TableCell>
                                <TableCell className='text-red-500' align="left">

                                    <span className='text-slate-600 dark:text-white text-base'>
                                        {row?.message}
                                    </span>
                                </TableCell>
                                <TableCell className='text-red-500' align="right">
                                    <span className='text-slate-600 dark:text-white text-base'>
                                        {row?.data?.quantity}
                                    </span>

                                </TableCell>
                                <TableCell className='text-red-500' align="right">

                                    <span className='text-slate-600 dark:text-white text-base'>
                                        {row?.data?.quantity * row?.data?.price}
                                    </span>

                                </TableCell>
                                <TableCell className='text-red-500' align="right">
                                    <span className='text-slate-600 dark:text-white text-base'>
                                        {row?.userId?.firstName + " " +
                                            row?.userId?.lastName}
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
