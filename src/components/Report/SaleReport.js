import React, {useRef, useState} from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';
import WeeklReport from './WeeklReport';
import  Collapse  from '@mui/material/Collapse';
import { Button } from 'antd';

const SaleReport = () => {
    const [openAnnual, setopenAnnual] = useState(true);
    const [openMonth, setopenMonth] = useState(false);
    const [openWeek, setopenWeek] = useState(false);
    const annualRef = useRef(null)
    const monthRef = useRef(null)
    const weekRef = useRef(null)

    const ScrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth'

        })
   }
    return (
        <div className='w-full flex flex-col gap-5 '>
            {/* <h2>Hello from report page</h2> */}
            <div ref={annualRef}>
                <Button className='m-2 bg-green-400 hover:text-white hover:text-bold text-white '
                    onClick={e => setopenAnnual(prev => !prev)}
                    color='success' >{openAnnual? 'Close':'Open'} Annual Report Section</Button>
                <Collapse in={openAnnual} >

                <AnnuanReport />
                </Collapse>
            </div>

            <div ref={monthRef}>
 <Button className='m-2 bg-green-400 hover:text-white hover:text-bold text-white '
                    onClick={e => setopenMonth(prev => !prev)}
                    color='success' >{openMonth? 'Close':'Open'} Month Report Section</Button>
                <Collapse in={openMonth} >

                <MonthlyReport />
                </Collapse>
            </div>

            <div ref={weekRef}>
                 <Button className='m-2 bg-green-400 hover:text-white hover:text-bold text-white '
                    onClick={e => setopenWeek(prev => !prev)}
                    color='success' >{openWeek? 'Close':'Open'} Week Report Section</Button>
                <Collapse in={openWeek} >

                <WeeklReport />
                </Collapse>
            </div>
        </div>
    );
}

export default SaleReport;
