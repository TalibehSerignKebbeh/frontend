import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import ProductsTable from '../../Notifications/Table/ProductsTable';
// import SpinnerLoader from '../../Loaders/SpinnerLoader';
// import IconButton from '@mui/material/IconButton';
// import Close from '@mui/icons-material/Close';
import SkeletonLoaders from '../../Loaders/SkelelonLoader';
import Paginate from '../../Pagination/Paginate';
import { GetError } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';

const ProductsUpdates = ({socket, date, user}) => {
  const { token, isAdmin, isManager } = useAuth()
  const [page, setpage] = useState(0);
  const [total, settotal] = useState(0);
  // const [totalPages, settotalPages] = useState(1);
  // const [created_at, setCreated_at] = useState('');
  const [pageSize, setpageSize] = useState(5);
  const [loading, setloading] = useState(false);
  const [productUpdates, setproductUpdates] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');

  useEffect(() => {
    const fetchProductsNotify = async () => {
      let filters = { model: 'product', page: page >= 0 ? page : 0, pagesize: +pageSize };
      if (date?.length) {
        filters = { ...filters, created_at: date }
      }
      if (user?.length) {
        filters = { ...filters, userId: user }
      }
      setloading(true)
      // await queryInstance.get(`/notifications/products/alldata?page=${page}&pagesize=${pageSize}`)
      await queryInstance.get(`/notifications`, { params: filters, headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          // console.log(res?.data);
          setproductUpdates(res?.data?.notifications)
          settotal(res?.data?.count)
          // settotalPages(res?.data?.totalPages)
          setpageSize(res?.data?.pageSize)
        })
        .catch(err => {
          seterrorMessage(GetError(err))
        }).finally(() => { setloading(false) })
    }
    if (isAdmin || isManager) { fetchProductsNotify() }
  }, [date, isAdmin, isManager, page, pageSize, token, user])
  return (
    <div className='bg-white dark:bg-slate-700 
        shadow-md py-3 flex flex-col justify-center'>
      {loading ?
        <div className='w-full h-full bg-inherit p-0 '>
          <SkeletonLoaders />
        </div>
        :
        <div className='bg-inherit '>
          {errorMessage?.length ?
                        <ErrorMessage
                            error={errorMessage}
                            handleReset={()=>seterrorMessage('')}
                    /> : null}
          

          <ProductsTable productUpdates={productUpdates} 
            socket={socket}
          />
          <Paginate page={page}
            setPage={setpage} setPageSize={setpageSize}
            pageSize={pageSize}
            options={[5,10, 20, 30, 40, 50]}
            total={total}
          />
         
        </div>}

    </div>
  );
}

export default ProductsUpdates;
