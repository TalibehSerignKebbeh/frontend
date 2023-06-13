
import React, { useState, useEffect } from 'react';
import { queryInstance } from '../../api';
import ReportCard from "../Dashboard/card/ReportCard";
import CircularProgress from "@mui/material/CircularProgress";
import { formatNumber } from '../../other/format';
import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import useAuth from '../../hooks/useAuth';
import { GetError } from '../other/OtherFuctions'
import ErrorMessage from '../StatusMessages/ErrorMessage'
import WeeklyChart from '../Dashboard/chats/WeeklyChart';
import TopSellingTables from './TopSellingTables';
import { MoneyOffOutlined } from '@mui/icons-material';
import PieChart from '../Charts/PieChart';
import MyDataGrid from '../sales/MyDataGrid';
function getCurrentWeekNumber() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;

  // Calculate the time difference between today and the first day of the year
  const timeDiff = today.getTime() - firstDayOfYear.getTime();

  // Calculate the number of weeks elapsed
  const weekNumber = Math.ceil(timeDiff / millisecondsPerWeek);

  return weekNumber;
}
const WeeklySalesReport = () => {
  const { token } = useAuth()
  const [money, setmoney] = useState(0);
  const [saleCount, setsaleCount] = useState(0);
  const [profit, setprofit] = useState(0);
  const [daysSale, setdaysSale] = useState([]);
  const [topSellingByProfit, settopSellingByProfit] = useState([]);
  const [topSellingByQuantity, settopSellingByQuantity] = useState([]);
  const [weekData, setweekData] = useState({ week: getCurrentWeekNumber(), year: new Date().getFullYear() });
  const [sales, setsales] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [isDataFetch, setisDataFetch] = useState(false);
  const [error, seterror] = useState('');
  const [productCount, setproductCount] = useState(0);
  const resetData = () => {
    setdaysSale(prev => { return [] })
    setsaleCount(prev => { return 0 })
    setmoney(prev => { return 0 })
    setproductCount(prev => { return 0 })

  }


  useEffect(() => {
    if (!weekData>0 && !weekData>0) {
      resetData()
      return
    }
    const handleGenerateReport = async () => {
      setisLoading(true)
      resetData()
      await queryInstance.get(`/sales/stats/week?week=${weekData?.week}&year=${weekData?.year}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          // console.log(res);
          if (res?.status === 200) {
              // console.log(res?.data);
            setdaysSale(res?.data?.daysSale)
            setmoney(res?.data?.money)
            setsaleCount(res?.data?.count)
            setprofit(res?.data?.profit)
            setdaysSale(res?.data?.daysSale)
            setproductCount(res?.data?.productCount)
            settopSellingByProfit(res?.data?.topSellingByProfit)
            settopSellingByQuantity(res?.data?.topSellingByQuantity)
            setsales(res?.data?.sales)
            setisDataFetch(true)
            return;
          }
          seterror(GetError(res))
        }).catch((err) => {
          // console.log(err);
          seterror(GetError(err))
        })
        .finally(() => {
          setisLoading(false)
        })

    };
    handleGenerateReport()
    return () => {

    };
  }, [token, weekData, weekData?.week, weekData?.year]);

  const handleChangeWeek = (e) => {
    const { value } = e.target;
    const resultsArray = value?.split('-W')
    console.log(value);
    setweekData({ week: resultsArray[1], year: resultsArray[0] })
  }
  return (
    <div className=' w-full overflow-x-scroll 
    bg-gray-50 dark:bg-gray-700 p-2 py-6'>

      <div style={{ marginBlock: '15px' }}
        className='flex gap-1 justify-between 
      px-2 w-56 items-center my-6'
      >
         
        <input style={{ marginLeft: '9px' }}
          className='w-auto  p-4 px-8 bg-white
          shadow-sm shadow-slate-50 
        dark:bg-slate-300 
        text-slate-800 dark:text-white 
        rounded-md'
          type='week'
          defaultValue={`${weekData?.year}-W${weekData?.week}`}
          max={`${weekData?.year}-W${weekData?.week}`}
          onChange={handleChangeWeek}

        />
        
      </div>
      {isLoading ?
        <div>
          <CircularProgress />
        </div> :
        !isDataFetch ?
          <div style={{ marginBlock: '40px', marginInline: '20px' }}
            className='py-5 px-2 my-4 bg-slate-400 w-fit
          text-black dark:text-slate-50'>
            <h3 className='font-normal text-xl'>
              Welcome to your weekly report section
            </h3>

          </div>
          :
          error?.length ?
            <div className='w-fit px-6'>
              <ErrorMessage error={error}
                handleReset={() => seterror('')} />
            </div>
            :
            <div>
              <div className="flex flex-row flex-wrap 
                  md:justify-start justify-center
                  gap-x-2 gap-y-4  py-3 px-2">
                 <ReportCard title={"Profit"} value={`D${formatNumber(profit)}`}
                  icon={<MoneyOffOutlined
                    sx={{
                      transform: "scale(1.6)",
                      color: "white",
                      bgcolor: "blueviolet",
                      borderRadius: "3px",
                    }}
                  />}
                />
                <ReportCard title={"Money"} value={`D${formatNumber(money)}`}
                  icon={<MoneyOffCsredOutlined
                    sx={{
                      transform: "scale(1.6)",
                      color: "white",
                      bgcolor: "blueviolet",
                      borderRadius: "3px",
                    }}
                  />}
                />
                <ReportCard title={"#Products"} value={productCount}
                  icon={<ProductionQuantityLimitsOutlined
                    sx={{
                      transform: "scale(1.6)",
                      color: "white",
                      bgcolor: "brown",
                      borderRadius: "3px",
                    }}
                  />}
                />
                <ReportCard title={"#Sales"} value={saleCount}
                  icon={<Inventory2Outlined
                    sx={{
                      transform: "scale(1.6)",
                      color: "white",
                      bgcolor: "darkmagenta",
                      borderRadius: "3px",
                    }}
                  />}
                />


              </div>
              {daysSale?.length ?
                <div className='w-full md:mx-3 mx-auto
                overflow-x-scroll scroll-smooth
                bg-slate-300 py-5
                flex gap-2 flex-wrap px-1 text-center'>
                  <WeeklyChart daysDate={daysSale} />
                  <PieChart data={daysSale}
                    xKey={'date'} yKey={'profit'}
                  />
                </div> : null}
              
              <TopSellingTables byProfit={topSellingByProfit}
                byQuantity={topSellingByQuantity}
              />
              <div className='my-6 lg:mx-6 md:mx-3 mx-0'>
                
              <MyDataGrid data={sales}
              loading={isLoading}/>
            </div>
            </div>

      }

    </div>
  );
};

export default WeeklySalesReport;
