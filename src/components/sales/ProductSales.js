import React, {useEffect, useState, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import { queryInstance } from '../../api';
import SalesTablePage from './SalesTablePage';
import { EditOffSharp} from '@mui/icons-material'

const ProductSales = () => {
    const { id } = useParams()

    const [sales, setsales] = useState([]);
    const [loading, setloading] = useState([]);
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
    
    useEffect(() => {
        const fetchSales = async () => {
        setloading(true)
        await queryInstance.get(`/sales/${id}/product?page=${page}&&pageSize=${pageSize}`)
            .then(res => {
                console.log(res);
                setsales(res?.data?.sales)
                setrowCount(res?.data?.totalPages)
            }).catch(err => {
                console.log(err);
            }).finally(() => { setloading(false) })
    }
        fetchSales()
        return () => {
            
        };
    }, [page, pageSize, id]);

    useEffect(() => {
        setrowCount(prev => 
            loading ? prev : rowCount
        )
        return () => {
            
        };
    }, [loading, rowCount]);
    return (
        <>
            {
                loading ?
                    <div className='p-4 text-center'>
                        <p>Loading...</p>
                    </div>
                    :
                    <SalesTablePage sales={sales} 
                        setpage={setpage} page={page}
                        columns={columns} totalRowsSize={rowCount}
                        pageSize={pageSize} setpageSize={setpageSize}
                />
            }
            
        </>
    );
}

export default ProductSales;
