import React,{useState, useMemo} from 'react';
import { Edit } from '@mui/icons-material'
import { format ,parseISO} from 'date-fns';
import { GridActionsCellItem } from '@mui/x-data-grid';
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
            field: 'saleDate', headerName: 'Date', width: 210,
            valueGetter: ({ value }) => value? format(parseISO(value), 'EEE HH:mm b' ): ''
        },
]
 export const userColumns =  [
        {
            field: 'firstName', headerName: 'FirstName', minWidth: 110,
            valueGetter:({value})=> value? value?.name : ''
     },
         {
            field: 'lastName', headerName: 'LastName', minWidth: 110,
            valueGetter:({value})=> value? value?.name : ''
        },
        {
            type: 'array', field: 'roles', headerName: 'Roles', width: 120,
            valueGetter: ({ value }) => value ? value :''
     },
         {
           type:'boolean', field: 'active', headerName: 'status', minWidth: 110,
            valueGetter:({value})=> value? value : ''
     },
    //  {
    //      type: 'actions', headerName: 'Actions', 
    //      getActions: (params) => [
    //          <GridActionsCellItem >
    //              Edit
    //          </GridActionsCellItem>
             
    //      ]
    //      }

       
          ]
