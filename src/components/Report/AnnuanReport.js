import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import { CircularProgress } from "@mui/material";
import MonthlyMonthChart from "../Dashboard/chats/MonthlyMonthChart";
import ReportForm from "./ReportForm";
import PieChart from "../Dashboard/chats/PieChart";
import { formatNumber, months } from "../../other/format";
import ReportCard from "../Dashboard/card/ReportCard";
import  MoneyOffCsredOutlined  from "@mui/icons-material/MoneyOffCsredOutlined";
import  Inventory2Outlined  from "@mui/icons-material/Inventory2Outlined";
import  ProductionQuantityLimitsOutlined  from "@mui/icons-material/ProductionQuantityLimitsOutlined";

const AnnuanReport = () => {
  const [year, setyear] = useState("");
  const [money, setmoney] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [salesInstances, setsalesInstances] = useState(0);
  const [monthLySale, setmonthLySale] = useState([]);
  const [quarterlySale, setquarterlySale] = useState([]);
  // const [sales, setsales] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);

  const handleFetchYearReport = async (e) => {
    e.preventDefault();
    if (!year?.length === 4) return;
    setisLoading(true);
    // const year = year?.slice(0, 4);
    await queryInstance
      .get(`/sales/stats/year?year=${Number(year)}`)
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setloadSuccess(true);
          setmoney(res?.data?.revenue || 0);
          setmonthLySale(res?.data?.monthSales || []);
          setquarterlySale(res?.data?.quarterSales || []);
          setproductQuantity(res?.data?.quantityProduct || 0);
          setsalesInstances(res?.data?.totalSalesInstances || 0)
        }
      })
      .catch((err) => {
        setloadSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setisLoading(false);
        if (monthLySale?.length > 0) {
          const withMonthNames = monthLySale?.map((datum) => {
            const name = months[datum?.month]
             return {...datum,name:name }
          })
          setmonthLySale(withMonthNames)
        }
      });
  };

  return (
    <div className=" w-full bg-gray-100 p-2">
      <h2 className="py-3 ">Year Report Section</h2>
      <ReportForm
        value={year}
        setvalue={setyear}
        handleSubmit={handleFetchYearReport}
        placeholder={"Enter year"}
        type={"text"}
        name={"year"}
      />

      {year?.length ? (
        isLoading ? (
          <div>
            <CircularProgress sx={{ transform: "scale(1.7)" }} />
          </div>
        ) : loadSuccess ? (
          <>
              <h2 className="p-2 text-xl font-normal italic ">{year}</h2>
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
            <div className="bg-stone-400 flex flex-row flex-wrap py-3 gap-1 items-start justify-start ">
              <MonthlyMonthChart monthlyData={monthLySale} />
                <PieChart monthData={monthLySale} />
                {/* <VictoryBarChart /> */}
            </div>
          </>
        ) : null
      ) : null}
    </div>
  );
};

export default AnnuanReport;
