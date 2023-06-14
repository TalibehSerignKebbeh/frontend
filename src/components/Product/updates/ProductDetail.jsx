import React from 'react';

const ProductDetail = ({ data }) => {
    return (
        <div className=' flex flex-row flex-wrap gap-2 my-[5px]'>
            <div className='flex flex-col gap-0
            border border-teal-400 p-[3px] rounded'>
                <p className='font-sans text-sm
                font-normal '>Name</p>
                <h3 className='text-lg font-normal
                font-sans text-teal-700 -mt-2'>{data?.name}</h3>
            </div>
            <div className='flex flex-col gap-0
            border border-teal-400 p-[3px] rounded'>
                <p className='font-sans text-sm
                font-normal '>Price</p>
                <h3 className='text-lg font-normal
                font-sans text-teal-700 -mt-2'>{data?.price}</h3>
            </div>
            <div className='flex flex-col gap-0
            border border-teal-400 p-[3px] rounded'>
                <p className='font-sans text-sm
                font-normal '>Selling price</p>
                <h3 className='text-lg font-normal
                font-sans text-teal-700 -mt-2'>{data?.unit_cost}</h3>
            </div>
            <div className='flex flex-col gap-0
            border border-teal-400 p-[3px] rounded'>
                <p className='font-sans text-sm
                font-normal '>Quantity</p>
                <h3 className='text-lg font-normal
                font-sans text-teal-700 -mt-2'>{data?.quantity}</h3>
            </div>
            <div className='flex flex-col gap-0
            border border-teal-400 p-[3px] rounded'>
                <p className='font-sans text-sm
                font-normal '>QuantityInStock</p>
                <h3 className='text-lg font-normal
                font-sans text-teal-700 -mt-2'>{data?.quantityInStock}</h3>
            </div>
            <div className='flex flex-col gap-0
             border border-teal-400 p-[3px] rounded'>
                <p className='font-sans text-sm
                font-normal '>Category</p>
                <h3
                className='text-lg font-normal
                font-sans text-teal-700 -mt-2'>{data?.stockId?.name}</h3>
            </div>
            
        </div>
    );
}

export default ProductDetail;
