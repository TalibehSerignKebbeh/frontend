import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import { CircularProgress } from "@mui/material";
import format from "date-fns/format";
import { formatNumber } from "../../other/format";
import MonthlyMonthChart from "../Dashboard/chats/MonthlyMonthChart";
import ReportForm from "./ReportForm";

const AnnuanReport = () => {
  const [year, setyear] = useState("");
  const [money, setmoney] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [monthLySale, setmonthLySale] = useState([]);
  const [quarterlySale, setquarterlySale] = useState([]);
  const [sales, setsales] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);

    
  const handleFetchYearReport = async (e) => {
    e.preventDefault()
    if (!year?.length === 4) return;
      setisLoading(true);
      // const year = year?.slice(0, 4);
      await queryInstance
        .get(`/sales/stats/year?year=${Number(year)}`)
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            setloadSuccess(true)
            setsales(res?.data?.sales);
            setmoney(res?.data?.revenue);
            setmonthLySale(res?.data?.monthSales);
            setquarterlySale(res?.data?.quarterSales);
            setproductQuantity(res?.data?.quantityProduct);
          }
        })
        .catch((err) => {
            setloadSuccess(false)
          console.log(err);
        })
        .finally(() => {
          setisLoading(false);
        });
    };

  return (
    <div className=" w-auto bg-gray-100 p-2">
      <h2 className="py-3 ">Year Report Section</h2>
      <ReportForm value={year} setvalue={setyear}
        handleSubmit={handleFetchYearReport}
        placeholder={'Enter year'} 
        type={'text'} name={'year'}
        />

      {year?.length ? (
        isLoading ? (
          <div>
            <CircularProgress sx={{ transform: "scale(1.7)" }} />
          </div>
        ) :loadSuccess? (
          <>
            <h2 className="p-2 text-sm font-bold italic ">
              {/* {format(new Date(`${date} ${customTime}`), 'EEEE do MMM yyyy')} */}
            </h2>
            <div className="flex flex-row flex-wrap py-3 gap-2 items-start">
             <MonthlyMonthChart monthlyData={monthLySale} />                 
            </div>
          </>
        ): null
      ) : null}
    </div>
  );
};

export default AnnuanReport;
