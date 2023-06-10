import React, { useEffect } from 'react'
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';

export default function ProductTableRow({ notify, socket }) {
  useEffect(() => {
    if (!notify?.isRead) {
      socket.emit('read_product_notify', { id: notify?._id })
    }
    return () => {

    };
  }, [notify?._id, notify?.isRead, socket]);
  return (
    <tr className={`${!notify?.isRead ? 'bg-red-200' : 'bg-transparent'}
                    py-2 `}>
      <td className="table_data text-2xl  font-normal capitalize">
        {notify?.action}</td>
      <td className="table_data text-2xl  font-normal">
        {isValid(parseISO(notify?.created_at)) ? format(
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
            {notify?.data?.unit_cost}</td>
          <td className="table_data text-2xl  font-normal">
            {notify?.data?.stockId?.name}</td>
          <td className="table_data text-2xl  font-normal">
            {notify?.data?.description}</td>
        </> :
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
            {notify?.data?.unit_cost}</td>
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
           <td className="table_data text-2xl  font-normal">
            {notify?.data?.to?.price}</td>
          <td className="table_data text-2xl font-serif font-normal">
            {notify?.data?.to?.stockId?.name}</td>
          <td className="table_data text-2xl font-serif font-normal">
            {notify?.data?.to?.description}</td>

        </>
      }


    </tr>
  )
}
