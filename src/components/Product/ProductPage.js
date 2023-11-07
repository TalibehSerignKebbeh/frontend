import React, { useEffect, useState } from 'react';
import { queryInstance } from '../../api';
import SideModal from './SideModal';
import  Box  from '@mui/material/Box';
import ProductsDataGrid from './ProductsDataGrid';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import TopSellingSection from './TopSellingSection';
import { useQuery } from '@tanstack/react-query';
import AddQuantityDialog from './Dialog/AddQuantityDialog';


const ProductPage = ({ socket }) => {

  const { isAdmin, token } = useAuth()
  const [openAddModal, setopenAddModal] = useState(false);
  const [openAddQuantityDialog, setopenAddQuantityDialog] = useState(false);
  const [productToAddStock, setproductToAddStock] = useState(null);
  const [page, setpage] = useState(0);
  const [pageSize, setpageSize] = useState(20);
  const [TopSelling, setTopSelling] = useState({
    ByProfit: [], ByQuantity: []
  });
  // const [productUpdates, setproductUpdates] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
  const date = new Date()
  // date.setDate(date.getDate() - 7)

  const { isLoading, isError, error, failureReason, data,
    isSuccess,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => queryInstance.get(`/products`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: page, pageSize: pageSize,
          endDate: date,
          startDate: date.setDate(date.getDate() - 7),
        }
      }).then(res => res?.data)
      .catch((err) => Promise.reject(err)),
    refetchInterval: 360000,
    keepPreviousData: true,
  })
  const handleCloseDialog = () => {
    setopenAddQuantityDialog(false)
    setproductToAddStock(null)
    
  }
  
  const handleStartStockAdd = (row) => {
    // console.log(row);
    setproductToAddStock(row)
    setopenAddQuantityDialog(true)
  }
  useEffect(() => {

    return () => {
      if (isSuccess) {
        // console.log(data?.products[0]);
        setTopSelling({
          ByProfit: data?.topSellingByProfit,
          ByQuantity: data?.topSellingByQuantity,
        })
      }
    };
  }, [isSuccess]);
  useEffect(() => {
    if (isError || error || failureReason) {
      seterrorMessage(GetError(error ? error : failureReason))
    }
  }, [error, failureReason, isError]);

  return (
    <div className=' w-full h-full md:mb-6 sm:mb-10 xl:my-0 mb-12'>


      <Box className='w-auto self-start  h-auto  mb-5  text-center
        ' sx={{ mx: { lg: "20px", xl: "30", md: '14px', sm: '3px' }, my: 2 }}>
        {errorMessage?.length ?
          <ErrorMessage error={errorMessage}
            handleReset={() => seterrorMessage('')} /> : null}
       {isAdmin? <button onClick={() => setopenAddModal(true)}
          className='float-right mx-1 mr-5 px-4 py-2 mb-3 rounded bg-green-600
              shadow shadow-slate-200 
              dark:shadow-slate-700 text-white
              dark:text-slate-100'>
          Add Product
        </button> : null}
        <div>

          <TopSellingSection data={TopSelling} />
        </div>
        <ProductsDataGrid
          products={data?.products}
          page={page}
          setpage={setpage} pageSize={pageSize}
          setpageSize={setpageSize}
          totalPages={data?.totalPages}
          loading={isLoading}
          handleStartStockAdd={handleStartStockAdd}
        />
      </Box>


      <SideModal showSideModal={openAddModal}
        setShowSideModal={setopenAddModal}
        socket={socket}
      />
      <AddQuantityDialog 
        socket={socket}
        message={<p className='text-xl text-green-400 mt-2'>
          {`Add Stock to `} <strong className='underline'>{productToAddStock?.name} </strong></p>}
        open={openAddQuantityDialog}
        handleClose={handleCloseDialog}
        loading={false}
        productId={productToAddStock?._id}
      />
    </div>
  );
}

export default ProductPage;
