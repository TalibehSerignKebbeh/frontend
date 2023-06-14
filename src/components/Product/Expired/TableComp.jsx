import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableRowComp from './TableRowComp';
import  TableFooter  from '@mui/material/TableFooter';
import Paginate from '../../Pagination/Paginate';

const TableComp = ({ data, page, setpage,
    pageSize, setPageSize, total,
    hideDelete,socket}) => {
    return (
           <TableContainer>
            <Table
                component={Paper}>
                <TableHead
                    className=''>
                    <TableRow className='bg-slate-50 dark:bg-slate-700
                        border border-gray-600 '>
                        <TableCell className=''>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500`}>
                                Product
                            </span>
                        </TableCell>
                        <TableCell className=''>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                Quantity
                            </span>
                        </TableCell>
                         <TableCell className=''>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                Type
                            </span>
                        </TableCell>
                        <TableCell className=''>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                User
                            </span>
                        </TableCell>
                         <TableCell className=''>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                Date
                            </span>
                        </TableCell>
                         <TableCell className=''>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                Cancelled
                            </span>
                        </TableCell>
                        {(hideDelete===false) ?
                            <TableCell className='' colSpan={2}>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                Actions
                            </span>
                        </TableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((obj, ind) => (
                        <TableRowComp obj={obj} key={ind}
                            socket={socket}
                            hideDelete={hideDelete}
                        />
                    ))}
                </TableBody>
            </Table>
            <TableFooter>
                <Paginate page={page}
                    pageSize={pageSize}
                    setPage={setpage}
                    setPageSize={setPageSize}
                    total={total}
                    options={[5,10,15,20,25,35,50]}
                />
            </TableFooter>
            </TableContainer>
    );
}

export default TableComp;
