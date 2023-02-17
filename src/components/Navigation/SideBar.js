import React, { useState } from 'react';
import { Button, Typography } from '@mui/material'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
    ProductionQuantityLimits, 
     AddCircleOutlineRounded,  Inventory2Outlined, PointOfSaleSharp, ReportOutlined
} from '@mui/icons-material'
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { BiUserPlus } from 'react-icons/bi';
const SideBar = () => {
    // &#9776;
    const [show, setshow] = useState(true);
    const {token} = useAuth()
    const handleNavToggle = e => {
        setshow(prev=>!prev)
    }

    if (!token)
        return null
    return (
        <div className={`${show ? 'sidebar-main-active flex flex-col overflow-y-scrol'
            : 'w-0 sidebar-main  '}  bg-white  clear-both mt-0 text-start
             transition-all fixed z-10`}
        >
            <Button onClick={handleNavToggle} disableTouchRipple disableFocusRipple
                sx={{ fontSize: '1.2rem', ml: 'auto', color:'black'}}
                className={`menu-toggle-btn ${show ? 'ml-auto' : 'md:ml-0 -m-1'} 
                   w-auto ml-auto zIndex-2 -mr-8 text-2xl pointer p-0 md:relative absolute `}
                >
                &#9776;
            </Button>

            <div className={`${show ? 'w-full' : 'w-0'} flex flex-col 
                         content-center items-start gap-y-2`}>
                <Link to='/dashboard' className={`${show ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg before:h-8 before:w-2 
                       before:bg-green-300 before:float-left before:-ml-6 before:rounded-md'>
                         &#9776;
                    </button>
               <Typography className='ml-3'>Dashboard</Typography>
                </Link>
                 <Link to='/sales' className={`${show ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                         <PointOfSaleSharp  />
                    </button>
               <Typography>Sales</Typography>
                </Link>
                 <Link to='/stocks' className={`${show ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                         <ProductionQuantityLimits />
                    </button>
               <Typography>Stock</Typography>
                </Link>
                <Link to='/products/add' className={`${show ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                         <AddCircleOutlineRounded />
                    </button>
               <Typography>AddStock</Typography>
                </Link>
                 <Link to='/products' className={`${show ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                         <Inventory2Outlined />
                    </button>
               <Typography>Products</Typography>
                </Link>
                
            
                 <Link to='/users' className={`${show ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                         <AiOutlineUserSwitch />
                    </button>
               <Typography>Users</Typography>
                </Link>
                 <Link to='/users/add' className={`${show ? 'w-full ml-5 ' : '-ml-96'} mr-auto
                 m-auto text-start justify-start flex flex-row gap-x-7 items-center 
                 transition-all `}
                >
                    <button className='text-lg'>
                        
                        <BiUserPlus />
                    </button>
               <Typography>Add User</Typography>
                </Link>

            </div>
           

        </div>
    );
}

export default SideBar;
