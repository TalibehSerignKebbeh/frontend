import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import SkelelonLoader from '../../Loaders/SkelelonLoader';
import UserNotificationCard from '../UserNotificationCard';
import Paginate from '../../Pagination/Paginate';
import { GetError } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import { useQuery } from '@tanstack/react-query';


const UserNotificationTable = ({ socket,date, user, users,searchFilters }) => {
    const model= 'user';
    const { token } = useAuth()
    const [page, setpage] = useState(0);
    const [total, settotal] = useState(0);
    // const [totalPages, settotalPages] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    // const [loading, setloading] = useState(false);
    const [userEvents, setUsersEvents] = useState([]);
    const [errorMessage, seterrorMessage] = useState('');

     const { isLoading, isError, error, failureReason, data,
    isSuccess,
  } = useQuery({
    queryKey: ['auth_notifications',  model, page, pageSize,date=searchFilters?.date, user=searchFilters?.user],
    queryFn: () => queryInstance.get(`/products`,
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


    // useEffect(() => {

    //     const fetchProductsNotify = async () => {
    //         let filters = { model: 'user', page: page >= 0 ? page : 0, pagesize: +pageSize };
    //         if (date?.length) {
    //             filters = { ...filters, created_at: date }
    //         }
    //         if (user?.length) {
    //             filters = { ...filters, userId: user }
    //         }
    //         setloading(true)
    //         await queryInstance.get(`/notifications`, { params: filters, headers: { Authorization: `Bearer ${token}` } })
    //             .then(res => {
    //                 // console.log(res);
    //                 setUsersEvents(res?.data?.notifications)
    //                 // settotalPages(res?.data?.totalPages)
    //                 settotal(res?.data?.count)
    //                 // settotal(res?.data?.total)
    //             })
    //             .catch(err => {
    //                 seterrorMessage(GetError(err))

    //             }).finally(() => { setloading(false) })
    //     }
    //     if (isAdmin) { fetchProductsNotify() }
    // }, [date, isAdmin, page, pageSize, token, user, user?.length])


     useEffect(() => {
    if (isSuccess) {
        setUsersEvents(data?.notifications)
      settotal(data?.count)
        
    }
    return () => {
      
    };
  }, [isSuccess]);

   useEffect(() => {
    if (isError || error || failureReason) {
        seterrorMessage(GetError(error ? error : failureReason))
        
    }
    return () => {
      
    };
  }, [isError,failureReason, error]);

    return (
        <div>

            {isLoading ?
                <div className='w-full h-full bg-inherit p-0 '>

                    <SkelelonLoader />
                </div>
                :
                <div className='text-slate-700 dark:text-slate-50
                bg-slate-50 dark:bg-slate-700
                md:px-0 px-[3px]'>
                    {errorMessage?.length ?
                        <ErrorMessage
                            error={errorMessage}
                            handleReset={() => seterrorMessage('')}
                        /> : null}

                    <div className='flex flex-row flex-wrap gap-2
                    bg-inherit w-full my-7'>
                        {userEvents?.map((value, index) => (
                            <UserNotificationCard key={index}
                                notify={value}
                                socket={socket}
                            />
                        ))}
                    </div>
                    <Paginate page={page}
                        setPage={setpage} setPageSize={setpageSize}
                        pageSize={pageSize}
                        options={[5, 10, 20, 30, 40, 50]}
                        total={total}
                    />
                </div>
            }
        </div>
    );
}

export default UserNotificationTable;
