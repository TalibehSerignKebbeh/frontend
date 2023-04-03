import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import  CircularProgress  from "@mui/material/CircularProgress";
import  format  from "date-fns/format";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import { formatNumber } from "../../other/format";
import { customTime } from "./data";
import MyDataGrid from "./MyDataGrid";
import HourChat from "../Dashboard/chats/HourChat";

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
            setmoney(res?.data?.revenue);
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
      fetchSalesForDay().then(() => {
        hourlyData?.sort((a, b)=>a?.hour - b?.hour)
      });
    }
  }, [date]);
  return (
    <div className=" w-auto bg-gray-100 p-2">
      <h2>Date Report Section</h2>
      <div className="p-1 w-auto max-w-xs grid grid-cols-1 relative">
        <label className="text-lg" htmlFor="date">
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
          onClick={e=>setdate('')} title="Clear date"
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
              <h2 className="p-2 text-sm font-bold italic ">
                {format(new Date(`${date} ${customTime}`), 'EEEE do MMM yyyy')}
              </h2>
            <div className="flex flex-row flex-wrap py-3 gap-2">
              <div
                className="card-shadow gap-x-16 rounded-sm max-w-xs p-2 px-4 bg-white flex flex-row 
                items-center justify-between place-content-center gap-1 "
              >
                <div className="">
                  <h3>Money</h3>
                  <h1 className="px-1">{`D${formatNumber(money)}`}</h1>
                </div>
                <MoneyOffCsredOutlined
                  sx={{
                    transform: "scale(1.6)",
                    color: "white",
                    bgcolor: "blueviolet",
                    borderRadius: "3px",
                  }}
                />
              </div>
              <div
                className="card-shadow gap-x-16 rounded-sm max-w-xs p-2 px-4 bg-white flex flex-row 
                items-center justify-between place-content-center gap-1 "
              >
                <div className="">
                  <h3>#Products</h3>
                  <h1 className="px-1">{productQuantity}</h1>
                </div>
                <ProductionQuantityLimitsOutlined
                  sx={{
                    transform: "scale(1.6)",
                    color: "white",
                    bgcolor: "blueviolet",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
              <MyDataGrid data={sales} loading={isLoading} />
              <HourChat hourlyData={hourlyData} />
          </>
        )
      ) : null}
    </div>
  );
};

export default DateReportComponent;
