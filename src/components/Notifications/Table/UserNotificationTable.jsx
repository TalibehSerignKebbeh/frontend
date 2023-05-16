import React, { useState, useEffect } from 'react';
import  Pagination  from '@mui/material/Pagination';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import SpinnerLoader from '../../Loaders/SpinnerLoader';
import UserNotificationCard from '../UserNotificationCard';
import  IconButton  from '@mui/material/IconButton';
import  Close  from '@mui/icons-material/Close';
const UserNotificationTable = () => {
         const {token,isAdmin, isManager} = useAuth() 
    const [page, setpage] = useState(0);
    const [total, settotal] = useState(0);
  const [created_at, setCreated_at] = useState('');
    const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [loading, setloading] = useState(false);
  const [userEvents, setUsersEvents] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
 useEffect(() => {
   
     const fetchProductsNotify = async () => {
         let filters = { model: 'user', page:page>=0? page :0,pagesize:+pageSize };
     if (created_at?.length) {
       filters={...filters, created_at:created_at}
     }
      setloading(true)
         await queryInstance.get(`/notifications`, { params: filters,headers:{Authorization:`Bearer ${token}`} })
        .then(res => {
          console.log(res?.data);
            setUsersEvents(res?.data?.notifications)
            settotalPages(res?.data?.totalPages)
            settotal(res?.data?.total)
            // settotal(res?.data?.total)
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
            
            {loading ? <SpinnerLoader /> :
                <div >
                    <div>
          <input className='py-4 px-2 border-2 border-slate-200 mb-3 mt-2'
            type='date' value={created_at}
                            onChange={e => setCreated_at(e.target.value)} />
                        <IconButton disabled={!created_at?.length}
            onClick={() => setCreated_at('')}><Close /></IconButton>
 
        </div>
                    <div className='flex flex-row flex-wrap gap-2'>
                    {userEvents?.map((value, index) => (
                        <UserNotificationCard key={index} 
                            notify={value}
                        />
                    ))}
                        </div>
                <div className='md:mx-10 mx-auto my-2 text-center'>
                    <Pagination
                        disabled={loading}
                        page={page+1} siblingCount={3}
                    count={totalPages} showFirstButton showLastButton
                    onChange={(event, page) => {
                        setpage(page-1)
                    }}
                    sx={{ m: 'auto' }}
                    shape='rounded'
                    onLoadStart={() => {
                        console.log("paginnation load start")
                    }}
                    onLoad={() => {
                        console.log("paginnation loaded")
              
                    }}
                />
                    </div>
                    </div>
            }
        </div>
    );
}

export default UserNotificationTable;
