import React from 'react'

export default function TopSellingCard(
  { name, money, profit,
    quantity, isProfit }) {
  
  let Dalasis = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GMD',
  });
  let FormatQuantity = new Intl.NumberFormat('en-US')
  
  return (
    <div className='bg-slate-50 dark:bg-slate-600 
      p-3  text-center w-fit max-w-full
      flex flex-col gap-[2px] items-center
      rounded-md '>
          <h5 className='font-normal text-base
        text-slate-700 dark:text-slate-50
        capitalize '>
              { name}</h5>
        <hr className='h-[1px] w-full bg-amber-200 mb-2' />

      <div className={`flex gap-x-[10px] place-items-center
      justify-between self-baseline rounded-md 
      px-1 py-1 pb-2 w-full
     ${isProfit? 'bg-orange-300':'bg-none'}`}>
               <p className='text-lg font-normal
               text-slate-800 dark:text-slate-50
               -mb-1 capitalize'>
          Profit:
        </p>
               <p className='text-lg font-normal
               text-slate-800 dark:text-slate-50
               -mb-1
        capitalize'>{Dalasis.format(profit)}</p>
      </div>
      <div className={`flex gap-x-[10px] items-center
      justify-between self-baseline rounded-md 
      px-1 py-1 pb-2 w-full 
     ${!isProfit ? 'bg-orange-300' : 'bg-none'}`}>
        
        <p className='text-lg font-normal
               text-slate-700 dark:text-slate-50
                       -mb-1 capitalize'>
          Quantity:
        </p>
        <p className='text-lg font-normal
               text-slate-700 dark:text-slate-50
                       -mb-1 capitalize'>
          {FormatQuantity.format(quantity)}
        </p>
      </div>
     <div className='flex gap-x-[10px] items-center
     justify-between self-baseline' >
               <p className='text-lg font-normal
               text-slate-700 dark:text-slate-50
        capitalize'>Money:</p>
               <p className='text-lg font-normal
               text-slate-700 dark:text-slate-50
        capitalize'>{Dalasis.format(money)}</p>
      </div> 
     </div>
  )
}
