import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import { GetError } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import SaleTable from './SaleTable';
import Paginate from '../../Pagination/Paginate';
import SkeletonLoaders from '../../Loaders/SkelelonLoader';
import { useQuery } from '@tanstack/react-query';
  
  
const SalesEvents = ({ showSideMenu, user, date, searchFilters }) => {
  const model = 'sale'

  const { token } = useAuth()
  const [page, setpage] = useState(0);
  const [count, setCount] = useState(0);
  // const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [saleNotifications, setSaleNotifications] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');

      const { isLoading, isError, error, failureReason, data,
    isSuccess,
  } = useQuery({
    queryKey: ['sales_notifications', model, page, pageSize, date=searchFilters?.date, user=searchFilters?.user,],
    queryFn: () => queryInstance.get(`/notifications`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          model,
          page: page, pagesize: pageSize,
          created_at:searchFilters?.date?.length? searchFilters?.date?.length: null,
          userId:searchFilters?.user? searchFilters?.user: null,
        }
      }).then(res => res?.data)
      .catch((err) => Promise.reject(err)),
    refetchInterval: 30000,
  })

  useEffect(() => {
    if (isSuccess) {
      setSaleNotifications(data?.notifications)
      setCount(data?.count)
        // settotal(res?.data?.count)
    }
    return () => {
      
    };
  }, [isSuccess]);

   useEffect(() => {
    if (isError || error || failureReason) {
        seterrorMessage(GetError( error ? error : failureReason))
    }
    return () => {
      
    };
  }, [isError,failureReason, error]);

  
  return (
    <div>{
      isLoading ?
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
</div>
      </>
    }
   
      </div>
  );
}

export default SalesEvents;
