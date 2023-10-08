import React, {useEffect, useState, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import { queryInstance } from '../../api';
import SalesTable from './SalesTable';
import { EditOffSharp } from '@mui/icons-material'
import useAuth from '../../hooks/useAuth';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import { useQuery } from '@tanstack/react-query';


const ProductSales = ({socket, setactiveNavLink}) => {
    const {token} = useAuth()
    const { id } = useParams()
    const [product, setproduct] = useState(null);
    const [error, seterror] = useState('');
    const [total, settotal] = useState(0);
    const [sales, setsales] = useState([]);
     const [pageSize, setpageSize] = useState(20);
    const [page, setpage] = useState(0);
    const [rowCount, setrowCount] = useState(0);
    const columns = useMemo(() => [

        { field: 'product', headerName: 'Product', minWidth: 110 },
        {
            type: 'number', field: 'price', headerName: 'Price', width: 120,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                }

                const valueFormatted = Number(params.value).toLocaleString();
                return `GMD ${valueFormatted}`;
            },
        },
        {
            type: 'number', field: 'total', headerName: 'Price', width: 120,
            valueFormatter: (params) => {
                if (params.value == null) {
                    return '';
                }

                const valueFormatted = Number(params.value).toLocaleString();
                return `GMD ${valueFormatted}`;
            },
        },
        {
            type: 'number', field: 'quantity', headerName: 'Quantity', width: 110,
        },
        {
            field: 'seller', headerName: 'Seller', minWidth: 150,
            valueFormatter: (params) => {
                return params?.value?.firstName + " " + params?.value?.lastName
            }
        },

        { field: 'actions', headerName: 'Actions',sortable: false, width: 60, renderCells: (params) => {return <EditOffSharp /> } },

        // { field: 'roles', headerName: 'Roles', width: 120, type: 'select', valueOptions: ['admin', 'design', 'engineer', 'employee'], editable: true },
        // {field: 'UserActions', headerName: 'UserActions', width: 180, renderCells: (params)=> <UserActions {...{params, rowId, setrowId}} />},
        // { field: 'Edit', headerName: 'Edit', width: 60, renderCells: (params) => <Edit {...{ params, rowId, setrowId }} /> },
        // { field: 'Delete', headerName: 'Delete', width: 60, renderCells: (params) => <Delete className='delete-icon' onClick={() => DeleteEmp(params.rowId)} /> },
    ], [])

    const { isLoading, isError, data, isSuccess, failureReason, error:fetchError, }
        = useQuery({
        queryKey: [`productsSales ${id}`, page, pageSize],
            queryFn: () => queryInstance.get(`/sales/${id}/product?page=${page}&&pageSize=${pageSize}`,
                { headers: { Authorization: `Bearer ${token}` } })
                .then(res => { return res?.data }).catch((err)=>err),
        
        }, {
            networkMode: 'offlineFirst',
            keepPreviousData: false,
            refetchOnMount:true
        })
    
    
   

    useEffect(() => {
         if (isError || fetchError || failureReason) {
        seterror(GetError(fetchError || failureReason))
    }
        return () => {
            
        };
    }, [isError, fetchError, failureReason]);

    useEffect(() => {
        if (isSuccess) {
        setsales(data?.sales)
        setproduct(data?.product)
        setrowCount(data?.total)
    }
        return () => {
            
        };
    }, [isSuccess]);
    useEffect(() => {
        setrowCount(prev => 
            isLoading ? prev : rowCount
        )
        return () => {
            
        };
    }, [isLoading, rowCount]);
    return (
        <div className='w-full lg:px-14 md:mx-10 sm:px-5 px-2'>
            <div className='w-full'>
                {error?.length ?
                    <div><ErrorMessage error={error}
                        handleReset={() => seterror('')} /></div>
                    :
                    null
                }
            </div>
            <div>
                {(!product && !isLoading) ?
                      <h3>Product Not found</h3>
                    : ((product && isLoading) || product)?
                        <div className='py-2 px-3 md:my-5 my-2 w-fit
                         bg-white dark:bg-slate-600
                         text-gray-800 dark:text-white
                         shadow-md dark:shadow-slate-400 shadow-zinc-100
                         dark:shadwo-slate-500
                         '>
                            <p className='text-sm font-thin my-0'>Product name</p>
                            <h3 className='font-semibold capitalize text-2xl'>
                                {product?.name}
                            </h3>
                        </div>
                        : 
                        <div className='py-2 px-3 md:my-5 my-2 md:w-96 w-fit bg-white dark:bg-slate-600
                         text-gray-800 dark:text-white
                         shadow-xl dark:shadow-slate-400 shadow-zinc-100'>
                            <p className='text-center text-3xl pt-1'>Opps</p>
                            <h3 className='pb-2'>Product not found in the database</h3>
                            </div>
                }
            </div>
                    <SalesTable sales={sales} 
                loading={isLoading}
                deletable={false}
                        rowCount={rowCount}
                        setpage={setpage} page={page}
                        columns={columns} totalRowsSize={rowCount}
                        pageSize={pageSize} setpageSize={setpageSize}
                />
            
            
        </div>
    );
}

export default ProductSales;
