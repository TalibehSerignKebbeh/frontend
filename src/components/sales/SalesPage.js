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
import { useQuery } from "@tanstack/react-query";

const SalesPage = ({ socket, setactiveNavLink }) => {

  const { token, isSeller } = useAuth()
  const [rowCount, setrowCount] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  const [date, setdate] = useState('');
  const [pageSize, setpageSize] = useState(20);
  const [page, setpage] = useState(0);
  const [openRegisterSale, setOpenRegisterSale] = useState(true)
  const [product, setproduct] = useState('');
  const [user, setuser] = useState('');
  const [products, setproducts] = useState([]);

  const [searchFilters, setsearchFilters] = useState({
    date: '', product: '', user: ''
  });

  const { isLoading,data,
    isSuccess,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => queryInstance.get(`/products/sale`,
      {
        headers: { Authorization: `Bearer ${token}` },

      }).then(res => res?.data)
      .catch(err => Promise.reject(err)),
    refetchInterval: 450000,
    keepPreviousData: true,
  })

  const { isLoading: salesLoading,
    isError: isSaleLoadError, error: saleLoadError,
    failureReason: saleLoadFailureReason, data: saleLoadData,
    isSuccess: isSalesLoadSuccess,
  } = useQuery({
    queryKey: ['sales',page, pageSize, searchFilters?.date, searchFilters?.product, searchFilters?.user ],
    queryFn: async function() {
      let filters = {}

      Object.keys(searchFilters).forEach((key) => {
        if (searchFilters[key]?.length) {
          filters[key] = searchFilters[key]
        }
      })

      filters.page = page;
      filters.pageSize = pageSize;
      return queryInstance.get(`/sales`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params:{...filters}

        }).then(res => res?.data)
        .catch(err => Promise.reject(err))
    },
    refetchInterval: 9000,
    keepPreviousData: true,
  })

  // useEffect(() => {
  //     console.log(saleLoadData);
  // },[])
  useEffect(() => {
    setrowCount((prevValue) => (salesLoading ? rowCount : saleLoadData?.totalSales));
  }, [rowCount, saleLoadData?.totalSales, salesLoading]);

  useEffect(() => {
    if (isSuccess || data?.products?.length) {
       setproducts([...data?.products])
    }
  }, [data?.products, isSuccess]);

  useEffect(() => {
    if (saleLoadError || isSaleLoadError || saleLoadFailureReason) {
      seterrorMessage(GetError(saleLoadError || saleLoadFailureReason))
    }
  }, [saleLoadError, isSaleLoadError, saleLoadFailureReason]);


  return (
    <div className="md:px-10 px-4 w-full" >
      <Header
        icon={<Inventory2 sx={{ transform: "scale(1.5)", mb: 1, zIndex: 0 }} />}
        title={"Manage Sales"}
      />
      {isSeller ?
        <>
      <button className="md:px-4 px-2 py-2 rounded-md 
        shadow-md shadow-slate-50 dark:shadow-slate-800
        bg-white dark:bg-slate-700
      text-slate-500 dark:text-white font-bold mb-4"
        onClick={() => setOpenRegisterSale(prev => !prev)}>
        {openRegisterSale ? `Close` : `Open`}  Register Sales
      </button>
      <div>

        <motion.div
          initial={{ scale: 0, height: 0 }}
          animate={{
            transition: '.8s',
            scale: openRegisterSale ? 1 : 0,
            opacity: openRegisterSale ? 1 : 0,
            height: openRegisterSale ? 'auto' : '0'
          }}
          className="h-auto w-auto relative block"
          transition={{ type: 'tween', duration: '0.8', easings: ['easeIn', 'easeOut'] }}

        >
          <RegisterSale socket={socket}
            products={products}
                setproducts={setproducts}
                loadingProducts={isLoading}
          />
        </motion.div>
      </div>
      </> : null}


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
          sales={saleLoadData?.sales}
          rowCount={rowCount}
          page={page}
          setpage={setpage}
          pageSize={pageSize}
          setpageSize={setpageSize}
          loading={salesLoading}
          socket={socket}
          deletable={false}
        />
      </div>



    </div>
  );
};

export default SalesPage;
