import React, {useState, useEffect} from 'react';
import { queryInstance } from '../../../api';
// import { useParams } from 'react-router-dom';
import ProductsUpdates from '../../Product/updates/ProductsUpdates';
import UserNotificationTable from '../Table/UserNotificationTable';
import './index.css'
import SalesEvents from '../Table/SalesEvents';

const Notification = () => {
    // const { tab } = useParams()
    const [tab, setTab] = useState("product")
    let allowedProps=['model','action']
    let models=['product', 'sale', 'stock', 'auth']
    const [filters, setfilters] = useState({
        model:'', action:'',
    });
    let actions = {
        product: ["add", 'update'],
        sale: ['add', 'restore','update', 'delete'],
        stock:['add', 'update','delete'],
        auth:['login', 'logout']
    }
    const handleChangeFilters = (e) => {
        const { target: { value, name } } = e;
        setfilters({...filters, [name]:value})
    }
    const handleFilterNotification = async () => {
        if (!filters?.model?.length) {
            delete filters.model
        }
        if (!filters?.action?.length) {
            delete filters.action
        }

        await queryInstance.get(`notifications`, { params: filters })
            .then(res => {
            console.log(res);
            })
            .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className='relative '>
            {/* <h2>Notification </h2> */}
            <div className='bg-white shadow-slate-500 shadow-md 
            flex flex-row md:gap-14 sm:gap-2 gap-1
             px-2 py-2 w-full mt-3 md:mb-8 sm:mb-5 mb-3'>
                <button 
                onClick={e=>setTab('product')} 
                className={`${tab==='product'? 'tab active':'tab'}  
                text-2xl font-light`}>
                Product
                </button>
                <button 
                onClick={e=>setTab('sale')} 
                className={`${tab==='sale'? 'tab active':'tab'}  
                text-2xl font-light`}>
                Sale
                </button>
                <button 
                onClick={e=>setTab('user')} 
                className={`${tab==='user'? 'tab active':'tab'}  
                text-2xl font-light`}>
                User
                </button>
            </div>
            <div>
                {(tab==='product') && <ProductsUpdates />}
                {(tab==='user') && <UserNotificationTable />}
                {(tab === 'sale') && <SalesEvents />}
            </div>
            {/* <div className='sticky top-0 p-1 py-2 bg-orange-200 h-72
            flex flex-col flex-wrap md:gap-3 gap-1 '>
              <div className="filter_input">
                    <label htmlFor="model">
                        Model
              </label>
                    <select className='ml-2 boder-2 border-gray-400 focus:border-red-200
                    px-2'
                     name="model" id="model"
                        value={filters?.model}
                        onChange={handleChangeFilters}
                        >
                            <option value={''}>None</option>
                        {models?.map((value, ind)=>(
                            <option key={value} value={value}>{value }</option>
                        ))}
                    </select>
              
              </div>
          
              <div className="filter_input">
              <label htmlFor="">Action
              </label>
                    <select className='ml-2 boder-2 border-gray-400 focus:border-red-200
                    px-2'
                     name="action" id="action"
                        value={filters?.action}
                    onChange={handleChangeFilters}>
                            <option value={''}>None</option>

                        {filters.model === 'product' &&
                            actions?.product?.map((value, ind) => (
                            <option key={value} value={value}>{value }</option>
                            ))}
                        {filters.model === 'sale' &&
                            actions?.sale?.map((value, ind) => (
                            <option key={value} value={value}>{value }</option>
                            ))}
                        {filters.model === 'stock' &&
                            actions?.stock?.map((value, ind) => (
                            <option key={value} value={value}>{value }</option>
                        ))}
                    </select>
              
                </div>
                <button onClick={handleFilterNotification}>Apply filters</button>
            </div> */}
         </div>
    );
}

export default Notification;
