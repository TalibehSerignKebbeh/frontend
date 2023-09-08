import React, { useState, useEffect } from 'react';
import { queryInstance } from '../../api';
import { CircularProgress } from '@mui/material';
import { DatePicker } from 'antd';
import useAuth from '../../hooks/useAuth';
import MyPieChart from '.././Charts/PieChart'
import ProductsStatsTable from '../Product/ProductsStatsTable';
import { monthNames } from '../../other/format';
import MyDataGrid from '../sales/MyDataGrid';
import SummaryReport from './SummaryReport';




const MonthlyReport = () => {
  const {token} = useAuth()
  // const [date, setdate] = useState('');
  const [monthDate, setmonthDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  const [isLoading, setisLoading] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);
  const [money, setmoney] = useState(0);
  const [profit, setprofit] = useState(0);
  const [count, setcount] = useState(0);
  const [productCount, setproductCount] = useState(0);
  const [weekData, setweekData] = useState([]);
  const [topSellingByProfit, settopSellingByProfit] = useState([]);
  const [topSellingByQuantity, settopSellingByQuantity] = useState([]);
  const [sales, setsales] = useState([]);
  // const COLORS =   ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FFA15C', '#666666'];

  useEffect(() => {
    const handleSubmit = async () => {
      // e.preventDefault()
      setloadSuccess(false)
      setisLoading(false)
      setweekData([])
      await queryInstance
        .get(`/sales/stats/month?year=${monthDate?.year}&month=${monthDate?.month}`, {headers:{Authorization:`Bearer ${token}`}})
        .then((res) => {
          if (res?.status === 200) {
          console.log(res?.data);
            setloadSuccess(true)
            setweekData(res?.data?.weeklySales)
            settopSellingByProfit(res?.data?.topSellingByProfit)
            settopSellingByQuantity(res?.data?.topSellingByQuantity)
            setmoney(res?.data?.money)
            setcount(res?.data?.count)
            setprofit(res?.data?.profit)
            setproductCount(res?.data?.quantity)
            setsales(res?.data?.sales)
          }
        })
        .catch((err) => {
          setloadSuccess(false)
          // console.log(err);
        })
        .finally(() => {
          setisLoading(false);
        });
    }
    handleSubmit()
    return () => {

    };
  }, [monthDate?.month, monthDate?.year, token]);


  // const getUniqueColor = (index) => COLORS[index % COLORS.length];



  return (
    <div className='w-full bg-gray-50 dark:bg-slate-700 p-2'>
      <h2 className="py-3 text-lg font-sans mt-3
      text-gray-700 dark:text-gray-50 ">Monthly Report Section</h2>

      <DatePicker
        picker="month" allowClear
        // className='' 
        className='bg-white dark:bg-slate-400 
        text-gray-600dark:text-white
        mb-4 p-3 text-lg '
        
        // value={`${monthDate?.year}-${monthDate?.month}`}
        onChange={(val) => {
          setmonthDate({ year: val?.$y, month: val?.$M })
        }}
      />

      {
        isLoading ? <CircularProgress sx={{ margin: 'auto' }} /> :
          loadSuccess ?
            <div>
                            <h2 className="p-2 mt-2 text-3xl font-sans 
              font-bold text-teal-700 dark:text-white">
                {`${monthNames[monthDate?.month]} ${monthDate?.year} report`}
              </h2>
              <SummaryReport 
                money={money} profit={profit}
                productQuantity={productCount}
                count={count}
             />

            {weekData?.length ?
              <div className='flex flex-wrap w-full py-3 md:gap-x-3 gap-x-1 gap-y-2 
              items-center justify-start
              bg-slate-300
              '>
                <>

                {/* <div className=''>
                  <BarChart width={300} height={400}
                    data={weekData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" 
                      
                  />
                  <XAxis dataKey="week" />
                  <YAxis dataKey={'money'}/>
                  <Tooltip />
                  <Legend />
                  <LabelList  />
              
                    <Bar dataKey="money" fill='#8884d8' fillRule='inherit' barSize={30} spacing={3}
                      colorRendering={2} g1={10} g2={10}
                    />
                    
                  </BarChart>
                </div> */}
                </>
                  
                <div className='min-w-fit h-[410px] sm:w-[360px] w-full
                border border-zinc-300'>
                  <h3 className='text-teal-600 text-lg md:px-6 px-2'>
                  Weekly Money
                  </h3>
                  <MyPieChart data={weekData}
                  xKey={'week'} yKey={'money'}/>
                </div>
                <div className='min-w-fit h-[410px] sm:w-[360px] w-full
                border border-zinc-300'>
                  <h3 className='text-teal-600 text-lg md:px-6 px-2'>
                  Weekly Profit
                  </h3>
                  <MyPieChart data={weekData}
                  xKey={'week'} yKey={'profit'}/>
                </div>
                <div className='flex flex-wrap gap-2 
                  md:px-5 sm:px-2 px-0 md:mt-10 mt-5
                '>
                  <div>
                    <h3 className='text-teal-600 text-lg
                    md:px-7 px-2'>
                  Top Selling by Profit
                  </h3>
                      <ProductsStatsTable data={topSellingByProfit} 
                        type={'profit'}
                />
                  </div>
                  <div>
                  <h3 className='text-teal-600 text-lg
                  md:px-7 px-2'>
                  Top Selling by quantity
                  </h3>
                      <ProductsStatsTable data={topSellingByQuantity} 
                        type={'quantity'}
                    />
                  </div>
                    
                  </div>
                  <MyDataGrid data={sales}
                  loading={isLoading}/>
              </div>
              : null}
          </div> : null
      }
    </div>
  );
}

export default MonthlyReport;
