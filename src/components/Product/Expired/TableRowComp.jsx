import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DeleteOutline } from '@mui/icons-material';
import { queryInstance } from '../../../api';
import useAuth from '../../../hooks/useAuth';
import { isStringValidDate } from '../../other/OtherFuctions';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import {message} from 'antd'
import  CircularProgress  from '@mui/material/CircularProgress';

const TableRowComp = ({ obj, socket }) => {
    const { token } = useAuth()
    const [cancelling, setcancelling] = useState(false);
//    console.log(obj);
    const handleDelete = async () => {
        console.log(`clicked button`);
        if (obj?.cancelled) {
            return;
        }
        setcancelling(true)
        await queryInstance.delete(`/expires/${obj?._id}`,
            { params:{date: new Date()},
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
                const msg = res?.data?.message;
                message.success({
                    content: <div className='md:w-96 sm:w-96 w-[180px]'>
                       <p>{msg}</p>
                    </div>,
                    duration: 2,
                    
                })
                socket.emit('notify_update_product')
            })
        .catch((error) => {
            console.log(error);
                let msg = error?.response?.data?.message;
            if (error?.status === 500) {
                    msg=`internal server ocurred`
                }
            message.error({
                    content: <div className='md:w-96 sm:w-96 w-[180px]'>
                       <p>{msg}</p>
                    </div>,
                    duration: 2,
                    
                })
        }).finally(()=>setcancelling(false))
    }
    return (
        <TableRow className='bg-slate-50 dark:bg-slate-700'>
            <TableCell>
                <span className='text-xs text-slate-600
                 dark:text-white '>
                {obj?.product?.name}
                </span>

</TableCell>
            <TableCell>


                <span className='text-xs text-slate-600
                 dark:text-white '>
                {obj?.quantity}
                </span></TableCell>
            <TableCell>
                <span className='text-xs text-slate-600
                 dark:text-white '>
                {obj?.type}
                </span>
            </TableCell>
             <TableCell>
                <span className='text-xs text-slate-600
                 dark:text-white '>
                {obj.user?.firstName + " " + obj?.user?.lastName}
                </span>
                </TableCell>
            <TableCell>
                <span className='text-xs text-slate-600
                 dark:text-white '>
                    {isStringValidDate(obj?.date) ?
                format(parseISO(obj?.date), 'dd/MM/YYY HH:MM'): 'invalid date'}
                </span>

            </TableCell>
             <TableCell>
                <span className='text-xs text-slate-600
                 dark:text-white '>
                {obj?.cancelled?.toString()}
                </span>
             </TableCell>
           
            <TableCell>
                <button
                    onClick={handleDelete}
                    className='w-10 h-10 rounded-full
                bg-slate-300 hover:bg-slate-400
                text-red-600'>
                   {cancelling? <CircularProgress /> : <DeleteOutline />}
                </button>
            </TableCell>
            {/* <TableCell></TableCell> */}
        </TableRow>
    );
}

export default TableRowComp;
