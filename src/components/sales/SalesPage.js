import  Inventory2  from "@mui/icons-material/Inventory2";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import SalesTable from "./SalesTable";
import Header from "../other/Header";
import { GetError } from "../other/OtherFuctions";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import RegisterSale from "./RegisterSale";
import { motion } from "framer-motion";

const SalesPage = ({socket}) => {
  const {token} = useAuth()
  const [rowCount, setrowCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [sales, setsales] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [date, setdate] = useState('');
  const [selectedProducts, setselectedProducts] = useState([]);
  const [pageSize, setpageSize] = useState(20);
  const [page, setpage] = useState(0);
  const [openRegisterSale, setOpenRegisterSale] = useState(false)
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
    <div className="md:px-10 px-4 " style={{ width: "100%" }}>
      <Header
        icon={<Inventory2 sx={{ transform: "scale(1.5)", mb: 1, zIndex: 0 }} />}
        title={"Manage Sales"}
      />
      <button className="px-2 py-2 rounded-md bg-green-600 text-white font-bold"
      onClick={()=>setOpenRegisterSale(prev=>!prev)}>
        {openRegisterSale? `Close`:`Open To`}  Register Sales
      </button>
      
        <motion.div
          initial={{scale:0}}
          animate={{ scale: 1 }}
        >
          {openRegisterSale ?  <RegisterSale socket={socket}/>: null}
        </motion.div>
        
     
      <div className="bg-white shadow-xl shadow-gray-100 flex flex-col flex-wrap gap-3 ">
        <div className="my-3 mt-12">
          <input className="border-2 border-gray-400 p-2"
            type="date"  value={date}
            onChange={(e)=>setdate(e.target.value)}
          />
          <IconButton onClick={()=>setdate('')} ><Clear /></IconButton>
        </div>
         {errorMessage?.length? <div className="w-fit block mt-3">
        <ErrorMessage error={errorMessage}
        handleReset={()=>seterrorMessage('')}/>
      </div> : null}
         {/* <div>
          <ProductSearch selected={selectedProducts} setselected={setselectedProducts} />
       </div>  */}
      <SalesTable
        sales={sales}
        rowCount={rowCount}
        page={page}
        setpage={setpage}
        pageSize={pageSize}
        setpageSize={setpageSize}
        loading={loading}
      />
      </div>
      

      
    </div>
  );
};

export default SalesPage;
