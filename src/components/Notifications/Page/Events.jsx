import React, {useEffect, useState} from 'react';
// import { useParams } from 'react-router-dom';
import ProductsUpdates from '../../Product/updates/ProductsUpdates';
import UserNotificationTable from '../Table/UserNotificationTable';
import './index.css'
import SalesEvents from '../Table/SalesEvents';
import Button from '../../Buttons/Button';

const Events = ({ showSideMenu, socket,setactiveNavLink }) => {
    
    const [tab, setTab] = useState("")

    useEffect(() => {
        if (!tab?.length) {
            const saved = localStorage.getItem('tab')
        setTab(saved?.length? saved : 'product')
        }
        // setactiveNavLink('events')
        return () => {
            localStorage.removeItem('tab')
        };
    }, [tab?.length]);

    
    return (
        <div className='relative '>
            {/* <h2>Events </h2> */}
            {/* <div className={` 
             py-2  bg-white dark:bg-slate-700
             shadow-slate-500 shadow-md 
            flex flex-row md:gap-14 sm:gap-2 gap-1
              w-fit p-2 m-3 mx-0 md:mb-8 sm:mb-5 mb-3
              `}
            >
                <button 
                onClick={e=>ChangeTab('product')} 
                className={`${tab==='product'? 'bg-green-400':'bg-slate-400'}  
                text-white text-2xl font-light rounded px-4 py-2 `}>
                Product
                </button>
                <button 
                onClick={e=>ChangeTab('sale')} 
                className={`${tab==='sale'? 'bg-green-400':'bg-slate-400'}  
                text-white text-2xl font-light rounded px-4 py-2 `}>
                Sale
                </button>
                <button 
                onClick={e=>ChangeTab('user')} 
                className={`${tab==='user'? 'bg-green-400':'bg-slate-400'}  
                text-white text-2xl font-light rounded px-4 py-2 `}>
                User
                </button>
            </div> */}
            <div className='bg-slate-500 dark:bg-slate-600
            md:w-1/3 sm:w-10/12 w-full px-3 py-3 flex gap-2 rounded-lg
            my-5 '>
                <Button
                    text={`Product`}
                    clickEvent={() => {
                        setTab('product')
                    }}  
                    classNa={`${tab === 'product' ? 'bg-slate-200 text-black' : 'bg-none text-white '} 
                    text-gray-600 dark:text-white
                    px-2 py-1 text-center rounded  text-lg`}
                />
                                <Button
                    text={`Sale`}
                   clickEvent={() => {
                        setTab('sale')
                    }}  
                    classNa={`${tab === 'sale' ? 'bg-slate-200 text-black' : 'bg-none text-white '}
                     text-gray-600 dark:text-white
                    px-2 py-1 text-center rounded text-lg `}
                />
                                <Button
                    text={`User`}
                   clickEvent={() => {
                        setTab('user')
                    }}  
                    classNa={`${tab === 'user' ? 'bg-slate-200 text-black' : 'bg-none text-white '}
                     text-gray-600 dark:text-white
                    px-2 py-1 text-center rounded  text-lg `}
              />
            </div>
            <div className=' bg-slate-100
             dark:bg-slate-950 
              mx-0
             '>
                {(tab==='product') && <ProductsUpdates socket={socket} 

                />}
                {(tab==='user') && <UserNotificationTable socket={socket}/>}
                {(tab === 'sale') && <SalesEvents socket={socket} 
                showSideMenu/>}
            </div>
                </div>
    );
}

export default Events;
