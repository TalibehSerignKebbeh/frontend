import React, { useEffect, useState } from 'react';
import { fetchProducts, queryInstance } from '../../api';
// import ProductTable from './Table';
import SideModal from './SideModal';
import { Box } from '@mui/material';
import ProductsDataGrid from './ProductsDataGrid';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const InventoryPage = ({ socket }) => {
  const {isAdmin, isManager} = useAuth()
  // const tableHeadClass = `text-left font-medium p-2 pl-3 text-sm font-medium`
  // const [products, setproducts] = useState([]);
  // const [topSelling, settopSelling] = useState(0);
  // const [loading, setloading] = useState(false);
  const [openAddModal, setopenAddModal] = useState(false);
  const [page, setpage] = useState(0);
  const [pageSize, setpageSize] = useState(20);
  const productsRequest = useQuery({
    queryKey: ['products'],
  queryFn: ()=>fetchProducts()})
  // useEffect(() => {
   
  //   const fetchProductsNotify = async () => {
  //     setloading(true)
  //     await queryInstance.get(`/notifications/products/all?page=${pageNum}&pagesize=${pagesize}`)
  //       .then(res => {
  //         console.log(res?.data);
  //         setproductsInfor(res?.data?.notifications)
  //       }).then(() => {
         
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       }).finally(() => { setloading(false) })
  //   }
  //  if(isAdmin || isManager) {fetchProductsNotify()}
  // }, [isAdmin, isManager])

  useEffect(() => {
    if (productsRequest?.data) {
      if (productsRequest?.data?.response?.status === 403) {
        console.log("Expired token and session");
      }
   
    }
  }, [productsRequest?.data])
  return (
    <div className=' w-full h-auto md:mb-0 sm:mb-10 xl:my-0 mb-12'>
      {productsRequest?.isLoading ?
        <section><p>loading.....</p></section> :
        <Box className='w-auto self-start  h-auto  mb-5  text-center
        ' sx={{ mx: { lg: "20px", xl: "30", md: '14px', sm: '3px' }, my: 2 }}>
           <button onClick={()=>setopenAddModal(true)}
                className='float-right mx-1 mr-5 px-3 py-1 mb-3 rounded bg-green-600
              shadow shadow-green-600'>
                Add Product
              </button>
         
          <ProductsDataGrid products={productsRequest?.data?.products} page={page}
            setpage={setpage} pageSize={pageSize}
            setpageSize={setpageSize} loading={ productsRequest?.isLoading} />
          {/* <ProductTable  products={products} /> */}
        </Box>
      }
      
      <SideModal showSideModal={openAddModal}
        setShowSideModal={setopenAddModal} 
        socket={socket}
        />
    </div>
  );
}

export default InventoryPage;
