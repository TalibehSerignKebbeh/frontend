import  Inventory2  from "@mui/icons-material/Inventory2";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import SalesTablePage from "./SalesTablePage";
import Header from "../other/Header";
import { GetError } from "../other/OtherFuctions";
import useAuth from "../../hooks/useAuth";
import SearchProducts from "./Select/SearchProducts";
import ProductSearch from "./ProductSearch";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const SalesPage = () => {
  const {token} = useAuth()
  const [rowCount, setrowCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [sales, setsales] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [date, setdate] = useState('');
  const [selectedProducts, setselectedProducts] = useState([]);
  const [pageSize, setpageSize] = useState(20);
  const [page, setpage] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      setloading(true);
      seterrorMessage("");
      // const ids = selectedProducts?.reduce((prevIds, product)=> {return [...prevIds, product?._id]}, [])
      // const id = selectedProducts[selectedProducts?.length - 1]?._id
      let filters={}
      
      if (date?.length) {
        filters.date = date;
      }
      filters.page = page;
      filters.pageSize = pageSize;
      await queryInstance
        .get(
          `/sales`,{headers:{Authorization:`Bearer ${token}`,}, params:{...filters}}
        )
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            setrowCount(res?.data?.totalSales);
            setsales(res?.data?.sales);
            return;
          }
         
         seterrorMessage(GetError(res))
        })
        .catch((err) => {
          console.log(err);
         seterrorMessage(GetError(err))
        })
        .finally(() => {
          setloading(false);
        });
    };
    fetchSales();
    return () => {};
  }, [ page, pageSize, token, selectedProducts, date]);
  useEffect(() => {
    setrowCount((prevValue) => (loading ? rowCount : prevValue));
  }, [rowCount, loading]);


  return (
    <div style={{ width: "100%" }}>
      <Header
        icon={<Inventory2 sx={{ transform: "scale(1.5)", mb: 1, zIndex: 0 }} />}
        title={"Manage Sales"}
      />
      {errorMessage?.length? <div className="w-fit">
        <ErrorMessage error={errorMessage}
        handleReset={()=>seterrorMessage('')}/>
      </div> : null}
      <div className="flex flex-row flex-wrap gap-3 ">
        <div className="mb-3">
          <input className="border-2 border-gray-400 p-2"
            type="date" defaultValue={''} value={date}
            onChange={(e)=>setdate(e.target.value)}
          />
          <IconButton onClick={()=>setdate('')} ><Clear /></IconButton>
        </div> 
         {/* <div>
          <ProductSearch selected={selectedProducts} setselected={setselectedProducts} />
       </div>  */}
      </div>
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
