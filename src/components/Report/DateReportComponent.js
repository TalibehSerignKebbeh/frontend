import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import format from "date-fns/format";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import { formatNumber } from "../../other/format";
import { customTime } from "../sales/data";
import MyDataGrid from "../sales/MyDataGrid";
import ReportCard from "../Dashboard/card/ReportCard";
import { Clear, Inventory2Outlined } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import { GetError } from "../other/OtherFuctions";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import SkeletonLoaders from "../Loaders/SkelelonLoader";
import { isToday } from "date-fns";
import HourlyCharts from "../Dashboard/chats/HourlyCharts";
import parseISO from "date-fns/parseISO";
import isYesterday from "date-fns/isYesterday";
import TopSellingTables from "./TopSellingTables";


const DateReportComponent = () => {
  const { token } = useAuth()
  const [date, setdate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [money, setmoney] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [hourlyData, sethourlyData] = useState([]);
  const [sales, setsales] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');
  const [count, setcount] = useState(0);
  const [topSellingByProfit, settopSellingByProfit] = useState([]);
  const [topSellingByQuantity, settopSellingByQuantity] = useState([]);

  useEffect(() => {
    const fetchSalesForDay = async () => {
      setisLoading(true);
      await queryInstance
        .get(`/sales/stats/date?saleDate=${date}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          // console.log(res);
          if (res?.status === 200) {
            console.log(res?.data);
            setsales(res?.data?.sales);
            setmoney(res?.data?.money);
            sethourlyData(res?.data?.hourlySales);
            setproductQuantity(res?.data?.quantity);
            setcount(res?.data?.count)
            settopSellingByProfit(res?.data?.topSellingByProfit)
            settopSellingByQuantity(res?.data?.topSellingByQuantity)
            return
          }
          seterrorMsg(GetError(res))
        })
        .catch((err) => {
          // console.log(err);
          seterrorMsg(GetError(err))

        })
        .finally(() => {
          setisLoading(false);
        });
    };
    if (date?.length) {
      fetchSalesForDay()
    }
  }, [date, token]);

  const GetDateName = (value) => {
    if (isToday(parseISO(value)))
      return "Today"
    if (isYesterday(parseISO(value)))
      return "Yesterday"
    return format(new Date(`${value} ${customTime}`), 'EEEE do MMM yyyy')
  }
  return (
    <div className=" w-auto bg-white dark:bg-slate-700
        shadow shadow-slate-200 dark:shadow-slate-500
        drop-shadow-lg relative
     md:p-8 sm:p-2 p-0 py-4 block rounded text-slate-800 dark:text-white">
      <h2 className="text-2xl text-teal-600 font-normal 
      font-sans italic opacity-90 pl-1
      ">
        Date Report Section
      </h2>
      <div className="p-1 w-auto max-w-xs grid grid-cols-1 relative">
        <label className="text-lg font-sans italic 
        font-normal  opacity-90 mb-1" htmlFor="date">
          Choose date
        </label>
        <div className="flex gap-[2px]">
          <input
            className="w-11/12 p-2 border-2 
          border-gray-600 dark:border-gray-50
          rounded bg-white mr-2
          dark:bg-slate-300 text-gray-700"
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
             max={format(new Date(), 'yyyy-MM-dd')}
          />
          <button className="p-2 rounded-full
          bg-red-600 hover:bg-red-500
           " onClick={() => setdate('')}><Clear /> </button>
        </div>

      </div>

      {date?.length ? (
        isLoading ? (
          <div>
            <SkeletonLoaders />
          </div>
        ) : (
          <div className="">
            {errorMsg?.length ? <ErrorMessage error={errorMsg}
              handleReset={() => seterrorMsg('')}
            /> : null}
            <h2 className="p-2 font-normal text-gray-800 dark:text-slate-100 
              mt-6 text-xl  w-fit">
              {GetDateName(date)}
            </h2>
            <div className="flex flex-row flex-wrap py-3 gap-2">
              <ReportCard title={"Money"} value={`D${formatNumber(money)}`}
                icon={<MoneyOffCsredOutlined
                  sx={{
                    transform: "scale(1.6)",
                    // color: "white",
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
                    bgcolor: "#004080",
                    borderRadius: "3px",
                  }}
                />}
              />
              <ReportCard title={"#Sales"} value={count}
                icon={<Inventory2Outlined
                  sx={{
                    transform: "scale(1.6)",
                    bgcolor: "#00e673",
                    borderRadius: "3px",
                  }}
                />}
              />


            </div>
            <div>

            </div>
            <div className="py-3 shadow  bg-slate-50 dark:bg-gray-400 mt-8
            max-w-full overflow-auto flex flex-col gap-6">
              <div className="w-full h-auto flex flex-col gap-y-3 py-3 my-3 justify-center items-stretch
                bg-slate-300 shadow-md">
                <h4 className="font-normal
                  text-gray-700 font-sans text-start
                  md:px-6 sm:px-2 px-1 text-2xl">
                  Hourly Sales Chart
                </h4>
                <HourlyCharts hourlyData={hourlyData} />
                </div>
                <TopSellingTables byProfit={topSellingByProfit}
                  byQuantity={topSellingByQuantity}
                />
                <div className="bg-inherit p-0 mt-4 overflow-auto h-auto max-w-full">

              <MyDataGrid data={sales} loading={isLoading} />
            </div>
              
              
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default DateReportComponent;
