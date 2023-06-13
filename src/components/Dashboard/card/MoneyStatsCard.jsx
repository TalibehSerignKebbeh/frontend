import React from 'react'

export default function MoneyStatsCard(
    { icon, name, amount,
    title1, title2}) {
    function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2) + 'K';
  } else {
    return number;
  }
    }
  return (
      <div className='md:w-56 sm:w-48 max-w-xs  
    max-h-40 min-h-[80px] h-fit
          bg-white dark:bg-slate-600 shadow-xl 
          md:p-5 md:px-6 sm:p-[8px] sm:px-[10px] p-[6px] px-[6px]
          rounded-md flex flex-col gap-3
          border border-slate-600 dark:border-slate-50'>
              <div className='m-0 flex justify-between 
              items-center  '>
              <span className='font-sans font-medium text-gray-600
              dark:text-white capitalize
                  '>{title1}</span>
                  {/* <span><Money /> </span> */}
              <span
              className='text-gray-600
              dark:text-white'>{icon}</span>
              </div>
              <div>
              <h3 className='w-full mt-2  text-gray-600
              dark:text-white capitalize'>{title2 }</h3>
                  <div className='flex justify-between 
                  items-center m-0 text-gray-600
                  dark:text-white '>
                       <span>D{formatNumber(amount)}</span>
                  </div>
              </div>
          </div>
  )
}
