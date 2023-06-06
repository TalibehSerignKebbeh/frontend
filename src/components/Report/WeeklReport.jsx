
import React, { useState, useEffect } from 'react';
import { queryInstance } from '../../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ReportCard from "../Dashboard/card/ReportCard";
import CircularProgress from "@mui/material/CircularProgress";
import { formatNumber } from '../../other/format';
import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import IconButton from '@mui/material/IconButton';
import Cancel from '@mui/icons-material/Cancel';
import useAuth from '../../hooks/useAuth';
import { GetError } from '../other/OtherFuctions'
import ErrorMessage from '../StatusMessages/ErrorMessage'
import WeeklyChart from '../Dashboard/chats/WeeklyChart';

const WeeklySalesReport = () => {
  const { token } = useAuth()
  const [money, setmoney] = useState(0);
  const [saleCount, setsaleCount] = useState(0);
  const [daysSale, setdaysSale] = useState([]);
  const [weekData, setweekData] = useState({ week: '', year: '' });
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
    if (!weekData?.week?.length && !weekData?.year?.length) {
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

            setdaysSale(res?.data?.daysSale)
            setmoney(res?.data?.money)
            setsaleCount(res?.data?.saleCount)
            setdaysSale(res?.data?.daysSale)
            setproductCount(res?.data?.productCount)
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
  }, [token, weekData?.week, weekData?.year]);

  const handleChangeWeek = (e) => {
    const { value } = e.target;
    const resultsArray = value?.split('-W')
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
          className='w-auto  p-4 bg-white 
        dark:bg-slate-300 
        text-slate-800 dark:text-white'
          type='week' onChange={handleChangeWeek}

        />
        <IconButton className='bg-slate-600 dark:bg-slate-100
        text-white dark:text-slate-700
        hover:bg-slate-500
        dark:hover:bg-slate-200'
          onClick={(e) => {
            setweekData({ week: '', year: '' })
          }}><Cancel /></IconButton>
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
                <div className='w-fit md:mx-3 mx-auto
                overflow-x-scroll scroll-smooth
                bg-slate-300 py-5
                '>
                <WeeklyChart daysDate={daysSale} />
                </div> : null}
            </div>

      }

    </div>
  );
};

export default WeeklySalesReport;
