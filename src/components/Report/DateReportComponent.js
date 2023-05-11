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


const DateReportComponent = () => {
  const [date, setdate] = useState("");
  const [money, setmoney] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [hourlyData, sethourlyData] = useState([]);
  const [sales, setsales] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchSalesForDay = async () => {
      setisLoading(true);
      await queryInstance
        .get(`/sales/stats/date?saleDate=${date}`)
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            console.log(res?.data);
            setsales(res?.data?.sales);
            setmoney(res?.data?.money);
            sethourlyData(res?.data?.hourlySales);
            setproductQuantity(res?.data?.quantityProduct);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setisLoading(false);
        });
    };
    if (date?.length) {
      fetchSalesForDay()
    }
  }, [date]);

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
    <div className=" w-auto bg-gray-100 p-2 py-4 block rounded">
      <h2 className="text-lg font-normal font-sans italic opacity-90 pl-1">Date Report Section</h2>
      <div className="p-1 w-auto max-w-xs grid grid-cols-1 relative">
        <label className="text-lg font-sans italic font-medium opacity-80" htmlFor="date">
          Choose date
        </label>
        <input
          className="w-11/12 p-2 border-2 border-gray-600 rounded"
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        />
        <button disabled={!date?.length}
          onClick={e => setdate('')} title="Clear date"
          className="absolute right-0 bottom-2 px-2 py-1 rounded-3xl border-2 border-slate-100 hover:bg-red-500 hover:text-white">
          X</button>
      </div>

      {date?.length ? (
        isLoading ? (
          <div>
            <CircularProgress sx={{ transform: "scale(1.7)" }} />
          </div>
        ) : (
          <>
            <h2 className="p-2 text-lg font-normal font-sans italic mt-2 ">
              {format(new Date(`${date} ${customTime}`), 'EEEE do MMM yyyy')}
            </h2>
            <div className="flex flex-row flex-wrap py-3 gap-2">
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
                    bgcolor: "#004080",
                    borderRadius: "3px",
                  }}
                />}
              />
              <ReportCard title={"#Sales"} value={sales?.length}
                icon={<Inventory2Outlined
                  sx={{
                    transform: "scale(1.6)",
                    color: "white",
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
            <div className="py-3 cardShadow">
                <LineChart width={800} height={400} data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="basisClosed" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="money" stroke="#82ca9d" />
              </LineChart>
            </div>


          </>
        )
      ) : null}
    </div>
  );
};

export default DateReportComponent;
