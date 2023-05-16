import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import { DataGrid } from '@mui/x-data-grid';
import  IconButton  from '@mui/material/IconButton';
import  Close  from '@mui/icons-material/Close';
import format from 'date-fns/format';
import  parseISO  from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

const SalesEvents = () => {
     const {token, isAdmin, isManager} = useAuth() 
    const [page, setpage] = useState(0);
  const [count, setCount] = useState(0);
  const [created_at, setCreated_at] = useState('');
    const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [loading, setloading] = useState(false);
  const [saleNotification, setSaleNotifications] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
 useEffect(() => {
   
   const fetchProductsNotify = async () => {
     let filters = { model: 'sale', page:page>=0? page :0,pagesize:+pageSize };
     if (created_at?.length) {
       filters={...filters, created_at:created_at}
     }
      setloading(true)
      await queryInstance.get(`/notifications`, {params:filters,headers:{Authorization:`Bearer ${token}`}})
        .then(res => {
          // console.log(res?.data);
            setSaleNotifications(res?.data?.notifications)
            settotalPages(res?.data?.totalPages)
          setCount(res?.data?.count)
          setpage(page)
            // setCount(res?.data?.count)
        }).then(() => {
         
        })
        .catch(err => {
          console.log(err);
        }).finally(() => { setloading(false) })
    }
   if(isAdmin || isManager) {fetchProductsNotify()}
  }, [created_at, isAdmin, isManager, page, pageSize, token])
    return (
      <div>
        <div className='relative w-full'>
          <input className='py-4 px-2 border-2 border-slate-200 mb-3 mt-2'
            type='date' value={created_at}
            onChange={e => setCreated_at(e.target.value)} 
          />
          <IconButton disabled={!created_at?.length}
            onClick={() => setCreated_at('')}><Close /></IconButton>
        </div>
        <DataGrid 
          onStateChange={(event) => {
            
          }}
          sx={{
            height: '500px', width:'100%',
            // width: { xl: '100%', lg: '100%', md: '100%', sm: '100%', xs: '100%' }
          }}
                rows={saleNotification}
                loading={loading}
          columns={[
            {
              field: 'created_at', headerName: 'Date', width: 210,
              valueGetter: ({ value }) => isValid(parseISO(value)) ? format(parseISO(value), " EEE MMM dd yyyy, HH:mm b") : 'invalid date'
            },
              { field: 'message', headerName: '#msg', width: '160', cellClassName: 'text_cell', editable:false},
              { field: 'action', headerName:'action', editable:false  },
              {
                field: 'quantity', type: 'Number', headerName: '#Qty',
                valueGetter: ({row }) => row?.data?.quantity
              },
              { field: 'data', headerName: '#Price',editable:false, valueGetter: ({ value }) => value?.quantity * value?.price},
              {
                field: 'userId', headerName: 'User',
                cellClassName:'text_cell',width:170,editable:false,
                valueGetter: ({ value }) => value?.firstName + ' ' + value?.lastName,
              },
              
                ]}
                rowCount={count}
                pagination='server'
                paginationModel={{ page: page, pageSize: pageSize }}
                onPaginationModelChange={({page, pageSize }) => {
                    setpage(page)
                    setpageSize(pageSize)
                }}  
                pageSizeOptions={[10, 20, 30, 50, 75,100]}
            getRowId={(row) => row?._id}
             hideFooterSelectedRowCount
            
            />
            
        </div>
    );
}

export default SalesEvents;
