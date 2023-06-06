import React, {useEffect, useRef, useState} from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';
import WeeklReport from './WeeklReport';
import  Collapse  from '@mui/material/Collapse';
// import { Button } from 'antd';

const SaleReport = ({socket, setactiveNavLink}) => {
    const [openAnnual, setopenAnnual] = useState(true);
    const [openMonth, setopenMonth] = useState(false);
    const [openWeek, setopenWeek] = useState(false);
    const annualRef = useRef(null)
    const monthRef = useRef(null)
    const weekRef = useRef(null)

   useEffect(() => {
    setactiveNavLink('report')
    return () => {
        
    };
   }, [setactiveNavLink]); 
    return (
        <div className='w-full flex flex-col gap-5 lg:py-7 md:py-4 py-3 '>
            {/* <h2>Hello from report page</h2> */}
            <div ref={annualRef}>
                <button
                    className={`' p-2 rounded-md m-2
                 bg-gray-200 
                    text-gray-900
                    hover:text-gray-700
                    dark:text-white 
                  dark:hover:text-white 
                  dark:hover:text-bold
                  lg:mx-3 md:mx-2 sm:mx-auto
                  mx-auto
                   '
                   ${openAnnual? 'bg-green-400':'bg-slate-400'}`}
                    onClick={e => setopenAnnual(prev => !prev)}
                    color='' >{openAnnual? 'Close':'Open'} Annual Report Section</button>
                <Collapse in={openAnnual} unmountOnExit>

                <AnnuanReport />
                </Collapse>
            </div>

            <div ref={monthRef}>
                <button
                    className={`' p-2 rounded-md m-2
                 bg-gray-400 
                    text-gray-900
                    hover:text-gray-700
                    dark:text-white 
                  dark:hover:text-white 
                  dark:hover:text-bold
                  lg:mx-3 md:mx-2 sm:mx-auto
                  mx-auto
                   ' ${openMonth? 'bg-green-400':'bg-slate-400'}
                   `}
                    onClick={e => setopenMonth(prev => !prev)}
                    color='success' >{openMonth? 'Close':'Open'} Month Report Section</button>
                <Collapse in={openMonth} unmountOnExit>

                <MonthlyReport />
                </Collapse>
            </div>

            <div ref={weekRef}>
                <button
                    className={`' p-2 rounded-md m-2 bg-gray-200 
                    text-gray-900 hover:text-gray-700
                    dark:text-white  dark:hover:text-white 
                  dark:hover:text-bold lg:mx-3 md:mx-2 sm:mx-auto
                  mx-auto
                   '
                   ${openWeek? 'bg-green-400':'bg-slate-400'}`}
                    onClick={e => setopenWeek(prev => !prev)}
                    color='success' >{openWeek? 'Close':'Open'} Week Report Section</button>
                <Collapse in={openWeek} unmountOnExit >

                <WeeklReport />
                </Collapse>
            </div>
        </div>
    );
}

export default SaleReport;
