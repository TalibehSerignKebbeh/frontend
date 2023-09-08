import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import SkeletonLoaders from '../../Loaders/SkelelonLoader';
import Paginate from '../../Pagination/Paginate';
import { GetError, formatDayDateWithTime, isStringValidDate } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import ProductDetail from './ProductDetail';
import { useQuery } from '@tanstack/react-query';


const ProductsUpdates = ({ socket,
                    searchFilters,date, user,
  setsearchFilters }) => {
  const model = 'product'
  const { token} = useAuth()
  const [page, setpage] = useState(0);
  const [total, settotal] = useState(0);
  const [pageSize, setpageSize] = useState(5);
  const [productUpdates, setproductUpdates] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');

      const { isLoading, isError, error, failureReason, data,
    isSuccess,
  } = useQuery({
    queryKey: ['products_notifications', model, page, pageSize,date=searchFilters?.date, user=searchFilters?.user],
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
      setproductUpdates(data?.notifications)
      settotal(data?.count)
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
    <div className='bg-white dark:bg-slate-700 
        shadow-md py-3 flex flex-col justify-center'>
      {isLoading ?
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
          

          {/* <ProductsTable productUpdates={productUpdates} 
            socket={socket}
          /> */}
          <div className='w-full flex flex-wrap gap-2 '>
            {productUpdates?.map((notify, ind) => (
              <div key={ind}
              className='w-auto'>
                {(notify?.type === 'spoil' || notify?.type === 'expire')
                  ?
                  <div className='md:px-4 px-2 bg-slate-50 md:my-4 my-2 text-slate-800
                    dark:bg-slate-700 dark:text-white md:py-3 py-2 rounded-md
                    border border-black dark:border-white'>
                    <div>
                      <small>{isStringValidDate(notify?.created_at) ?
                       formatDayDateWithTime(notify?.created_at) :
                        ''}</small>
                    </div>
                     <p className='text-lg capitalize'>
                        {notify?.message}
                      </p>
                    <div className='flex flex-col'>
                      <h3 className='text-lg capitalize'>
                      Quantiy update 
                      </h3>
                      <div className='flex flex-row justify-start gap-7'>
                      <p className='text-lg capitalize'>
                      From <strong className='text-teal-700'>
                      {notify?.data?.form?.quantityInStock}
                      </strong>
                      </p>
                      <p className='text-lg capitalize'>
                      To <strong className='text-teal-700'>
                      {notify?.data?.to?.quantityInStock}
                      </strong>
                        </p>
                     </div>
                     </div>
                  <p className='text-lg text-start mt-1'>By <small className='text-xl text-green-700'>
                  {notify?.userId?.firstName + " " + notify?.userId?.lastName}
                  </small>
                  </p>
                  </div> : 
                  notify?.action==='add'?
                  <div className='md:px-4 px-2 bg-slate-50 md:my-4 my-2 text-slate-800
                  dark:bg-slate-700 dark:text-white md:py-3 py-2 rounded-md
                  border border-black dark:border-white'>
                       <small>{isStringValidDate(notify?.created_at) ?
                       formatDayDateWithTime(notify?.created_at) :
                        ''}</small>
                      <p className='text-lg capitalize'>
                        {notify?.message}
                      </p>
                       <ProductDetail data={notify?.data}/>
                  <p className='text-lg text-start mt-1'>By <small className='text-xl text-green-700'>
                  {notify?.userId?.firstName + " " + notify?.userId?.lastName}
                  </small>
                  </p>
                    
                    </div>
                    :
                    <div className='md:px-4 px-2 bg-slate-50 md:my-4 my-2 text-slate-800
                    dark:bg-slate-700 dark:text-white md:py-3 py-2 rounded-md
                    border border-black dark:border-white'>
                       <small>{isStringValidDate(notify?.created_at) ?
                       formatDayDateWithTime(notify?.created_at) :
                        ''}</small>
                      <p className='text-lg capitalize
                      '>
                        {notify?.message}</p>
                      <ProductDetail data={notify?.data?.from}/>
                      <ProductDetail data={notify?.data?.to}/>
                  <p className='text-lg text-start mt-1'>By <small className='text-xl text-green-700'>
                  {notify?.userId?.firstName + " " + notify?.userId?.lastName}
                  </small>
                  </p>
                    
                    </div>
                }
                
              </div>
            ))}
          </div>
          {productUpdates?.length ?
            <Paginate page={page}
            setPage={setpage} setPageSize={setpageSize}
            pageSize={pageSize}
            options={[5,10, 20, 30, 40, 50]}
            total={total}
          /> : null}
         
        </div>}

    </div>
  );
}

export default ProductsUpdates;
