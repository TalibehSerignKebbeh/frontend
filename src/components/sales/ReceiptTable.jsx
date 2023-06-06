import React from 'react'
import AddCircle from '@mui/icons-material/AddCircle'
import  Minimize from '@mui/icons-material/Minimize';

export default function ReceiptTable({selected, handleDecrement, handleIncrement}) {
  return (
     <table 
              className=' relative w-fit table table-auto text-align
              md:text-2xl text-lg
              bg-white dark:bg-slate-400 text-slate-700
              '>
          <thead className=''>
            <tr className={``} >
              <th className='w-auto text-xl 
              text-slate-800 dark:text-white
              border border-slate-300 px-4 py-2'>Name</th>
              <th className='w-auto text-xl 
              text-slate-800 dark:text-white
              border border-slate-300 px-4 py-2'>Price</th>
              <th className='w-auto text-xl 
              text-slate-800 dark:text-white
              border border-slate-300 px-4 py-2'>Qty</th>
              <th className='w-auto text-xl 
              text-slate-800 dark:text-white
              border border-slate-300 px-4 py-2'>Total</th>
              <th className='w-auto text-xl 
              text-slate-800 dark:text-white
              border border-slate-300 px-4 py-2' colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selected?.map((value, index) => (
              <tr className={``} key={index}>
                <td className='w-auto  font-normal text-4xl text-center 
                text-slate-800 dark:text-white
                border border-slate-300 px-2 py-2'>{value?.name }</td>
                <td className='w-auto  font-normal text-4xl text-center 
                text-slate-800 dark:text-white
                border border-slate-300 px-2 py-2'>{value?.price }</td>
                <td className='w-auto  font-normal text-4xl text-center 
                text-slate-800 dark:text-white
                border border-slate-300 px-2 py-2'>{value?.quantity }</td>
                <td  className='w-auto font-normal  text-4xl text-center 
                text-slate-800 dark:text-white
                border border-slate-300 px-2 py-2'>{value?.price * value?.quantity }</td>
                    <td className='w-auto  font-normal text-4xl text-center 
                    text-slate-800 dark:text-white
                    border border-slate-300  px-2 py-2'>
                        <button onClick={e => handleIncrement(value)}>
                  <AddCircle />
                </button></td>
                <td className='w-auto font-normal  text-4xl text-center 
                    text-slate-800 dark:text-white
                    border border-slate-300 px-2 py-2
                    flex items-center justify-center'>
                        <button onClick={e => handleDecrement(value)} disabled={value?.quantity <= 1}>
                  <Minimize />
                </button></td>
              </tr>
            ))}
          
              </tbody>
              <tfoot>
              <tr className={``}>
                <td colSpan={3} className='text-center text-4xl font-medium
                 text-slate-800 dark:text-white
                 border border-slate-300 px-4 py-2'  align='right'>Total</td>
                <td colSpan={3} className='text-center text-4xl  font-medium
                 text-slate-800 dark:text-white
                border border-slate-300 px-4 py-2' align='left'>
                  {selected?.reduce((prev, current) => { return prev + (current?.quantity * current?.price) }, 0)}
                </td>
              </tr>
              </tfoot>
        </table>
  )
}
