import { formatOtherDate } from "../../utils/dateFormatters"




export const customTime = '00:00:00.000'

 export const salesColumns =  [
        {
            field: 'productId', headerName: 'Product', minWidth: 110,
            valueGetter:({value})=> value? value?.name : ''
        },
        {
            type: 'number', field: 'quantity', headerName: 'Quantity', width: 110,
     },
        {
            type: 'number', field: 'unit_cost', headerName: 'Unit Cost', width: 110,
        },
        {
            type: 'number', field: 'price', headerName: 'Price', width: 120,
            valueGetter: ({ value }) => value? `D ${Number(value)}` :''
        },

        {
            type: 'number', field: 'total', headerName: 'Total', width: 120,
            valueGetter: (params) => params? `D ${Number(params?.row?.quantity) * Number(params?.row?.price)}` :''
        },

        {
            field: 'sellerId', headerName: 'Seller', minWidth: 150,
            valueGetter: ({ value }) => value? value?.firstName + " " + value?.lastName :''
        },
        {
            field: 'saleDate', headerName: 'Date', width: 210,
            valueGetter: ({ value }) => value? formatOtherDate(value): ''
        },
]


 export const cancelledSalesColumns =  [
        {
            field: 'productId', headerName: 'Product', minWidth: 110,
            valueGetter:({value})=> value? value?.name : ''
        },
        {
            type: 'number', field: 'quantity', headerName: 'Quantity', width: 110,
     },
        {
            type: 'number', field: 'unit_cost', headerName: 'Unit Cost', width: 110,
        },
        {
            type: 'number', field: 'price', headerName: 'Price', width: 120,
            valueGetter: ({ value }) => value? `D ${Number(value)}` :''
        },

        {
            type: 'number', field: 'total', headerName: 'Total', width: 120,
            valueGetter: (params) => params? `D ${Number(params?.row?.quantity) * Number(params?.row?.price)}` :''
        },

        {
            field: 'sellerId', headerName: 'Seller', minWidth: 150,
            valueGetter: ({ value }) => value? value?.firstName + " " + value?.lastName :''
     },
         {
            field: 'deletedBy', headerName: 'DeletedBy', minWidth: 150,
            valueGetter: ({ value }) => value? value?.firstName + " " + value?.lastName :''
        },
        {
            
            field: 'saleDate', headerName: 'Date', width: 210,
            valueGetter: ({ value }) => value? formatOtherDate(value): ''
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
           type:'boolean', field: 'active', sortable:false, headerName: 'status', minWidth: 110,
            valueGetter:({value})=> value? value : ''
     },
    
       
          ]
