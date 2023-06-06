import React, { useEffect, useState } from 'react';
import {  queryInstance } from '../../api';
import SideModal from './SideModal';
import { Box, Button } from '@mui/material';
import ProductsDataGrid from './ProductsDataGrid';
// import { useQuery } from '@tanstack/react-query';
// import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import ProductsUpdates from './updates/ProductsUpdates';
import useAuth from '../../hooks/useAuth';
import TopSellingSection from './TopSellingSection';

const InventoryPage = ({ socket,setactiveNavLink }) => {
  const {isAdmin, isManager, token} = useAuth()
  const [openAddModal, setopenAddModal] = useState(false);
  const [showUpdates, setshowUpdates] = useState(false);
  const [page, setpage] = useState(0);
  const [pageSize, setpageSize] = useState(20);
  const [totalPages, settotalPages] = useState(0);
  const [loading, setloading] = useState(false);
  const [products, setproducts] = useState([]);
  const [TopSelling, setTopSelling] = useState({
   ByMoney:[],ByQuantity:[]
 });
  // const [productUpdates, setproductUpdates] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
  
  useEffect(() => {
   setactiveNavLink('products')
    const fetchProducts = async () => {
      // console.log(page, pageSize, );
      setloading(true)
      await queryInstance.get(`/products?page=${page}&pageSize=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          console.log(res?.data);
          setproducts(res?.data?.products)
          setTopSelling({
            ByMoney: res?.data?.topSellingByMoney,
            ByQuantity: res?.data?.topSellingByQuantity
          })
          setpage(Number(res?.data?.page))
          setpageSize(Number(res?.data?.pageSize))
          settotalPages(Number(res?.data?.totalPages))
        })
        .catch(err => {
          console.log(err);
        }).finally(() => { setloading(false) })
    }
   fetchProducts()
  }, [page, pageSize, setactiveNavLink, token])
  // const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);
  // const endDate=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
//   const productsRequest = useQuery({
//     queryKey: ['products', page, pageSize],
//     queryFn: () => fetchProducts({token, startDate, endDate,quantityThreshold:6,
// revenueThreshold:10   })

//   })

  return (
    <div className=' w-full h-full md:mb-6 sm:mb-10 xl:my-0 mb-12'>
      
       
        <Box className='w-auto self-start  h-auto  mb-5  text-center
        ' sx={{ mx: { lg: "20px", xl: "30", md: '14px', sm: '3px' }, my: 2 }}>
          {errorMessage?.length ?
            <ErrorMessage error={errorMessage}
              handleReset={() => seterrorMessage('')} /> : null}
           <button onClick={()=>setopenAddModal(true)}
                className='float-right mx-1 mr-5 px-4 py-2 mb-3 rounded bg-green-600
              shadow shadow-slate-200 text-white
              dark:text-slate-100'>
                Add Product
        </button>
        <div>

         <TopSellingSection data={TopSelling}/>
        </div>
        <ProductsDataGrid
          products={products}
          page={page}
            setpage={setpage} pageSize={pageSize}
          setpageSize={setpageSize}
          totalPages={totalPages}
          loading={loading} 
          />
        </Box>
      
      
      <SideModal showSideModal={openAddModal}
        setShowSideModal={setopenAddModal} 
        socket={socket}
      />
      {(isAdmin || isManager) ?
        <>

          <Button
            className='text-lg text-slate-700 dark:text-slate-50
             shadow-md bg-slate-50 dark:bg-slate-700 '
            color='success'
            sx={{
              mx: { xl: 3, lg: 3, md: 3, sm: 2, xs: 'auto' },
            mb:3, mt:1}}
        onClick={() => setshowUpdates(prev => !prev)}>
        {showUpdates? 'hide ': 'Show ' }Updates
      </Button>
          {showUpdates && <ProductsUpdates />}
        </>: null
      }

       {/* <Button color='success'
        onClick={() => setshowAdds(prev => !prev)}>
        {showAdds? 'hide ': 'Show ' }Adds
      </Button>
      {showAdds && <ProductsUpdates />} */}
         </div>
  );
}

export default InventoryPage;
