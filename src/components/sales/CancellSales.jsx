import Inventory2 from "@mui/icons-material/Inventory2";
import React, { useState, useEffect } from "react";
import { queryInstance } from "../../api";
import SalesTable from "./SalesTable";
import Header from "../other/Header";
import { GetError } from "../other/OtherFuctions";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import SingleProductSearch from "./Select/SingleProductSearch";
import SearchUser from "../user/SearchUser";

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

  const ApplyFilters = () => {
    if (product?.length) {
    setsearchFilters({...searchFilters, product: product}) 
    }
    if (date?.length) {
      setsearchFilters({...searchFilters, date:date})
    } 
    if (user?.length) {
      setsearchFilters({...searchFilters, user: user})
    }
  }
  const ClearFilters = () => {
    setsearchFilters({ date: '', product: '', user:'' })
    setproduct('')
    setdate('')
    setuser('')
  }
  
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
        <div className="flex flex-row flex-wrap items-center
        lg:gap-4 md:gap-3 gap-1 
        my-3 mt-12 bg-white  dark:bg-slate-700
        shadow-sm
        w-fit p-2 text-gray-600 dark:text-slate-50"
        >
         
          <div className="flex-none">
            <label htmlFor="data"
              className="font-normal mb-2 py-2 
              text-[1.3rem]">Date</label>
            <br />
            <input className="bg-white dark:bg-slate-400 
            border-2 border-gray-400 p-2 rounded"
              type="date" name="data" id="data" value={date}
              onChange={(e) => {
                setdate(e.target.value)
                // setsearchFilters({...searchFilters, date: e.target.value})
              }}
            />
            <IconButton className="text-gray-800 dark:text-white
            bg-white dark:bg-gray-600
            shadow-md hover:bg-current ml-1"
              onClick={() => {
                setdate('')
              setsearchFilters({...searchFilters, date:''})}} >
              <Clear />
            </IconButton>
          </div>
          <div className="flex flex-col">
            <span>Search Product</span>
            <SingleProductSearch
              product={product}
              setproduct={setproduct}
              onClear={() => {
                setproduct('')
                setsearchFilters({...searchFilters, product:''})
              }}
              onSelect={(value) => {
                setsearchFilters({ ...searchFilters, product: value })
                setproduct(value)
              }}
            />
          </div>
          <div className="flex flex-col">
            <span>Search Seller</span>
            <SearchUser user={user}
              setuser={setuser}
              onSelect={(value) => {
                setuser(value)
                setsearchFilters({...searchFilters, user:value})
              }}
              onClear={() => {
                setsearchFilters({ ...searchFilters, user: '' })
                setuser('')
                
              }}
            />

          </div>

          <button
            disabled={!date?.length && !product?.length && !user?.length}
            onClick={ApplyFilters}
            className={`${(!date?.length && !product?.length && !user?.length) ?
            'cursor-not-allowed':'cursor-pointer'} mt-4 bg-green-700 
            text-white p-3 h-fit rounded-md 
            `}>Apply filters</button>
          <button
            disabled={!date?.length && !product?.length && !user?.length}
            onClick={ClearFilters}
            className={`${(!date?.length && !product?.length && !user?.length) ?
            'cursor-not-allowed':'cursor-pointer'} mt-4 bg-pink-300 
            text-white p-3 h-fit rounded-md 
            `}>Clear filters</button>
        </div>

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
