import React from 'react'

export default function TopSellingCard({name, money, quantity, isMoney}) {
  return (
    <div className='bg-slate-300 dark:bg-slate-700 
      p-3  text-center w-fit max-w-full
      flex flex-col gap-[2px] items-center
      rounded-md '>
          <h5 className='font-normal text-base
        text-slate-800 dark:text-slate-50 '>
              { name}</h5>
        <hr className='h-[1px] w-full bg-amber-100 mb-2' />
          <div className={`w-full flex flex-wrap justify-between 
         ${isMoney? 'flex-row':'flex-row-reverse'}
        items-center gap-3 `}>
         <p className='text-slate-700 dark:text-slate-50
         text-xs'>GMD{money }</p>
         <p className='text-slate-700 dark:text-slate-50
         text-xs'>#{quantity}</p>
        </div>
     </div>
  )
}
