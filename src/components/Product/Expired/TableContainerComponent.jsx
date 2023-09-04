import React, {useEffect, useState} from 'react';
import { queryInstance } from '../../../api';
import useAuth from '../../../hooks/useAuth';
import { GetError } from '../../other/OtherFuctions';
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import TableComp from './TableComp';
import SkeletonLoaders from '../../Loaders/SkelelonLoader';
import FilterInputs from './FilterInputs';
import  CircularProgress  from '@mui/material/CircularProgress';
import { AiOutlineReload } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';


const TableContainerComponent = ({ socket }) => {
    
    const {token} = useAuth()
    const [date, setdate] = useState('');
    const [product, setproduct] = useState('');
    const [user, setuser] = useState('');
    const [type, setType] = useState('');
    const [page, setpage] = useState(0);
    const [pageSize, setpageSize] = useState(10);
     const [errorMsg, seterrorMsg] = useState('');
    // const [cancelled, setcancelled] = useState(false);
      const [searchFilters, setsearchFilters] = useState({
    date: '', product: '', user: '', type:''
  });

    // const fetchSignal = new AbortController();



    
    const { isLoading, isError, error, failureReason,
        data: loadedData, refetch, isRefetching,
    isSuccess,
     } =useQuery({
    queryKey: ['expired_spoilt',page, pageSize, searchFilters?.date, searchFilters?.product, searchFilters?.user, searchFilters?.type ],
    queryFn: async function() {
      let filters = {}

      Object.keys(searchFilters).forEach((key) => {
        if (searchFilters[key]?.length) {
          filters[key] = searchFilters[key]
        }
      })

      filters.page = page;
      filters.pageSize = pageSize;
      return queryInstance.get(`/expires`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params:{...filters}

        }).then(res => res?.data)
        .catch(err => Promise.reject(err))
    },
    refetchInterval: 15000,
    keepPreviousData: true,
  })
    
  useEffect(() => {
    if (isError || error || failureReason) {
        const responseErrorMessage = GetError(error ? error : failureReason)
        seterrorMsg(responseErrorMessage)
    }
    return () => {
        
    };
  }, [isError, error, failureReason]);
    return (
        <div className='md:px-8 sm:px-6 px-4  mt-8'>
            <FilterInputs 
                date={date} setdate={setdate}
                product={product} setproduct={setproduct}
                user={user} setuser={setuser}
                type={type} setType={setType}
                // setcancelled={setcancelled}
                // cancelled={cancelled}
                searchFilters={searchFilters}
                setsearchFilters={setsearchFilters}
            />

            <div>
                {errorMsg?.length ?
                        <ErrorMessage 
                            error={errorMsg}
                            handleReset={()=>seterrorMsg('')}
                        /> : null}
                  
                {!isLoading ?
                    <button disabled={isLoading || isRefetching}
                            onClick={()=>refetch()}
                            className='float-right
                        px-4 py-2 bg-orange-600 text-white
                        rounded-lg mt-7 mb-4 
                         lg:mr-[19%] md:mr-[14%] sm:mr-12 mr-3'
                    >
                        {isRefetching ?
                        <CircularProgress 
                            sx={{transform:'scale(0.6)'}}
                            />
                        :<AiOutlineReload />}
                    </button>
                        : null}

                {isLoading && !loadedData?.array?.length?
                    <SkeletonLoaders /> :
                <div className='
                md:w-[800px] sm:w-[610px]
                w-full h-[550px] '>
                        
                    <TableComp data={loadedData?.array} 
                        page={page} setpage={setpage}
                        setPageSize={setpageSize}
                        pageSize={pageSize}
                            total={loadedData?.total}
                            socket={socket}
                            hideDelete={false}
                    /> 
                </div>}
                
            </div>
            
        </div>
    );
}

export default TableContainerComponent;
