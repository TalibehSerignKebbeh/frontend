import React, {  useEffect, useRef, useState } from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';
import WeeklReport from './WeeklReport';
import DateReportComponent from './DateReportComponent';
import IntervalReport from './IntervalReport';
import Collapse from '@mui/material/Collapse';
import Button from '../Buttons/Button';


const SaleReport = ({ socket, setactiveNavLink }) => {
    const tabName = 'reportTab'
    const [reportTab, setReportTab] = useState('day');
    const annualRef = useRef(null)
    const monthRef = useRef(null)
    const weekRef = useRef(null)
    const intervalRef = useRef(null)
    const dayRef = useRef(null)

    useEffect(() => {
        setReportTab(localStorage.getItem(tabName) || 'day')
        return () => {
           localStorage.removeItem(tabName)
       }
    }, [tabName])
   
    const handleChangeReportTab = (tabValue) => {
        localStorage.setItem(tabName, tabValue)
        setReportTab(tabValue)
    }
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
                    clickEvent={() => handleChangeReportTab('day')}
                    classNa={`px-3 py-1 ${reportTab==='day'? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Annual `}
                    clickEvent={() =>handleChangeReportTab('annual')}
                    classNa={`px-3 py-1 ${reportTab==='annual'? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Month `}
                    clickEvent={() => handleChangeReportTab('month')}
                    classNa={`px-3 py-1 ${reportTab==='month'? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                <Button
                    text={`Week`}
                    clickEvent={() => handleChangeReportTab('week')}
                    classNa={`px-3 py-1 ${reportTab==='week'? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                 <Button
                    text={`Interval`}
                    clickEvent={() => handleChangeReportTab('interval')}
                    classNa={`px-3 py-1 ${reportTab==='interval'? 'bg-slate-100 text-black' : 'bg-none text-white dark:text-white '} 
                    text-gray-600 
                     text-center rounded  text-xl`}
                />
                 
            </div>
            <div ref={annualRef}>
                <Collapse in={reportTab ==='annual'} unmountOnExit>

                    <AnnuanReport />
                </Collapse>
            </div>

            <div ref={monthRef}>

                <Collapse in={reportTab ==='month'} unmountOnExit>

                    <MonthlyReport />
                </Collapse>
            </div>

            <div ref={weekRef}>
                <Collapse in={reportTab ==='week'} unmountOnExit >

                    <WeeklReport />
                </Collapse>
            </div>
            <div ref={intervalRef}>
                <Collapse in={reportTab ==='interval'} unmountOnExit >

                    <IntervalReport />
                </Collapse>
            </div>
             <div ref={dayRef}>
                <Collapse in={reportTab ==='day'} unmountOnExit >

                    <DateReportComponent />
                </Collapse>
            </div>
        </div>
    );
}

export default SaleReport;
