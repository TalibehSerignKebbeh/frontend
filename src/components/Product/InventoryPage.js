import React, { useEffect, useState } from 'react';
import { fetchProducts, queryInstance } from '../../api';
// import ProductTable from './Table';
import SideModal from './SideModal';
import { Box } from '@mui/material';
import ProductsDataGrid from './ProductsDataGrid';
import { useQuery } from '@tanstack/react-query';

const InventoryPage = () => {
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
  useEffect(() => {
   
    // const fetchProducts = async () => {
    //   setloading(true)
    //   await queryInstance.get(`/products`)
    //     .then(res => {
    //       console.log(res?.data);
    //       setproducts(res?.data?.products)
    //     }).then(() => {
         
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     }).finally(() => { setloading(false) })
    // }
    // fetchProducts()
  }, [])
  return (
    <div className=' w-full h-auto md:mb-0 sm:mb-10 xl:my-0 mb-12'>
      {productsRequest?.isLoading ? <section><p>loading.....</p></section> :
        <Box className='w-auto self-start  h-auto  mb-5  text-center
        ' sx={{mx: {lg:"20px", xl:"30", md:'14px', sm:'3px'}, my:2}}>
          <div className='w-full h-auto  bg-white shadow-fuchsia-50 
            shadow-sm rounded-lg md:mr-2'>
            <div className='w-full h-auto py-3 mx-1 my-3'>
              <h3 className='float-left md:mx-3 mx-1 text-xl font-semibold'>
                Overall Inventory
              </h3>
              <button onClick={()=>setopenAddModal(true)}
                className='float-right mx-1 mr-5 px-3 py-1 bg-green-600
              shadow shadow-green-600'>
                Add Product
              </button>
            </div>
            <div className='flex flex-row flex-wrap md:divide-x-2
            w-full h-auto justify-between md:pr-4 p-0 mb-3 py-2'>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-gray-900'>Categories</h3>
                <h4 className='font-semibold py-1'>14</h4>
                <span>Last 7 days</span>
              </div>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-red-200'>Total Products</h3>
                <h4 className='font-semibold py-1'>700</h4>
                <span>Last 7 days</span>
              </div>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-red-300'>Top Selling</h3>
                <h4 className='font-semibold py-1'>7</h4>
                <span>Last 7 days</span>
              </div>
              <div className='p-4 text-start'>
                <h3 className='font-semibold text-red-600'>Low Selling</h3>
                <h4 className='font-semibold py-1'>17</h4>
                <span>Last 7 days</span>
              </div>
            </div>

          </div>
          <ProductsDataGrid products={productsRequest?.data?.products} page={page}
            setpage={setpage} pageSize={pageSize}
            setpageSize={setpageSize} loading={ productsRequest?.isLoading} />
          {/* <ProductTable  products={products} /> */}
        </Box>
      }
      
      <SideModal showSideModal={openAddModal} setShowSideModal={setopenAddModal} />
    </div>
  );
}

export default InventoryPage;
