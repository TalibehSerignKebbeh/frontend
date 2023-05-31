import React, {useRef, useState} from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';
import WeeklReport from './WeeklReport';
import  Collapse  from '@mui/material/Collapse';
// import { Button } from 'antd';

const SaleReport = () => {
    const [openAnnual, setopenAnnual] = useState(true);
    const [openMonth, setopenMonth] = useState(false);
    const [openWeek, setopenWeek] = useState(false);
    const annualRef = useRef(null)
    const monthRef = useRef(null)
    const weekRef = useRef(null)

    return (
        <div className='w-full flex flex-col gap-5 '>
            {/* <h2>Hello from report page</h2> */}
            <div ref={annualRef}>
                <button
                    className=' p-2 rounded-md m-2
                 bg-gray-200 dark:bg-slate-800
                    text-gray-900
                    hover:text-gray-700
                    dark:text-white 
                  dark:hover:text-white 
                  dark:hover:text-bold
                  lg:mx-3 md:mx-2 sm:mx-auto
                  mx-auto
                   '
                    onClick={e => setopenAnnual(prev => !prev)}
                    color='' >{openAnnual? 'Close':'Open'} Annual Report Section</button>
                <Collapse in={openAnnual} unmountOnExit>

                <AnnuanReport />
                </Collapse>
            </div>

            <div ref={monthRef}>
                <button
                    className=' p-2 rounded-md m-2
                 bg-gray-200 dark:bg-slate-800
                    text-gray-900
                    hover:text-gray-700
                    dark:text-white 
                  dark:hover:text-white 
                  dark:hover:text-bold
                  lg:mx-3 md:mx-2 sm:mx-auto
                  mx-auto
                   '
                    onClick={e => setopenMonth(prev => !prev)}
                    color='success' >{openMonth? 'Close':'Open'} Month Report Section</button>
                <Collapse in={openMonth} unmountOnExit>

                <MonthlyReport />
                </Collapse>
            </div>

            <div ref={weekRef}>
                <button
                    className={`' p-2 rounded-md m-2 bg-gray-200 dark:bg-slate-800
                    text-gray-900 hover:text-gray-700
                    dark:text-white  dark:hover:text-white 
                  dark:hover:text-bold lg:mx-3 md:mx-2 sm:mx-auto
                  mx-auto
                   '
                   ${openWeek? 'bg-green-300':'bg-slate-300'}`}
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
