import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import format from "date-fns/format";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import { formatNumber } from "../../other/format";
import { customTime } from "../sales/data";
import MyDataGrid from "../sales/MyDataGrid";
import ReportCard from "../Dashboard/card/ReportCard";
import { Inventory2Outlined } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import { GetError } from "../other/OtherFuctions";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import SkeletonLoaders from "../Loaders/SkelelonLoader";
import { isToday } from "date-fns";
import HourlyCharts from "../Dashboard/chats/HourlyCharts";
import parseISO from "date-fns/parseISO";
import isYesterday from "date-fns/isYesterday";


const DateReportComponent = () => {
  const {token} = useAuth()
  const [date, setdate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [money, setmoney] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [hourlyData, sethourlyData] = useState([]);
  const [sales, setsales] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');
  const [count, setcount] = useState(0);
  useEffect(() => {
    const fetchSalesForDay = async () => {
      setisLoading(true);
      await queryInstance
        .get(`/sales/stats/date?saleDate=${date}`, {headers:{Authorization: `Bearer ${token}`}})
        .then((res) => {
          // console.log(res);
          if (res?.status === 200) {
            console.log(res?.data);
            setsales(res?.data?.sales);
            setmoney(res?.data?.money);
            sethourlyData(res?.data?.hourlySales);
            setproductQuantity(res?.data?.quantity);
            setcount(res?.data?.count)
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
        drop-shadow-lg
     p-2 py-4 block rounded text-slate-800 dark:text-white">
      <h2 className="text-lg font-normal font-sans italic opacity-90 pl-1">Date Report Section</h2>
      <div className="p-1 w-auto max-w-xs grid grid-cols-1 relative">
        <label className="text-lg font-sans italic 
        font-medium opacity-80" htmlFor="date">
          Choose date
        </label>
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
        />
      
      </div>

      {date?.length ? (
        isLoading ? (
          <div>
            <SkeletonLoaders />
          </div>
        ) : (
            <div className="">
              {errorMsg?.length ? <ErrorMessage error={errorMsg}
                handleReset={()=>seterrorMsg('')}
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
              <div className="bg-inherit p-0 overflow-auto h-auto max-w-full">

            <MyDataGrid data={sales} loading={isLoading} />
              </div>
            {/* <HourChat hourlyData={hourlyData} /> */}
            <div>

                   </div>
              <div className="py-3 shadow  bg-slate-50 dark:bg-gray-400 mt-8
            max-w-full overflow-auto">
                <HourlyCharts hourlyData={hourlyData} />
            </div>
                      </div>
        )
      ) : null}
    </div>
  );
};

export default DateReportComponent;
