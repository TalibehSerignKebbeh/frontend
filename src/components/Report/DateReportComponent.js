import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import format from "date-fns/format";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import { formatNumber } from "../../other/format";
import { customTime } from "../sales/data";
import MyDataGrid from "../sales/MyDataGrid";
import ReportCard from "../Dashboard/card/ReportCard";
import { Inventory2Outlined } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useAuth from "../../hooks/useAuth";
import { GetError } from "../other/OtherFuctions";
import ErrorMessage from "../StatusMessages/ErrorMessage";


const DateReportComponent = () => {
  const {token} = useAuth()
  const [date, setdate] = useState("");
  const [money, setmoney] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [hourlyData, sethourlyData] = useState([]);
  const [sales, setsales] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');
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
            setproductQuantity(res?.data?.quantityProduct);
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

  const chartData = hourlyData.map(sale =>
  ({
    x: `${sale.hour}:00 - ${sale.hour + 1}:00`,
    y: sale.quantityProduct,
    hour: `${sale.hour}:00 - ${sale.hour+1}:00`,
    quantity: sale.quantityProduct,
    money: sale.money,

    label: `${sale.hour}:00 - ${sale.hour + 1}:00\nQuantity: ${sale.quantityProduct}\nAmount: ${sale.revenue}`,
  }));
  return (
    <div className=" w-auto bg-gray-100 dark:bg-slate-700
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
          rounded 
          bg-white 
          dark:bg-slate-300 text-gray-700"
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        />
        <button disabled={!date?.length}
          onClick={e => setdate('')} title="Clear date"
          className="absolute right-0 bottom-2 px-2 py-1 
          rounded-3xl border-2 border-slate-100 hover:bg-red-500
           hover:text-white">
          X</button>
      </div>

      {date?.length ? (
        isLoading ? (
          <div>
            <CircularProgress sx={{ transform: "scale(1.7)" }} />
          </div>
        ) : (
            <>
              {errorMsg?.length ? <ErrorMessage error={errorMsg}
                handleReset={()=>seterrorMsg('')}
              /> : null}
            <h2 className="p-2 text-lg font-normal font-sans italic mt-2 ">
              {format(new Date(`${date} ${customTime}`), 'EEEE do MMM yyyy')}
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
              <ReportCard title={"#Sales"} value={sales?.length}
                icon={<Inventory2Outlined
                  sx={{
                    transform: "scale(1.6)",
                    bgcolor: "#00e673",
                    borderRadius: "3px",
                  }}
                />}
              />


            </div>
            <MyDataGrid data={sales} loading={isLoading} />
            {/* <HourChat hourlyData={hourlyData} /> */}
            <div>

                   </div>
            <div className="py-3 shadow  bg-slate-50 dark:bg-gray-500 mt-8">
                <LineChart width={800} height={400} data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                className="text-gray-700 dark:text-white">
                  <CartesianGrid strokeDasharray="3 3" 
                    className="text-gray-700 dark:text-white"
                />
                <XAxis dataKey="hour" className="text-gray-700 dark:text-white"/>
                <YAxis className="text-gray-700 dark:text-white"/>
                <Tooltip className="text-gray-700 dark:text-white"/>
                <Legend className="text-gray-700 dark:text-white"/>
                  <Line type="basisClosed" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }}
                className="text-gray-700 dark:text-white"  />
                  <Line type="monotone" dataKey="money" stroke="#82ca9d" 
                    className="text-gray-700 dark:text-white"
                />
              </LineChart>
            </div>


          </>
        )
      ) : null}
    </div>
  );
};

export default DateReportComponent;
