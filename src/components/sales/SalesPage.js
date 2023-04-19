import  Inventory2  from "@mui/icons-material/Inventory2";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import SalesTablePage from "./SalesTablePage";
import Header from "../other/Header";

const SalesPage = () => {
  const [rowCount, setrowCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [expiredToken, setexpiredToken] = useState(false);
  const [sales, setsales] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");

  const [selectedDate, setselectedDate] = useState("");
  const [pageSize, setpageSize] = useState(20);
  const [page, setpage] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      setloading(true);
      setexpiredToken(false);
      seterrorMessage("");
      await queryInstance
        .get(
          `/sales?page=${page}&&pageSize=${pageSize}&&saleDate=${selectedDate}`
        )
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            setrowCount(res?.data?.totalSales);
            setsales(res?.data?.sales);
            return;
          }
          if (res?.response?.status === 403) {
            setexpiredToken(true);
            seterrorMessage("Your token has expired Please login again");
            return;
          }
          if (res?.response?.status === 400) {
            seterrorMessage(res?.response?.data?.message);
            return;
          }
          // settotalPages(res?.data?.totalPages)
        })
        .catch((err) => {
            if (err?.response?.status === 403) {
                
            setexpiredToken(true);
            seterrorMessage("Your token has expired Please login again");
            return;
          }
          if (err?.response?.status === 400) {
            seterrorMessage(err?.response?.data?.message);
            return;
          }
          console.log(err);
        })
        .finally(() => {
          setloading(false);
        });
    };
    fetchSales();
    return () => {};
  }, [selectedDate, page, pageSize]);
  useEffect(() => {
    setrowCount((prevValue) => (loading ? rowCount : prevValue));
  }, [rowCount, loading]);


  return (
    <div style={{ width: "100%" }}>
      <Header
        icon={<Inventory2 sx={{ transform: "scale(1.5)", mb: 1, zIndex: 0 }} />}
        title={"Manage Sales"}
      />
      
      <SalesTablePage
        sales={sales}
        rowCount={rowCount}
        page={page}
        setpage={setpage}
        pageSize={pageSize}
        setpageSize={setpageSize}
        loading={loading}
      />
    </div>
  );
};

export default SalesPage;
