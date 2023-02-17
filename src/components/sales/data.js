import React,{useState, useMemo} from 'react';
import { Edit } from '@mui/icons-material'
import { format ,parseISO} from 'date-fns';
const Data = () => {
  
    return (
        <div>
            
        </div>
    );
}

export default Data;
 export const salesColumns =  [
        {
            field: 'product', headerName: 'Product', minWidth: 110,
            valueGetter:({value})=> value? value?.name : ''
        },
        {
            type: 'number', field: 'quantity', headerName: 'Quantity', width: 110,
        },
        {
            type: 'number', field: 'price', headerName: 'Price', width: 120,
            valueGetter: ({ value }) => value? `D ${Number(value)}` :''
        },

        {
            type: 'number', field: 'total', headerName: 'Total', width: 120,
            valueGetter: ({ value }) => value? `D ${Number(value)}` :''
        },

        {
            field: 'seller', headerName: 'Seller', minWidth: 150,
            valueGetter: ({ value }) => value? value?.firstName + " " + value?.lastName :''
        },
        {
            field: 'saleDate', headerName: 'Date', width: 190,
            valueGetter: ({ value }) => value? format(parseISO(value), 'do MMM yyyy HH:mm b..bb' ): ''
        },
          ]
