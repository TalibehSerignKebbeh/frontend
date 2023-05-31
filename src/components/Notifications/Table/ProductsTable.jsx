import format from 'date-fns/format';
import  parseISO  from 'date-fns/parseISO';
import React from 'react';
import isValid from 'date-fns/isValid';
import './productupdatestable.css'
const ProductsTable = ({ productUpdates,}) => {
   
    return (
      <div className='w-fit overflow-scroll
        bg-slate-50 dark:bg-slate-700
        text-slate-700 dark:text-slate-50
        '>
             <table className='w-auto overflow-scroll mx-auto'>
                <thead>
                  <tr>
                    <th rowSpan={2} className="table_head text-xs font-serif font-medium">
                    Action
                    </th>
                    <th rowSpan={2} className="table_head text-xs font-serif font-medium">
                    Date
                    </th>
                    <th className="table_head text-xs font-serif font-medium" 
                    colSpan={6}>
                    From
                    </th>
                    <th className="table_head text-xs font-serif font-medium" 
                    colSpan={6}>
                    To
                    </th>
                  </tr>
                  <tr>
                    <th className="table_head text-xs font-serif font-medium">
                    Name
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    Qty
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    #instock
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    price
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    Category
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    Desc
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    Name
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    Qty
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    #Instock
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    price
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    Category
                    </th>
                    <th className="table_head text-xs font-serif font-medium">
                    Desc
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productUpdates?.map((notify, id) => (
                    <tr className={`${!notify?.isRead ? 'bg-red-200' : 'bg-transparent'}
                    py-2 `} key={id}>
                      <td className="table_data text-2xl  font-normal capitalize">
                      {notify?.action}</td>
                      <td className="table_data text-2xl  font-normal">
                      {isValid(parseISO(notify?.created_at))? format(
                          parseISO(notify?.created_at),
                          " EEE MMM dd yyyy, HH:mm b"
                        ) : 'invalid date'}</td>
                      {notify?.action === 'add' ?
                        <>
                          <td className="table_data text-2xl  font-normal">
                      {notify?.data?.name}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.quantity}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.quantityInStock}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.price}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.stockId?.name}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.description}</td>
                        </>:
                        <>

                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.from?.name}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.from?.quantity}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.from?.quantityInStock}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.from?.price}</td>
                      <td className="table_data text-2xl  font-normal">
                      {notify?.data?.from?.stockId?.name}</td>
                      <td className="table_data text-2xl  font-normal">
                            {notify?.data?.from?.description}</td>
                     {/* <td className="text-2xl  font-normal">
                      {notify?.data?.from?.stockId.name}</td> */}

                      <td className="table_data text-2xl font-serif font-normal">
                      {notify?.data?.to?.name}</td>
                      <td className="table_data text-2xl font-serif font-normal">
                      {notify?.data?.to?.quantity}</td>
                      <td className="table_data text-2xl font-serif font-normal">
                      {notify?.data?.to?.quantityInStock}</td>
                      <td className="table_data text-2xl font-serif font-normal">
                      {notify?.data?.to?.price}</td>
                      <td className="table_data text-2xl font-serif font-normal">
                      {notify?.data?.to?.stockId?.name}</td>
                      <td className="table_data text-2xl font-serif font-normal">
                            {notify?.data?.to?.description}</td>
                          
                        </>
                       }

                     
                    </tr>
                  ))}
                 
                </tbody>
              </table>
        </div>
    );
}

export default ProductsTable;
