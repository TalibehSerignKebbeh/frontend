import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined'
import Minimize from '@mui/icons-material/MinimizeRounded';
import React from 'react'
import useAuth from '../../hooks/useAuth';
import format from 'date-fns/format';

export default function ReceiptRow({ value, handleDecrement,
  handleIncrement,
  selected, setselected }) {
  const { isAdmin } = useAuth()

  const maxDate = format(new Date(), 'dd/mm/yy HH:MM')

  function handleDateChange(e) {
    const dateTime = e.target.value;
    // console.log(dateTime);
    // value = { ...value, saleDate: dateTime }
    // setselected([...selected])
    setselected(selected?.map(
      (prod) =>
      (prod?._id === value?._id ?
        { ...prod, saleDate: dateTime } : prod)))

  }
  return (
    <TableRow className='bg-slate-50 dark:bg-slate-700'

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
      <TableCell>
        <input className='w-auto p-1 py-[5px] rounded
                     bg-slate-200 dark:bg-gray-500'
          type='datetime-local'
          max={maxDate}
          value={value?.saleDate || ''}
          onChange={handleDateChange}
        />
      </TableCell>
      <TableCell className='text-red-500' align="right">
        <button onClick={e => handleIncrement(value)}
          className='text-slate-600 dark:text-slate-100
                    '>
          <AddCircle />
        </button>


      </TableCell>
      <TableCell>
        <button onClick={e => handleDecrement(value)}
          className='text-slate-600 dark:text-slate-100
                    inline-flex items-stretch justify-stretch'>
          <Minimize
            sx={{
              transform: 'scale(2)', margin: 'auto',
              mt: '-17px'
            }} />
        </button>
      </TableCell>
    </TableRow>
  )
}
