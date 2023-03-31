import { CloseOutlined, Inventory2 } from "@mui/icons-material";
import { IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import SalesTablePage from "./SalesTablePage";
import Header from "../other/Header";
import AToast from "../other/AToast";
import { toast } from "react-toastify";
import ExpiredComponent from "../Auth/ExpiredComponent";
// import {useInfiniteQuery, useQuery} from '@tanstack/react-query'
// import { format } from 'date-fns';
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
                toast.error(<ExpiredComponent />, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false,
                    pauseOnHover: true,
                    hideProgressBar: true,
                    limit: 1,
                    style: { minWidth:'200px', maxWidth:'98%'}
              })
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
      {/* <Box
        displayPrint={false}
        sx={{
          width: "200px",
          inset: 0,
          position: "relative",
          my: 2,
          mb: "40px",
          mr: 0,
          ml: { xl: "30%", lg: "35%", md: "20%", sm: 1, xs: 1 },
            "& #text": {
                display: 'none',
            opacity: 0,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1rem",
            d: "block",
            mr: "auto",
            ml: 0,
            float: "left",
          }}
        >
          Select date
        </Typography>
        <TextField
          type={"date"}
          sx={{ width: "100%" }}
          value={selectedDate}
          onChange={handleDateChange}
        />
        {selectedDate?.length ? (
          <IconButton
            onClick={() => setselectedDate("")}
            sx={{
              float: "right",
              position: "absolute",
              marginBottom: 0,
              mt: "auto",
            }}
          >
            <CloseOutlined />{" "}
          </IconButton>
        ) : null}
      </Box> */}

      {/* {errorMessage?.length ? (
            <div
              className=" w-fit h-auto flex flex-row gap-x-40 content-between 
                items-center bg-slate-100 px-2 rounded"
            >
              <p className="text-red-700 text-lg">{errorMessage}</p>
              <span
                className="text-base py-1 px-2 text-red-500 hover:bg-red-500 hover:text-white
                cursor-pointer m-auto rounded-full"
                              onClick={() => seterrorMessage("")}
              >
                X
              </span>
            </div>
                  ) : null} */}
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
