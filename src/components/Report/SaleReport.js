import React, {useEffect, useRef, useState} from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';
import WeeklReport from './WeeklReport';
import  Collapse  from '@mui/material/Collapse';
import Button from '../Buttons/Button';
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
            
            <div className='bg-slate-500 dark:bg-slate-600
            w-fit px-2 py-2 flex gap-2 rounded-lg '>
                <Button
                    text={`Annual Report`}
                    clickEvent={() => {
                        setopenAnnual(true)
                        setopenMonth(false)
                        setopenWeek(false)
                    }}  
                    classNa={`${openAnnual? 'bg-slate-200': 'bg-none'} text-gray-600 dark:text-white
                    px-2 py-2 text-center rounded `}
                />
                                <Button
                    text={`Month Report`}
                    clickEvent={() => {
                        setopenAnnual(false)
                        setopenMonth(true)
                        setopenWeek(false)
                    }}  
                    classNa={`${openMonth? 'bg-slate-200': 'bg-none'} text-gray-600 dark:text-white
                    px-2 py-2 text-center rounded `}
                />
                                <Button
                    text={`Week Report`}
                    clickEvent={() => {
                        setopenAnnual(false)
                        setopenMonth(false)
                        setopenWeek(true)
                    }}  
                    classNa={`${openWeek? 'bg-slate-200': 'bg-none'} text-gray-600 dark:text-white
                    px-2 py-2 text-center rounded `}
              />
            </div>
            <div ref={annualRef}>
             <Collapse in={openAnnual} unmountOnExit>

                <AnnuanReport />
                </Collapse>
            </div>

            <div ref={monthRef}>
    
                <Collapse in={openMonth} unmountOnExit>

                <MonthlyReport />
                </Collapse>
            </div>

            <div ref={weekRef}>
                 <Collapse in={openWeek} unmountOnExit >

                <WeeklReport />
                </Collapse>
            </div>
        </div>
    );
}

export default SaleReport;
