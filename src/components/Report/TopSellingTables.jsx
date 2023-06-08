import React from 'react'
import ProductsStatsTable from '../Product/ProductsStatsTable'

export default function TopSellingTables({byProfit, byQuantity}) {
  return (
      <div className="flex flex-wrap gap-3  items-baseline
    lg:justity-start md:justify-start justify-center">
                <div className='w-fit h-auto'>
                  <h3 className='text-lg text-slate-700
                dark:text-white px-2 mt-6 font-normal'
                  >
                    Top Selling By Profit
                  </h3>
                  <ProductsStatsTable data={byProfit} />
                </div>
                <div className='w-fit h-auto'>
                  <h3 className='text-lg text-slate-700
                dark:text-white px-2 mt-6 font-normal'
                  >
                    Top Selling By Quantity
                  </h3>
                  <ProductsStatsTable data={byQuantity} />
                </div>
              </div>
  )
}
