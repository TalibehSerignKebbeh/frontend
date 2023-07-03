import Inventory2 from "@mui/icons-material/Inventory2";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import SalesTable from "./SalesTable";
import Header from "../other/Header";
import { GetError } from "../other/OtherFuctions";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import SalesFilters from "./SalesFilters";

const CancellSals = ({ socket,setactiveNavLink }) => {
  const { token } = useAuth()
  const [rowCount, setrowCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [sales, setsales] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const [date, setdate] = useState('');
  const [pageSize, setpageSize] = useState(20);
  const [page, setpage] = useState(0);
//   const [openRegisterSale, setOpenRegisterSale] = useState(true)
  const [product, setproduct] = useState('');
  const [user, setuser] = useState('');
  const [deletedBy, setDeletedBy] = useState('');
  // const [type, setType] = useState('');

  const [searchFilters, setsearchFilters] = useState({
    date:'',type:'', product:'', user:'',deletedBy:''
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
          `/sales/cancelled`, { headers: { Authorization: `Bearer ${token}`, }, params: { ...filters } }
        )
        .then((res) => {
          if (res?.status === 200) {
          console.log(res?.data);
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
        title={"Manage Cancell Sales"}
      />
      

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
          deletedBy={deletedBy} setDeletedBy={setDeletedBy}
          showProduct={true} showDeletedUserInput={true}
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
         deletable={false}
        />
      </div>



    </div>
  );
};

export default CancellSals;
