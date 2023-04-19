import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import  CircularProgress  from "@mui/material/CircularProgress";
import { formatNumber } from "../../other/format";
import ReportCard from "../Dashboard/card/ReportCard";
import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DatePicker } from "antd";

const AnnuanReport = () => {
  const [year, setyear] = useState(new Date().getFullYear());
  const [money, setmoney] = useState(0);
  const [productQuantity, setproductQuantity] = useState(0);
  const [salesInstances, setsaleCount] = useState(0);
  const [monthLySale, setmonthLySale] = useState([]);
  const [quarterlySale, setquarterlySale] = useState([]);
  // const [sales, setsales] = useState([]);
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
        responseType:'json'
      })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setloadSuccess(true);
          setmoney(res?.data?.money);
          setmonthLySale(res?.data?.monthSales);
          setquarterlySale(res?.data?.quarterSales);
          setproductQuantity(res?.data?.quantityProduct);
          setsaleCount(res?.data?.saleCount)
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
  }, [year]);

  return (
    <div className=" w-full bg-zinc-50 p-2 ml-1 border-2 border-zinc-200">
      <h4 className="py-3 text-lg font-sans">Select Year</h4>
      <DatePicker className="reportinput" picker="year"
        style={{ color: 'black', border: 'black' }}
        onChange={(val) => {
          setyear(val?.$y)
        }}
      />

      {year?.toString()?.length ? (
        isLoading ? (
          <div>
            <CircularProgress sx={{ transform: "scale(1.7)" }} />
          </div>
        ) : loadSuccess ? (
          <>
              <h2 className="p-2 mt-2 text-3xl font-serif italic text-gray-700 ">
                {`${year} report`}
              </h2>
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
            <div className="bg-white w-full flex flex-row flex-wrap py-3 md:gap-x-3 gap-x-1 gap-y-2 items-start justify-start ">
              {monthLySale?.length>0 ?
                <>
                  <BarChart width={600} height={400} data={monthLySale} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="money" fill="#8884d8" barSize={40}/>
                  </BarChart>
                    </> : null}
              {quarterlySale?.length>0 ?
                <div>
                  <h2>Annual Sales by Quarter</h2>
                  <BarChart width={600} height={400} data={quarterlySale} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="money" fill="#82ca9d" barSize={40}/>
                  </BarChart>
                </div> : null}
            </div>
          </>
        ) : null
      ) : null}
    </div>
  );
};

export default AnnuanReport;
