import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
import ProductsUpdates from '../../Product/updates/ProductsUpdates';
import UserNotificationTable from '../Table/UserNotificationTable';
import './index.css'
import SalesEvents from '../Table/SalesEvents';
import Button from '../../Buttons/Button';
import SalesFilters from '../../sales/SalesFilters';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../api';
import useAuth from '../../../hooks/useAuth';


const Events = ({ showSideMenu, socket, setactiveNavLink }) => {
    const { token } = useAuth()
    const [tab, setTab] = useState("product")
    const [date, setdate] = useState('');
    const [user, setuser] = useState('');

     const {data, isLoading} = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers({ token }),
    // suspense: true, 
    getNextPageParam: () => { },
    getPreviousPageParam: () => {
      
    },
    
  
  });

    const [searchFilters, setsearchFilters] = useState({
        date: '', product: '', user: ''
    });
    const handleTabChange = (value) => {
        // localStorage.setItem('tab', value)
        setTab(value)
   }
  

    return (
        <div className='relative md:px-3 sm:px-3 px-4 pb-6'>


            <div className='bg-slate-300 dark:bg-slate-600
            md:w-[400px] sm:w-[400px] w-full px-1 py-2 flex gap-0 rounded-lg
            my-5 '>
                <Button
                    text={`Product`}
                    clickEvent={() => handleTabChange('product')}
                    classNa={`px-3 py-1 ${tab === 'product' ? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Sale`}
                    clickEvent={() => handleTabChange('sale')}
                    classNa={`px-3 py-1 ${tab === 'sale' ? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white'}
                     text-gray-600 
                     text-center rounded text-xl `}
                />
                <Button
                    text={`User`}
                    clickEvent={() => handleTabChange('user')}
                    classNa={`px-3 py-1 ${tab === 'user' ? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white'}
                     text-gray-600 
                     text-center rounded  text-xl `}
                />
            </div>
            <div className=' bg-slate-100
             dark:bg-slate-950 
              mx-0
             '>
                <SalesFilters
                users={data?.users} 
                    user={user} setuser={setuser}
                    date={date} setdate={setdate}
                      product={''} setproduct={()=>{}}
                    searchFilters={searchFilters}
                    setsearchFilters={setsearchFilters}
                    showProduct={false}
                />
                {(tab === 'product') &&
                    <ProductsUpdates
                    users={data?.users}  socket={socket}
                    user={user}
                    date={date}
                />}
                {(tab === 'user') && <UserNotificationTable 
                users={data?.users} socket={socket}
                    user={user}
                    date={date}
                />}
                {(tab === 'sale') && <SalesEvents 
                users={data?.users} socket={socket}
                    showSideMenu
                    user={user}
                    date={date}
                />}
            </div>
        </div>
    );
}

export default Events;
