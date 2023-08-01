import Inventory2 from "@mui/icons-material/Inventory2";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import SalesTable from "./SalesTable";
import Header from "../other/Header";
import { GetError } from "../other/OtherFuctions";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import RegisterSale from "./RegisterSale";
import { motion } from "framer-motion";
import SalesFilters from "./SalesFilters";

const SalesPage = ({ socket, setactiveNavLink }) => {
  
  const { token } = useAuth()
  const [rowCount, setrowCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [sales, setsales] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [date, setdate] = useState('');
  const [pageSize, setpageSize] = useState(20);
  const [page, setpage] = useState(0);
  const [openRegisterSale, setOpenRegisterSale] = useState(true)
  const [product, setproduct] = useState('');
  const [user, setuser] = useState('');

  const [searchFilters, setsearchFilters] = useState({
    date:'', product:'', user:''
  });
  useEffect(() => {
    const fetchSales = async () => {
      setloading(true);
      seterrorMessage("");
      let filters = {}

      Object.keys(searchFilters).forEach((key) => {
        if (searchFilters[key]?.length) {
            filters[key]= searchFilters[key]
         }
      })
      
      filters.page = page;
      filters.pageSize = pageSize;
      await queryInstance
        .get(
          `/sales`, { headers: { Authorization: `Bearer ${token}`, }, params: { ...filters } }
        )
        .then((res) => {
          if (res?.status === 200) {
          // console.log(res?.data);
            setrowCount(res?.data?.totalSales);
            setsales(res?.data?.sales);
            return;
          }

          seterrorMessage(GetError(res))
        })
        .catch((err) => {
          // console.log(err);
          seterrorMessage(GetError(err))
        })
        .finally(() => {
          setloading(false);
        });
    };
    fetchSales();
    return () => { };
  }, [page, pageSize, searchFilters, token]);
    
  
  useEffect(() => {
    setrowCount((prevValue) => (loading ? rowCount : prevValue));
  }, [rowCount, loading]);

 
 
  
  return (
    <div className="md:px-10 px-4 w-full" >
      <Header
        icon={<Inventory2 sx={{ transform: "scale(1.5)", mb: 1, zIndex: 0 }} />}
        title={"Manage Sales"}
      />
      <button className="md:px-4 px-2 py-2 rounded-md 
        shadow-md shadow-slate-50 dark:shadow-slate-700
        bg-white dark:bg-slate-700
      text-slate-500 dark:text-white font-bold mb-4"
        onClick={() => setOpenRegisterSale(prev => !prev)}>
        {openRegisterSale ? `Close` : `Open`}  Register Sales
      </button>
      <div>
        
      <motion.div
        initial={{scale:0,height:0 }}
          animate={{
          transition:'.8s',
          scale: openRegisterSale ? 1 : 0,
          opacity: openRegisterSale ? 1 : 0,
          height: openRegisterSale? 'auto':'0'
        }}
        className="h-auto w-auto relative block"
        transition={{type:'tween', duration:'0.8',easings:['easeIn', 'easeOut']}}
        
      >
         <RegisterSale socket={socket} />   
      </motion.div>
</div>


      <div className="bg-white dark:bg-slate-700 
      shadow-xl shadow-gray-100 dark:shadow-slate-700
      flex flex-col flex-wrap gap-3 "
      >
        <SalesFilters 
          user={user} setuser={setuser}
          date={date} setdate={setdate}
          product={product} setproduct={setproduct}
          searchFilters={searchFilters}
          setsearchFilters={setsearchFilters}
          showProduct={true}
          showDeletedUserInput={false}
        />

        {errorMessage?.length ? <div className="w-fit block mt-3">
          <ErrorMessage error={errorMessage}
            handleReset={() => seterrorMessage('')} />
        </div> : null}
       
        <SalesTable
          sales={sales}
          rowCount={rowCount}
          page={page}
          setpage={setpage}
          pageSize={pageSize}
          setpageSize={setpageSize}
          loading={loading}
          socket={socket}
          deletable={true}
        />
      </div>



    </div>
  );
};

export default SalesPage;
