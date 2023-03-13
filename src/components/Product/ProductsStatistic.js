import React from 'react';

const ProductsStatistic = ({setopenAddModal}) => {
    return (
         <div className='w-full h-auto  bg-white shadow-fuchsia-50 
            shadow-sm rounded-lg md:mr-2'>
            <div className='w-full h-auto py-3 mx-1 my-3'>
              <h3 className='float-left md:mx-3 mx-1 text-xl font-semibold'>
                Overall Inventory
              </h3>
              <button onClick={()=>setopenAddModal(true)}
                className='float-right mx-1 mr-5 px-3 py-1 bg-green-600
              shadow shadow-green-600'>
                Add Product
              </button>
            </div>
            <div className='flex flex-row flex-wrap md:divide-x-2
            w-full h-auto justify-between md:pr-4 p-0 mb-3 py-2'>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-gray-900'>Categories</h3>
                <h4 className='font-semibold py-1'>14</h4>
                <span>Last 7 days</span>
              </div>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-red-200'>Total Products</h3>
                <h4 className='font-semibold py-1'>700</h4>
                <span>Last 7 days</span>
              </div>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-red-300'>Top Selling</h3>
                <h4 className='font-semibold py-1'>7</h4>
                <span>Last 7 days</span>
              </div>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-red-600'>Low Selling</h3>
                <h4 className='font-semibold py-1'>17</h4>
                <span>Last 7 days</span>
              </div>
            </div>

          </div>
    );
}

export default ProductsStatistic;
