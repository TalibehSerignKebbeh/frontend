
import React, { useState, useEffect } from 'react';
import { queryInstance } from '../../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ReportCard from "../Dashboard/card/ReportCard";
import  CircularProgress  from "@mui/material/CircularProgress";
import { formatNumber } from '../../other/format';
import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import  IconButton  from '@mui/material/IconButton';
import  Cancel  from '@mui/icons-material/Cancel';

const WeeklySalesReport = () => {
  
  const [money, setmoney] = useState(0);
  const [saleCount, setsaleCount] = useState(0);
  const [daysSale, setdaysSale] = useState([]);
  const [weekData, setweekData] = useState({ week:'' , year: ''});
  const [isLoading, setisLoading] = useState(false);
const [productCount, setproductCount] = useState(0);
  const resetData = () => {
    setdaysSale(prev => { return [] })
        setsaleCount(prev=>{return 0})
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
                    await queryInstance.get(`/sales/stats/week?week=${weekData?.week}&year=${weekData?.year}`)
                .then((res) => {
                  console.log(res);
                  setdaysSale(res?.data?.daysSale)
                  setmoney(res?.data?.money)
                  setsaleCount(res?.data?.saleCount)
                  setdaysSale(res?.data?.daysSale)
                  setproductCount(res?.data?.productCount)
                }).catch((err) => {
                console.log(err);
                })
              .finally(() => {
          setisLoading(false)
        })
     
  };
   handleGenerateReport()
        return () => {
            
        };
  }, [weekData?.week, weekData?.year]);
  
  const handleChangeWeek = (e) => {
    const { value } = e.target;
    const resultsArray = value?.split('-W')
    setweekData({week: resultsArray[1], year: resultsArray[0]})
  }
  return (
    <div className=' w-full overflow-x-scroll bg-gray-50 p-2 ml-1 border-2 border-zinc-200'>
      {/* <DatePicker picker='week'
       
        onChange={(val) => {
          console.log(val)
                    setweekData({
                        month:val?.$M,
                        year:val?.$y,
                    })
                }}
            /> */}
      <div className='flex gap-1 justify-between px-2 w-56 items-center'>

        <input className='w-9/12' type='week' onChange={handleChangeWeek} />
        <IconButton onClick={(e) => {
          setweekData({week:'', year:''})
        }}><Cancel  /></IconButton>
      </div>
      {isLoading ? 
        <div>
          <CircularProgress />
        </div> :
       <div>
       <div className="flex flex-row flex-wrap py-3 gap-2 px-2">
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
            <LineChart
        width={600}
        height={300}
        data={daysSale}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="money" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="productQuantity" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart> : null}
       </div>
          
      }
      
    </div>
  );
};

export default WeeklySalesReport;
