import React,{useState, useEffect} from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import ProductsTable from '../../Notifications/Table/ProductsTable';
import  Pagination  from '@mui/material/Pagination';
import SpinnerLoader from '../../Loaders/SpinnerLoader';

const ProductsUpdates = () => {
      const {isAdmin, isManager} = useAuth()
    const [page, setpage] = useState(1);
    const [total, settotal] = useState(0);
  const [pageSize, setpageSize] = useState(10);
  const [loading, setloading] = useState(false);
  const [productUpdates, setproductUpdates] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');

     useEffect(() => {
   
    const fetchProductsNotify = async () => {
      setloading(true)
      await queryInstance.get(`/notifications/products/alldata?page=${page}&pagesize=${pageSize}`)
        .then(res => {
          console.log(res?.data);
            setproductUpdates(res?.data?.notifications)
            settotal(res?.data?.total)
        }).then(() => {
         
        })
        .catch(err => {
          console.log(err);
        }).finally(() => { setloading(false) })
    }
   if(isAdmin || isManager) {fetchProductsNotify()}
  }, [isAdmin, isManager, page, pageSize])
    return (
        <div className='bg-white shadow-md py-3 flex flex-col justify-center'>
            {loading ?
                <SpinnerLoader /> :
            <ProductsTable stocks={[]} productUpdates={productUpdates}/>}
            <div className='md:mx-10 mx-auto my-2 text-center'>
                <Pagination page={page} siblingCount={3}
                    count={total} showFirstButton showLastButton
                    onChange={(event, page) => {
                        setpage(page)
            }}
            sx={{m:'auto'}}
            shape='rounded'
            onLoadStart={() => {
              console.log("paginnation load start")
            }}
            onLoad={() => {
              console.log("paginnation loaded")
              
            }}
                />
            </div>
        </div>
    );
}

export default ProductsUpdates;
