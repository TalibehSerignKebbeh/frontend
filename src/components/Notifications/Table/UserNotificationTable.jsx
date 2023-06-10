import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import SkelelonLoader from '../../Loaders/SkelelonLoader';
import UserNotificationCard from '../UserNotificationCard';
import Paginate from '../../Pagination/Paginate';
import { GetError } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
const UserNotificationTable = ({ socket, date, user }) => {
    const { token, isAdmin, isManager } = useAuth()
    const [page, setpage] = useState(0);
    const [total, settotal] = useState(0);
    // const [totalPages, settotalPages] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [loading, setloading] = useState(false);
    const [userEvents, setUsersEvents] = useState([]);
    const [errorMessage, seterrorMessage] = useState('');
    useEffect(() => {

        const fetchProductsNotify = async () => {
            let filters = { model: 'user', page: page >= 0 ? page : 0, pagesize: +pageSize };
            if (date?.length) {
                filters = { ...filters, created_at: date }
            }
            if (user?.length) {
                filters = { ...filters, userId: user }
            }
            setloading(true)
            await queryInstance.get(`/notifications`, { params: filters, headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    console.log(res);
                    setUsersEvents(res?.data?.notifications)
                    // settotalPages(res?.data?.totalPages)
                    settotal(res?.data?.count)
                    // settotal(res?.data?.total)
                })
                .catch(err => {
                    seterrorMessage(GetError(err))

                }).finally(() => { setloading(false) })
        }
        if (isAdmin || isManager) { fetchProductsNotify() }
    }, [date, isAdmin, isManager, page, pageSize, token, user, user?.length])
    return (
        <div>

            {loading ?
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
