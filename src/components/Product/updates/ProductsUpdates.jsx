import React,{useState, useEffect} from 'react';
import useAuth from '../../../hooks/useAuth';
import { queryInstance } from '../../../api';
import ProductsTable from '../../Notifications/Table/ProductsTable';
import  Pagination  from '@mui/material/Pagination';
import SpinnerLoader from '../../Loaders/SpinnerLoader';
import  IconButton  from '@mui/material/IconButton';
import  Close  from '@mui/icons-material/Close';
const ProductsUpdates = () => {
      const {token,isAdmin, isManager} = useAuth()
    const [page, setpage] = useState(0);
  const [total, settotal] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [created_at, setCreated_at] = useState('');
  const [pageSize, setpageSize] = useState(5);
  const [loading, setloading] = useState(false);
  const [productUpdates, setproductUpdates] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');

     useEffect(() => {
   
       const fetchProductsNotify = async () => {
      let filters = { model: 'product', page:page>=0? page :0,pagesize:+pageSize };
     if (created_at?.length) {
       filters={...filters, created_at:created_at}
     }
      setloading(true)
      // await queryInstance.get(`/notifications/products/alldata?page=${page}&pagesize=${pageSize}`)
      await queryInstance.get(`/notifications`, {params:filters, headers:{Authorization:`Bearer ${token}`}})
        .then(res => {
          // console.log(res?.data);
            setproductUpdates(res?.data?.notifications)
          settotal(res?.data?.total)
          settotalPages(res?.data?.totalPages)
          
        }).then(() => {
         
        })
        .catch(err => {
          console.log(err);
        }).finally(() => { setloading(false) })
    }
   if(isAdmin || isManager) {fetchProductsNotify()}
  }, [created_at, isAdmin, isManager, page, pageSize, token])
    return (
        <div className='bg-white shadow-md py-3 flex flex-col justify-center'>
            {loading ?
          <SpinnerLoader /> :
          <div>
            <div>
          <input className='py-4 px-2 border-2 border-slate-200 mb-3 mt-2'
            type='date' value={created_at}
                onChange={e => setCreated_at(e.target.value)} />
              <IconButton disabled={!created_at?.length}
            onClick={() => setCreated_at('')}><Close /></IconButton>
 
        </div>
            <ProductsTable productUpdates={productUpdates} />
            </div>}
            <div className='md:mx-10 mx-auto my-2 text-center'>
                <Pagination page={page+1} siblingCount={3}
                    count={totalPages} showFirstButton showLastButton
            onChange={(event, page) => {
                        setpage(page-1)
            }}
            sx={{m:'auto'}}
            shape='rounded'
           
                />
            </div>
        </div>
    );
}

export default ProductsUpdates;
