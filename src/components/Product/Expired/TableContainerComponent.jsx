import React, {useEffect, useState} from 'react';
import { queryInstance } from '../../../api';
import useAuth from '../../../hooks/useAuth';
import { GetError, isStringValidDate } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import TableComp from './TableComp';
import SkeletonLoaders from '../../Loaders/SkelelonLoader';
import FilterInputs from './FilterInputs';
import  CircularProgress  from '@mui/material/CircularProgress';
import { AiOutlineReload } from 'react-icons/ai';


const TableContainerComponent = ({ socket }) => {
    const {token} = useAuth()
    const [date, setdate] = useState('');
    const [product, setproduct] = useState('');
    const [user, setuser] = useState('');
    const [type, setType] = useState('');
    const [page, setpage] = useState(0);
    const [total, settotal] = useState(0);
    const [pageSize, setpageSize] = useState(10);
     const [errorMsg, seterrorMsg] = useState('');
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    const [refetching, setrefetching] = useState(false);
    const [cancelled, setcancelled] = useState(false);
    const fetchSignal = new AbortController();
    
    useEffect(() => {
        const FetchData = async () => {
            setloading(true)
            let filters = {};
            filters.page = page;
            filters.pageSize = pageSize;
            if (product?.length) filters.product = product;
            if (user?.length) filters.user = user;
            if (type?.length) filters.type = type;
            if (data?.length && isStringValidDate(data))
                filters.date = date;
            await queryInstance.get(`/expires`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params:{...filters}, signal: fetchSignal?.signal,
                })
                .then((res) => {
                    console.log(res?.data);
                    setdata(res?.data?.array)
                    settotal(Number(res?.data?.total))
                 
                }).catch((err) => {
                console.log(err);
                seterrorMsg(GetError(err))
            }).finally(()=>setloading(false))
        }

        FetchData()
        return () => {
            // fetchSignal?.abort()
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ date, page, pageSize, product, token, type, user]);
    const refetchData =async () => {
        setrefetching(true)
            let filters = {};
            filters.page = page;
            filters.pageSize = pageSize;
            if (product?.length) filters.product = product;
            if (user?.length) filters.user = user;
            if (type?.length) filters.type = type;
            if (data?.length && isStringValidDate(data))
                filters.date = date;
            if (typeof cancelled === 'boolean') {
                filters.cancelled = cancelled;
            }
            await queryInstance.get(`/expires`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params:{...filters},signal: fetchSignal?.signal,
                })
                .then((res) => {
                    console.log(res?.data);
                    setdata(res?.data?.array)
                    settotal(Number(res?.data?.total))
                 
                }).catch((err) => {
                console.log(err);
                seterrorMsg(GetError(err))
            }).finally(()=>setrefetching(false))
   }
    return (
        <div className='md:px-8 sm:px-6 px-4  mt-8'>
            <FilterInputs 
                date={date} setdate={setdate}
                product={product} setproduct={setproduct}
                user={user} setuser={setuser}
                type={type} setType={setType}
                setcancelled={setcancelled}
                cancelled={cancelled}
            />

            <div>
                {errorMsg?.length ?
                        <ErrorMessage 
                            error={errorMsg}
                            handleReset={()=>seterrorMsg('')}
                        /> : null}
                  
                {!loading ?
                    <button disabled={refetching}
                            onClick={refetchData}
                            className='float-right
                        px-4 py-2 bg-orange-600 text-white
                        rounded-lg mt-7 mb-4 
                         lg:mr-[19%] md:mr-[14%] sm:mr-12 mr-3'
                    >
                        {refetching ?
                        <CircularProgress 
                            sx={{transform:'scale(0.6)'}}
                            />
                        :<AiOutlineReload />}
                    </button>
                        : null}

                {loading && !data?.length?
                    <SkeletonLoaders /> :
                <div className='
                md:w-[800px] sm:w-[610px]
                w-full h-[550px] '>
                        
                    <TableComp data={data} 
                        page={page} setpage={setpage}
                        setPageSize={setpageSize}
                        pageSize={pageSize}
                            total={total}
                            socket={socket}
                            hideDelete={false}
                    /> 
                </div>}
                
            </div>
            
        </div>
    );
}

export default TableContainerComponent;
