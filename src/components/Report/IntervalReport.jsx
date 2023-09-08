import React, { useState, useEffect } from 'react'
import { DatePicker, } from 'antd'
import { queryInstance } from '../../api';
import useAuth from '../../hooks/useAuth';
import { GetError } from '../other/OtherFuctions';
import MyDataGrid from '../sales/MyDataGrid';
import SkeletonLoaders from '../Loaders/SkelelonLoader';
import SummaryReport from './SummaryReport';


const { RangePicker } = DatePicker

export default function IntervalReport() {
  // const client = new QueryClient()
  const { token } = useAuth()
  const [sales, setsales] = useState([]);
  const [stats, setstats] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [selectedRange, setselectedRange] = useState({
    startDate: null, endDate: null
  });



  const handleChange = (value) => {
    // console.log(value);
    const start_date = new Date(value[0]?.$d)
    const end_date = new Date(value[1]?.$d)
    console.log(start_date, end_date);
    setselectedRange({
      ...selectedRange, startDate: start_date,
      endDate: end_date
    })
  }

  useEffect(() => {
    if (!selectedRange?.endDate || !selectedRange?.startDate) {
      return;
    }
    const handleGenerateReport = async () => {
      setisLoading(true)
      await queryInstance.get(`/sales/stats/interval`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { ...selectedRange }
        })
        .then((res) => {
          // console.log(res);
          if (res?.status === 200) {
            // console.log(res?.data);
            setsales(res?.data?.sales)
            setstats(res?.data?.stats[0])
            return;
          }
          seterror(GetError(res))
        }).catch((err) => {
          console.log(err);
          seterror(GetError(err))
        })
        .finally(() => {
          setisLoading(false)
        })

    };
    handleGenerateReport()
    return () => {

    };
  }, [selectedRange, token]);


  return (
    <div>
      <div className='py-2 md:px-2 sm:px-[2px]
      px-[1px]'>
        <h4 className='text-slate-700 dark:text-yellow-50'>
          Choose a date range
        </h4>
        <RangePicker
          className='p-3 text-2xl'
          // popupStyle={{}}
          //   disabledDate={()=>}
          onChange={handleChange}
          
        //  defaultValue={[new Date(), new Date()]}
        />
      </div>
      {isLoading ?
        <div>
          <SkeletonLoaders />
        </div> :
        <div className='w-full h-auto'>
          <div>

          </div>
          {stats ? 
        <SummaryReport 
              money={stats?.money}
              profit={stats?.profit}
              count={stats?.count}
               productQuantity={stats?.quantity}
        />    
        : null}
        <MyDataGrid data={sales} loading={isLoading}/>
      </div>}

    </div>
  )
}
