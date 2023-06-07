// import format from 'date-fns/format';
// import  parseISO  from 'date-fns/parseISO';
import React from 'react';
// import isValid from 'date-fns/isValid';
import './productupdatestable.css'
import ProductTableRow from './ProductTableRow';

const ProductsTable = ({ productUpdates,socket}) => {
   
    return (
      <div className='w-fit overflow-auto
        bg-slate-50 dark:bg-slate-700
        text-slate-700 dark:text-slate-50
        '>
             <table className='w-auto  mx-auto'>
                <thead>
                  <tr>
                    <th rowSpan={2} className=" text-xs font-serif font-medium">
                    Action
                    </th>
                    <th rowSpan={2} className=" text-xs font-serif font-medium">
                    Date
                    </th>
                    <th className=" text-xs font-serif font-medium" 
                    colSpan={6}>
                    From
                    </th>
                    <th className=" text-xs font-serif font-medium" 
                    colSpan={6}>
                    To
                    </th>
                  </tr>
                  <tr>
                    <th className=" text-xs font-serif font-medium">
                    Name
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    Qty
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    #instock
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    price
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    Category
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    Desc
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    Name
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    Qty
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    #Instock
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    price
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    Category
                    </th>
                    <th className=" text-xs font-serif font-medium">
                    Desc
                    </th>
                  </tr>
                </thead>
                <tbody>
            {productUpdates?.map((notify, id) => (
              
              <ProductTableRow notify={notify}
                socket={socket}
                key={id} />
            ))}   
                </tbody>
              </table>
        </div>
    );
}

export default ProductsTable;
