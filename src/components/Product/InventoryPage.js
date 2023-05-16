import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';
// import ProductTable from './Table';
import SideModal from './SideModal';
import { Box, Button } from '@mui/material';
import ProductsDataGrid from './ProductsDataGrid';
import { useQuery } from '@tanstack/react-query';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import ProductsUpdates from './updates/ProductsUpdates';
import useAuth from '../../hooks/useAuth';

const InventoryPage = ({ socket }) => {
  const {isAdmin, isManager, token} = useAuth()
  const [openAddModal, setopenAddModal] = useState(false);
  const [showUpdates, setshowUpdates] = useState(false);
  const [showAdds, setshowAdds] = useState(false);
  const [page, setpage] = useState(0);
  const [pageSize, setpageSize] = useState(20);
  // const [loading, setloading] = useState(false);
  // const [productUpdates, setproductUpdates] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
  const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7);
  const endDate=new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  const productsRequest = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts({token, startDate, endDate,quantityThreshold:6,
revenueThreshold:10   })

  })
  // useEffect(() => {
   
  //   const fetchProductsNotify = async () => {
  //     setloading(true)
  //     await queryInstance.get(`/notifications/products/alldata?page=${page}&pagesize=${pageSize}`)
  //       .then(res => {
  //         console.log(res?.data);
  //         setproductUpdates(res?.data?.notifications)
  //       }).then(() => {
         
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       }).finally(() => { setloading(false) })
  //   }
  //  if(isAdmin || isManager) {fetchProductsNotify()}
  // }, [isAdmin, isManager])
  // console.log(productsRequest?.data);
  useEffect(() => {
    if (productsRequest.isError) {
      seterrorMessage(GetError(productsRequest?.error))
    }
    if (productsRequest?.failureReason) {
      seterrorMessage(GetError(productsRequest?.failureReason))
    }
    
  }, [productsRequest.data, productsRequest?.error, productsRequest?.failureReason, productsRequest.isError, productsRequest.isSuccess])
  return (
    <div className=' w-full h-auto md:mb-6 sm:mb-10 xl:my-0 mb-12'>
      {productsRequest?.isLoading ?
        <section><p>loading.....</p></section> :
        <Box className='w-auto self-start  h-auto  mb-5  text-center
        ' sx={{ mx: { lg: "20px", xl: "30", md: '14px', sm: '3px' }, my: 2 }}>
          {errorMessage?.length ?
            <ErrorMessage error={errorMessage}
              handleReset={() => seterrorMessage('')} /> : null}
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
      {(isAdmin || isManager) ?
        <>

        <Button color='success'
            sx={{
              bgcolor: '#fff', boxShadow: '0px 2px 7px rgba(0,0,0,0.7)',
            mx:{xl:3, lg:3, md:3, sm:2, xs:'auto'}}}
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
