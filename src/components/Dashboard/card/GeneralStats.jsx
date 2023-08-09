import React from 'react'
import AcUnit from '@mui/icons-material/AcUnit'
import BallotOutlined from '@mui/icons-material/BallotOutlined'
import Minimize from '@mui/icons-material/CountertopsOutlined'
import  CategoryOutlined  from '@mui/icons-material/CategoryOutlined'


export default function GeneralStats({ data }) {
  const { cancellSalesCount, categoriesCount,
    salesCount, productCount,
    productOutOfStockCount } = data;
  return (
    <div  className='
                w-full p-2 py-5 pt-10 rounded-md
                flex flex-row lg:py-9 md:py-7 md:gap-x-5 gap-2 flex-wrap gap-y-10 bg-slate-200'
    >
      <div style={{background:'linear-gradient(#96d1f9, #00cded)'}}
        className='md:p-2 p-[2px] w-fit md:min-w-[160px] sm:min-w-[110px]
      min-w-[100px] h-auto flex flex-col gap-1
              text-center
                rounded-md'>
        <button className='w-10 h-10 rounded-full bg-pink-300 -mt-7
                    mx-auto'>
          <AcUnit sx={{
            transform: 'scale(1.3)',
            color: '#fff'
          }} />
        </button>
        <p className='text-base font-medium mt-2
                         text-white'>Total Sales</p>
        <h3 className='mb-4 -mt-2 text-white'>
          {salesCount}
        </h3>
      </div>
      <div
        style={{ background: 'linear-gradient(#b9f4bc, #8dc63f)' }}
        className='md:p-2 p-[2px] w-fit md:min-w-[160px] sm:min-w-[110px]
      min-w-[100px] h-auto flex flex-col gap-1
                 text-center
                rounded-md'>
        <button className='w-10 h-10 rounded-full bg-zinc-500 -mt-7
                    mx-auto'>
          <AcUnit sx={{
            transform: 'scale(1.3)',
            color: '#fff'
          }} />
        </button>
        <p className='text-base font-medium mt-2
                         text-white'>Cancelled Sales</p>
        <h3 className='mb-4 -mt-2 text-white'>
          {cancellSalesCount}
        </h3>
      </div>

      <div style={{background:'linear-gradient(#ffd57f, #ffb601)'}}
        className='md:p-2 p-[2px] w-fit md:min-w-[160px] sm:min-w-[110px]
      min-w-[100px] h-auto flex flex-col gap-1
                 text-center
                rounded-md'>
        <button className='w-10 h-10 rounded-full bg-yellow-600 -mt-7
                    mx-auto'>
          <BallotOutlined sx={{
            transform: 'scale(1.3)',
            color: '#fff'
          }} />
        </button>
        <p className='text-base font-medium mt-2
                         text-white'>Total Products</p>
        <h3 className='mb-4 -mt-2 text-white'>{productCount}</h3>
      </div>
      <div
        style={{ background: "linear-gradient(#899ab0, #205493)" }}
        className='md:p-2 p-[2px] w-fit md:min-w-[160px] sm:min-w-[110px]
      min-w-[100px] h-auto flex flex-col gap-1
               text-center
                rounded-md'>
        <button className='w-10 h-10 rounded-full bg-purple-400 -mt-7
                    mx-auto'>
          <Minimize sx={{
            transform: 'scale(1.3)',
            color: '#fff'
          }} />
        </button>
        <p className='text-base font-medium mt-2
                         text-white'>Products Out Of stock</p>
        <h3 className='mb-4 -mt-2 text-white'>{productOutOfStockCount}</h3>
      </div>
      <div style={{background:'linear-gradient(#ff9395, #970808)'}}
        
        className='md:p-2 p-[2px] w-fit md:min-w-[160px] sm:min-w-[110px]
      min-w-[100px] h-auto flex flex-col gap-1
                bg-teal-700 text-center
                rounded-md'>
        <button className='w-10 h-10 rounded-full bg-blue-400 -mt-7
                    mx-auto'>
          <CategoryOutlined sx={{
            transform: 'scale(1.3)',
            color: '#fff'
          }} />
        </button>
        <p className='text-base font-medium mt-2
                         text-white'>Total Categories</p>
        <h3 className='mb-4 -mt-2 text-white'>
          {categoriesCount}
        </h3>
      </div>

    </div>
  )
}
