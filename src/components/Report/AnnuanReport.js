import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import { formatNumber } from "../../other/format";
import ReportCard from "../Dashboard/card/ReportCard";
import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DatePicker } from "antd";
import useAuth from "../../hooks/useAuth";
import {motion} from 'framer-motion'
import SkeletonLoaders from "../Loaders/SkelelonLoader";
import CustomBarChart from "../Dashboard/chats/CustomBarChart";
import MyDataGrid from "../sales/MyDataGrid";

const AnnuanReport = () => {
  const {token} = useAuth()
  const [year, setyear] = useState(new Date().getFullYear());
  const [money, setmoney] = useState(0);
  const [profit, setprofit] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [salesInstances, setsaleCount] = useState(0);
  const [monthLySale, setmonthLySale] = useState([]);
  const [quarterlySale, setquarterlySale] = useState([]);
  const [sales, setsales] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);
  const resetData = () => {
     setmoney(prev => {
      return 0
    });
    setmonthLySale(prev => {
      return []
    });
    setquarterlySale(prev => {
      return []
    });
    setproductQuantity(prev => {
      return 0
    });
    setsaleCount(prev => {
      return 0
    })
  }
  useEffect(() => {
    if (!year?.toString().length > 0) {
      resetData()
      setisLoading(false)
      return;
    }
const handleFetchYearReport = async (e) => {
    //  e.preventDefault();
  resetData()
    setisLoading(true);
    setloadSuccess(false)
    // const year = year?.slice(0, 4);

    await queryInstance
      .get(`/sales/stats/year?year=${Number(year)}`, {
        responseType:'json',headers:{Authorization:`Bearer ${token}`}
      })
      .then((res) => {
        // console.log(res);
        if (res?.status === 200) {
          console.log(res?.data);
          setloadSuccess(true);
          setmoney(res?.data?.money);
          setprofit(res?.data?.profit);
          setmonthLySale(res?.data?.monthSales);
          setquarterlySale(res?.data?.quarterSales);
          setproductQuantity(res?.data?.quantity);
          setsaleCount(res?.data?.count)
          setsales(res?.data?.sales)
          return
        }

      })
      .catch((err) => {
        setloadSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
    handleFetchYearReport()
    return () => {

    };
  }, [token, year]);

  return (
    <div className=" w-full bg-zinc-50 dark:bg-slate-700 
    p-2 lg:mx-3 md:mx-1 mx-0
    text-slate-800 dark:text-white">
      <h4 className="py-3 pb-1 text-lg -mb-[6px]
       font-normal">Select Year</h4>
      <DatePicker picker="year"
        // style={{ color: 'black', border: 'black' }}
         className='bg-white dark:bg-slate-400 
        text-gray-600dark:text-white
        mb-4 p-3 text-lg'
        onChange={(val) => {
          setyear(val?.$y)
        }}
      />

      {year?.toString()?.length ? (
        isLoading ? (
          <div>
            <SkeletonLoaders />
          </div>
        ) : loadSuccess ? (
            <motion.div initial={{scale:0}}
              animate={{ scale: 1 }}
            transition={{duration:0.7, delay:0.2}}>
              <h2 className="p-2 mt-2 text-3xl font-sans 
              font-bold text-teal-700 dark:text-white">
                {`${year} report`}
              </h2>
              <div className="flex flex-row flex-wrap py-3 gap-2 px-2">
                <ReportCard title={"Profit"} value={`D${formatNumber(profit)}`}
                icon={<MoneyOffCsredOutlined
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
              <ReportCard title={"#Products"} value={productQuantity}
                icon={<ProductionQuantityLimitsOutlined
                  sx={{
                    transform: "scale(1.6)",
                    color: "white",
                    bgcolor: "brown",
                    borderRadius: "3px",
                  }}
                />}
              />
              <ReportCard title={"#Sales"} value={salesInstances}
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
              <div className="w-full bg-white dark:bg-slate-700  
            flex flex-row flex-wrap py-3 md:gap-x-3
            gap-x-1 gap-y-2 items-start justify-start ">
                
              {monthLySale?.length>0 ?
                  <div className="text-center 
                  text-slate-700 dark:text-white 
                  bg-slate-200 w-full flex flex-col
                  gap-y-6 gap-x-2">
                    <h2 className="mt-8 lg:mx-10 md:mx-4 mx-1
                    text-lg font-normal text-slate-500
                  w-auto ">
                      Annual monthly sales</h2>
                    <BarChart
                      className="min-w-[300px] w-fit min-h-[300px] h-auto "
                      width={monthLySale?.length * 100} height={400}
                      style={{color:'inherit'}}
                      // barSize={10} barGap={3}
                      // barCategoryGap={3}
                      data={monthLySale} margin={{
                        top: 20, right: 30,
                        left: 20, bottom: 5
                      }}>
                    <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month"
                        spacing={1} 
                    />
                      <YAxis        />
                    <Tooltip />
                    <Legend color="green" />
                      <Bar dataKey="money"
                      maxBarSize={20} fill="blue" 
                        spacing={3}
                      />
                      <Bar dataKey="profit"
                      maxBarSize={20} fill="red" 
                        spacing={3}
                      />
                      
                    </BarChart>
                    
                    
                    </div> : null}
              {quarterlySale?.length>0 ?
                <div className="text-center 
                text-slate-700 dark:text-white 
                bg-slate-200 flex flex-col gap-3 
                md:px-6 sm:px-2 px-[2px]"
                  >
                    <div className="w-auto h-auto text-start">
                    <h2 className="mt-8 lg:mx-10 md:mx-4 mx-1
                     text-lg font-normal
                     text-teal-600">
                      Annual Quarter Sales
                      </h2>
                      </div>
                  
                    <CustomBarChart data={quarterlySale}
                      xDataKey={'quarter'}
                      bar1Key={'money'}
                      bar2Key={'profit'}
                    />
                  </div> : null}
                
                <MyDataGrid 
                  data={sales}
                  loading={isLoading}
                />
            </div>
          </motion.div>
        ) : null
      ) : null}
    </div>
  );
};

export default AnnuanReport;
