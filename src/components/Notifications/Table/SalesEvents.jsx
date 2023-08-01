import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';

import { GetError } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import SaleTable from './SaleTable';
import Paginate from '../../Pagination/Paginate';
import SkeletonLoaders from '../../Loaders/SkelelonLoader';
  
const SalesEvents = ({ showSideMenu, user, date }) => {
  const { token, isAdmin } = useAuth()
  const [page, setpage] = useState(0);
  const [count, setCount] = useState(0);
  // const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [loading, setloading] = useState(false);
  const [saleNotifications, setSaleNotifications] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
  useEffect(() => {

    const fetchProductsNotify = async () => {
      let filters = { model: 'sale', page: page >= 0 ? page : 0, pagesize: +pageSize };
      if (date?.length) {
                filters = { ...filters, created_at: date }
            }
            if (user?.length) {
                filters = { ...filters, userId: user }
            }
      setloading(true)
      await queryInstance.get(`/notifications`, { params: filters, headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          // console.log(res?.data);
          setSaleNotifications(res?.data?.notifications)
          // settotalPages(res?.data?.totalPages)
          setCount(res?.data?.count)
          setpageSize(res?.data?.pageSize)
          // setpage(page)
          // setCount(res?.data?.count)
        })
        .catch(err => {
          // console.log(err);
          seterrorMessage(GetError(err))
        }).finally(() => { setloading(false) })
    }
    if (isAdmin) { fetchProductsNotify() }
  }, [date, isAdmin,  page, pageSize, token, user])
  return (
    <div>{
      loading ?
        <SkeletonLoaders />
      : <>

     
      {errorMessage?.length ?<ErrorMessage error={errorMessage}
        handleReset={() => seterrorMessage('')}
      /> : null}
      <div className='w-full 
      text-slate-700 dark:text-slate-50
           bg-slate-50 dark:bg-slate-700
          shadow shadow-white dark:shadow-slate-500
          flex flex-col gap-2'>
        <SaleTable data={saleNotifications} />
        <Paginate 
          page={page}
          setPage={setpage}
          pageSize={pageSize}
          setPageSize={setpageSize}
          options={[5, 10, 15, 20, 30, 40]}
          total={count}

        />
        {/* <DataGrid
        className='text-slate-700 dark:text-slate-50
           bg-slate-50 dark:bg-slate-700
          shadow shadow-white dark:shadow-slate-500'
        
        sx={{
          height: '500px',
          // width:'850px',
          maxWidth: '900px', minWidth: '400px',
          width: { xl: '850px', lg: '850px', md: '850px', sm: '100vw', xs: '100vw' },
        }}
       
        rows={saleNotifications}
        loading={loading}
        columns={[
          {
            field: 'created_at', headerName: 'Date', width: 210,
            valueGetter: ({ value }) => isValid(parseISO(value)) ? format(parseISO(value), " EEE MMM dd yyyy, HH:mm b") : 'invalid date'
          },
          { field: 'message', headerName: '#msg', width: '160', cellClassName: 'text_cell', editable: false },
          { field: 'action', headerName: 'action', editable: false },
          {
            field: 'quantity', type: 'Number', headerName: '#Qty',
            valueGetter: ({ row }) => row?.data?.quantity
          },
          { field: 'data', headerName: '#Price', editable: false, valueGetter: ({ value }) => value?.quantity * value?.price },
          {
            field: 'userId', headerName: 'User',
            cellClassName: 'text_cell', width: 170, editable: false,
            valueGetter: ({ value }) => value?.firstName + ' ' + value?.lastName,
          },

        ]}
        rowCount={count}
        pagination='server'
        paginationModel={{ page: page, pageSize: pageSize }}

        onPaginationModelChange={({ page, pageSize }) => {
          // alert(page, pageSize)
          if (page >= 0) {
            setpage(page)
          }
          if (pageSize >= 0) {
            setpageSize(pageSize)
          }
        }}

        pageSizeOptions={[10, 20, 30, 50, 75, 100]}
        getRowId={(row) => row?._id}
        hideFooterSelectedRowCount
        disableRowSelectionOnClick

      /> */}
</div>
      </>
    }
   
      </div>
  );
}

export default SalesEvents;
