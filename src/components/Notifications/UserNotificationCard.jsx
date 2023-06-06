import React, { useEffect } from 'react';
import format from 'date-fns/format';
import  parseISO  from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';

const UserNotificationCard = ({ notify, socket }) => {

    useEffect(() => {
        if (!notify?.isRead) {
            socket.emit('read_auth_notify',{id:notify?._id})
        }
        return () => {
            
        };
    }, [notify?._id, notify?.isRead, socket]);

    return (
        <div className={` bg-white dark:bg-slate-600
        shadow-lg 
        xl:w-[300px] lg:w-[300px] md:w-[270px] sm:w-[20ppx]
        w-11/12 py-2 px-2
        min-h-fit
        md:mx-0 sm:mx-auto mx-auto `}>
         
            {!notify?.isRead ?
                <small className='bg-red-700
                text-slate-200 '>
                UnRead</small> : null}
            <br />
            {isValid(parseISO(notify?.created_at)) ?
                <p>{ 
              format(parseISO(notify?.created_at), " EEE MMM dd yyyy, HH:mm b")

            }</p> : null}
            <div className='mt-2 flex flex-col gap-x-0'>
            <span className='text-xs font-light'>Message</span>
            <h3 className='md:text-lg sm:text-sm text-xs font-normal '>
                {notify?.message}
                </h3>
                
            </div>
            <div className=''>
            <span className='text-xs font-light'>Name</span>
                <h3 className='md:text-lg sm:text-sm 
                text-xs font-normal capitalize'>
                    {notify?.userId?.firstName +" "+ notify?.userId?.lastName}
                </h3>
                
            </div>
        </div>
    );
}

export default UserNotificationCard;
