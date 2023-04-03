import React, {useState} from 'react';
import { queryInstance } from '../../api';
import ReportForm from './ReportForm';

const MonthlyReport = () => {
    const [monthData, setmonthData] = useState({ year: '', month: '' });
    const [data, setdata] = useState('');
     const [isLoading, setisLoading] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);


    
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!data?.length) return;
        const month = Number(data?.slice(data?.length - 2))
        const year = Number(data?.slice(0, 4))
         await queryInstance
        .get(`/sales/stats/month?year=${year}&month=${month}`)
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            setloadSuccess(true)
               }
        })
        .catch((err) => {
            setloadSuccess(false)
          console.log(err);
        })
        .finally(() => {
          setisLoading(false);
        });
    }

    return (
        <div className='w-auto bg-stone-300 p-2'>
               <h2 className="py-3 ">Monthly Report Section</h2>
            <ReportForm value={data} setvalue={setdata}
                handleSubmit={handleSubmit} 
                type={'month'} name={'month'}
                />
         
        </div>
    );
}

export default MonthlyReport;
