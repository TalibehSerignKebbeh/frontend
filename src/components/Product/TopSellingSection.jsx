import React, { useState } from 'react'
import TopSellingCard from '../Dashboard/card/TopSellingCard';
import { motion } from 'framer-motion'
import Button from '../Buttons/Button';
// import  MoneyOutlined  from '@mui/icons-material/MoneyOutlined';
// import AcUnitOutlined from '@mui/icons-material/AcUnitOutlined';

export default function TopSellingSection({ data }) {


  
  const { ByProfit, ByQuantity } = data;
  const [show, setshow] = useState(false); 
  const [openByProfit, setopenByProfit] = useState(true);

  if (!ByProfit?.length && !ByQuantity?.length) return null;

  return (
      <div className=' w-full bg-slate-300
       dark:bg-gray-700 rounded-lg mb-3
      flex flex-col  items-center justify-start
      md:px-3 sm:px-[5px] px-[1px] md:py-6 py-2'>
      {/* <div className='flex justify-start self-baseline justify-self-start gap-4
      py-8'>
        <section className='rounded-lg bg-slate-100 dark:bg-slate-500
        shadow-md shadow-slate-100 dark:shadow-slate-600
        text-gray-700 dark:text-slate-50 p-1 relative'>
          <button className='w-fit absolute m-auto -top-6 p-3 rounded-full 
          bg-lime-900 left-auto right-[59px]'>
            <MoneyOutlined sx={{color:'white', transform:'scale(1.5)'}}/>
          </button>
          <h6 className='text-base font-normal
          font-sans mt-5 '>Top Selling By Quantity</h6>
          <p className='text-sm font-normal font-sans'>
          {ByQuantity?.length }</p>
        </section>
         <section className='rounded-lg bg-slate-100 dark:bg-slate-500
         shadow-md shadow-slate-100 dark:shadow-slate-600
         text-gray-700 dark:text-slate-50 p-1 relative'>
          <button className='w-fit absolute m-auto -top-6 p-3 rounded-full 
          bg-teal-700 left-auto right-[59px]'>
            <AcUnitOutlined sx={{color:'white', transform:'scale(1.5)'}}/>
          </button>
          <h6 className='text-base font-normal
          font-sans mt-5 '>Top Selling By Money</h6>
          <p className='text-sm font-normal font-sans'>
          {ByProfit?.length }</p>
        </section>
        <section></section>
      </div> */}
      {/* <h2>Top Selling Section</h2> */}
      <Button text={`${show ? 'Hide' : 'Show'} Top Selling`}
        clickEvent={() => setshow(prev => !prev)}
        classNa={`bg-green-700 m-2
      text-white p-2 px-3 rounded-md self-start justify-self-start`}
      />
      
      <motion.div
        className='bg-gray-200 dark:bg-gray-700 mx-auto ml-0 md:px-4 px-[2px] py-3
         rounded-xl'
       initial={{ height: 0 }}
        animate={{ transition: '.8s',
          height: show ? 'auto' : '0px',
          opacity: show ? 1 : 0,
        }}>

       
        <Button text={`${openByProfit? 'Show By Quantity':'Show By Profit'} `}
          classNa={`bg-green-700  rounded-md
      text-white p-2 px-3 rounded-md self-center justify-self-start`}
          clickEvent={e => {
          setopenByProfit(prev=>!prev)
          }} />
      
    
      
      <motion.div
        className='justify-self-start ml-0 overflow-auto'
        initial={{ height: 0 }}
        animate={{ transition: '.8s',
          height: openByProfit ? 'auto' : '0px',
          opacity: openByProfit ? 1 : 0,
        }}
        >
          <h3 className='text-base font-normal font-sans
          py-2 px-3 bg-slate-500 text-white mt-2
           rounded-xl shadow'>
            Top Selling By Profit
          </h3>
      <div className='flex flex-wrap gap-1 justify-self-start py-3'>
        {ByProfit?.map((topInstance, index) => (
          <TopSellingCard key={index} isProfit={true}
            name={topInstance?.name}
            money={topInstance?.money}
            profit={topInstance?.profit}
            quantity={topInstance?.quantity}
          />
        ))}
          </div>
      </motion.div>
       <motion.div
        
        className='justify-self-start ml-0 overflow-auto'
          
        initial={{ height: 0 }}
        animate={{ transition: '.8s',
          height: !openByProfit ? 'auto' : '0px',
          opacity: !openByProfit ? 1 : 0,
        }}
        >
           <h3 className='text-base font-normal font-sans
          py-2 px-3 bg-slate-500 text-white mt-2
          rounded-xl shadow'>
            Top Selling By Quantity
          </h3>

      <div className='flex flex-wrap gap-1 justify-self-start py-3'>
        {ByQuantity?.map((topInstance, index) => (
          <TopSellingCard key={index} isProfit={false}
            name={topInstance?.name}
            money={topInstance?.money}
            profit={topInstance?.profit}
            quantity={topInstance?.quantity}
          />
        ))}
          </div>
        </motion.div>
      </motion.div>
      
    </div>
  )
}
