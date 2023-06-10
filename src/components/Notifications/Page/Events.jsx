import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import ProductsUpdates from '../../Product/updates/ProductsUpdates';
import UserNotificationTable from '../Table/UserNotificationTable';
import './index.css'
import SalesEvents from '../Table/SalesEvents';
import Button from '../../Buttons/Button';
import SalesFilters from '../../sales/SalesFilters';


const Events = ({ showSideMenu, socket, setactiveNavLink }) => {

    const [tab, setTab] = useState("")
    const [date, setdate] = useState('');
    const [user, setuser] = useState('');

    const [searchFilters, setsearchFilters] = useState({
        date: '', product: '', user: ''
    });

    useEffect(() => {
        if (!tab?.length) {
            const saved = localStorage.getItem('tab')
            setTab(saved?.length ? saved : 'product')
        }
        // setactiveNavLink('events')
        return () => {
            localStorage.removeItem('tab')
        };
    }, [tab?.length]);


    return (
        <div className='relative '>


            <div className='bg-slate-300 dark:bg-slate-600
            md:w-[400px] sm:w-[400px] w-full px-1 py-2 flex gap-0 rounded-lg
            my-5 '>
                <Button
                    text={`Product`}
                    clickEvent={() => {
                        setTab('product')
                    }}
                    classNa={`px-3 py-1 ${tab === 'product' ? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Sale`}
                    clickEvent={() => {
                        setTab('sale')
                    }}
                    classNa={`px-3 py-1 ${tab === 'sale' ? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white'}
                     text-gray-600 
                     text-center rounded text-xl `}
                />
                <Button
                    text={`User`}
                    clickEvent={() => {
                        setTab('user')
                    }}
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
                    user={user} setuser={setuser}
                    date={date} setdate={setdate}
                      product={''} setproduct={()=>{}}
                    searchFilters={searchFilters}
                    setsearchFilters={setsearchFilters}
                    showProduct={false}
                />
                {(tab === 'product') && <ProductsUpdates socket={socket}
                    user={user}
                    date={date}
                />}
                {(tab === 'user') && <UserNotificationTable socket={socket}
                    user={user}
                    date={date}
                />}
                {(tab === 'sale') && <SalesEvents socket={socket}
                    showSideMenu
                    user={user}
                    date={date}
                />}
            </div>
        </div>
    );
}

export default Events;
