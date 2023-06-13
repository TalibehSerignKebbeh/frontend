import React, {  useRef, useState } from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';
import WeeklReport from './WeeklReport';
import DateReportComponent from './DateReportComponent';
import IntervalReport from './IntervalReport';
import Collapse from '@mui/material/Collapse';
import Button from '../Buttons/Button';


const SaleReport = ({ socket, setactiveNavLink }) => {
    const [openAnnual, setopenAnnual] = useState(false);
    const [openMonth, setopenMonth] = useState(false);
    const [openWeek, setopenWeek] = useState(false);
    const [openInterval, setopenInterval] = useState(false);
    const [openDay, setopenDay] = useState(true);
    const annualRef = useRef(null)
    const monthRef = useRef(null)
    const weekRef = useRef(null)
    const intervalRef = useRef(null)
    const dayRef = useRef(null)

  
    return (
        <div className='w-full flex flex-col gap-5 lg:py-7 
        md:py-4 py-[10px] border
        '>
            <h2 className='text-3xl 
            text-green-800 dark:text-yellow-50
            font-light px-2
            '>Report Generation Section</h2>
            <div className='bg-slate-300 dark:bg-slate-600
            w-fit px-2 py-2 flex gap-2 rounded-sm '>
                 <Button
                    text={`Day`}
                    clickEvent={() => {
                        setopenAnnual(false)
                        setopenMonth(false)
                        setopenWeek(false)
                        setopenInterval(false)
                        setopenDay(true)

                    }}
                    classNa={`px-3 py-1 ${openDay? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Annual `}
                    clickEvent={() => {
                        setopenAnnual(true)
                        setopenMonth(false)
                        setopenWeek(false)
                        setopenInterval(false)
                        setopenDay(false)
                    }}
                    classNa={`px-3 py-1 ${openAnnual? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Month `}
                    clickEvent={() => {
                        setopenAnnual(false)
                        setopenMonth(true)
                        setopenWeek(false)
                        setopenInterval(false)
                        setopenDay(false)

                    }}
                    classNa={`px-3 py-1 ${openMonth? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Week`}
                    clickEvent={() => {
                        setopenAnnual(false)
                        setopenMonth(false)
                        setopenWeek(true)
                        setopenInterval(false)
                        setopenDay(false)

                    }}
                    classNa={`px-3 py-1 ${openWeek? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                 <Button
                    text={`Interval`}
                    clickEvent={() => {
                        setopenAnnual(false)
                        setopenMonth(false)
                        setopenWeek(false)
                        setopenInterval(true)
                        setopenDay(false)

                    }}
                    classNa={`px-3 py-1 ${openInterval? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
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
            <div ref={intervalRef}>
                <Collapse in={openInterval} unmountOnExit >

                    <IntervalReport />
                </Collapse>
            </div>
             <div ref={dayRef}>
                <Collapse in={openDay} unmountOnExit >

                    <DateReportComponent />
                </Collapse>
            </div>
        </div>
    );
}

export default SaleReport;
