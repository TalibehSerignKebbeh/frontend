import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { queryInstance } from '../../../api';
import ProductsTable from '../Table/ProductsTable';
import Pagination from '@mui/material/Pagination';
import SpinnerLoader from '../../Loaders/SpinnerLoader';
import  IconButton  from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

const SingleProductEvents = () => {
    const { id } = useParams()
    const [loading, setloading] = useState(false);
    const [page, setpage] = useState(0);
  const [created_at, setCreated_at] = useState('');
    const [pageSize, setpageSize] = useState(10);
    const [count, setcount] = useState(0);
    const [totalPages, settotalPages] = useState(1);
    const [events, setevents] = useState([]);
    useEffect(() => {
        const fetchUpdates = async () => {
      let filters ={model:'product', modelId:id, page, pagesize:pageSize}
        if (created_at?.length) {
       filters={...filters, created_at:created_at}
            }
            setloading(true)
         await queryInstance.get(`/notifications`, {params:filters})
           .then((res) => {
             console.log(res);
               if (res?.status === 200) {
                   setevents(res?.data?.notifications)
                   setpage(res?.data?.page)
                   setcount(res?.data?.count)
                   settotalPages(res?.data?.totalPages)
            //  setproductUpdates(res?.data?.notifications);
            //  console.log(res?.data);
           }
           }).catch((err) => {
           console.log(err);
           }).finally(() => {
             setloading(false)
         });
       };
       fetchUpdates();
    
        return () => {
            
        };
    }, [created_at, id, page, pageSize]);
    return (
        <div>
            <div>
          <input className='md:mx-10 mx-4 py-4 px-2 border-2 border-slate-200 mb-3 mt-2'
            type='date' value={created_at}
                onChange={e => setCreated_at(e.target.value)} />
              <IconButton disabled={!created_at?.length}
            onClick={() => setCreated_at('')}><Close /></IconButton>
 
            </div>{loading ?
                <SpinnerLoader /> :
              <>
                    
            <ProductsTable productUpdates={events} />
             <div className='md:mx-10 mx-auto my-2 text-center'>
                <Pagination page={page+1} siblingCount={3}
                    count={totalPages} showFirstButton showLastButton
            onChange={(event, page) => {
                        setpage(page-1)
                            }}
            size='large'
            sx={{m:'auto'}}
            shape='rounded'
           
                />
            </div>
              </>  
        }
        </div>
    );
}

export default SingleProductEvents;
