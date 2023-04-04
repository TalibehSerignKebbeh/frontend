import React, {useState} from 'react';
import { queryInstance } from '../../api';
import ReportForm from './ReportForm';
import MonthWeekly from '../Dashboard/chats/MonthWeekly';

const MonthlyReport = () => {
    const [date, setdate] = useState('');
     const [isLoading, setisLoading] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);
  const [weekData, setweekData] = useState([]);



    
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!date?.length) return;
        const month = Number(date?.slice(date?.length - 2))
        const year = Number(date?.slice(0, 4))
         await queryInstance
        .get(`/sales/stats/month?year=${year}&month=${month}`)
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            setloadSuccess(true)
            setweekData(res?.data?.weeklySales)
               }
        })
        .catch((err) => {
            setloadSuccess(false)
          console.log(err);
        })
        .finally(() => {
          setisLoading(false);
          if (weekData?.length > 1) {
            const sortedData = weekData?.sort((a, b) => a - b)
            setweekData(sortedData)
          }
        });
    }

    return (
        <div className='w-full bg-slate-300 p-2'>
               <h2 className="py-3 ">Monthly Report Section</h2>
            <ReportForm value={date} setvalue={setdate}
                handleSubmit={handleSubmit} 
                type={'month'} name={'month'}
                />
           <MonthWeekly data={weekData}/> 
        </div>
    );
}

export default MonthlyReport;
