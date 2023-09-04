import React, {  } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpiredTableRow from './TableRow';
import  TableFooter  from '@mui/material/TableFooter';
import Button from '../../Buttons/Button';


const ExpiredTable = ({ expiredProducts, setexpiredProducts }) => {

    return (
        <div>

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
                                Name
                            </span>
                        </TableCell>
                        <TableCell className=''>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                Quantity
                            </span>
                        </TableCell>
                        {/* <TableCell className='' colSpan={2}>
                            <span className={`text-xs text-slate-100
                                 rounded p-3 bg-slate-500
                                `}>
                                Actions
                            </span>
                        </TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expiredProducts?.map((expiredModel, id) => (
                        <ExpiredTableRow data={expiredModel}
                            setexpiredProducts={setexpiredProducts}
                            expiredProducts={expiredProducts}
                        />
                    ))}
                </TableBody>
                <TableFooter >
                    <Button 
                        clickEvent={()=>{setexpiredProducts([])}}
                        classNa={`text-lg bg-red-700
                             
                            px-3 py-2 text-center
                            rounded-md text-white
                            justify-self-end
                            self-end mr-[156px]
                            my-3  mx-6`}
                            text={`Clear`}
                    />
                </TableFooter>
            </Table>

            </TableContainer>
        </div>
            
    );
}

export default ExpiredTable;
