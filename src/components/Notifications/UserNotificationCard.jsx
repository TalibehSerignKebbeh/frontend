import React,{useEffect} from 'react';
import format from 'date-fns/format';
import  parseISO  from 'date-fns/parseISO';

const UserNotificationCard = ({ notify }) => {

    return (
        <div className={` bg-white shadow-lg 
        w-auto py-2 px-1 min-h-fit`}>
            {!notify?.isRead ? <small className='text-red-700 '> UnRead</small> : null}
            <br />
            {notify?.created_at ? <small>{ 
              format(parseISO(notify?.created_at), " EEE MMM dd yyyy, HH:mm b")

            }</small> : null}
            <div className='mt-2 flex flex-col gap-x-0'>
            <span className='text-xs font-thin'>Message</span>
            <h3 className='md:text-2xl sm:text-sm text-xs font-light '>
                {notify?.message}
                </h3>
                
            </div>
            <div className=''>
            <span className='text-xs font-thin'>Name</span>
                <h3 className='md:text-2xl sm:text-sm text-xs font-light capitalize'>
                    {notify?.userId?.firstName +" "+ notify?.userId?.lastName}
                </h3>
                
            </div>
        </div>
    );
}

export default UserNotificationCard;
