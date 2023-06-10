import React,{useState, useEffect} from 'react';
import { queryInstance } from '../../api';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ProductsDataGrid from '../Product/ProductsDataGrid';

const StockProducts = ({socket, setactiveNavLink}) => {
    const { id } = useParams()
    const {token} = useAuth()
    const [products, setproducts] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [page, setpage] = useState(0);
    const [pageSize, setpageSize] = useState(10);
    useEffect(() => {
        setactiveNavLink('products')
        const fetchStockProducts = async () => {
             setisLoading(true)
        await queryInstance(`/categories/${id}/products`, {params:{page,pageSize}, headers:{Authorization:`Bearer ${token}`}})
            .then(res => {
                // console.log(res);
                setproducts(res?.data?.products)
            })
            .catch(err => {
            // console.log(err);
            }).finally(() => {
             setisLoading(false)
            
        })
    }
        fetchStockProducts()
        return () => {
            
        };
    }, [id, page, pageSize, token]);
   
    return (
        <div className='bg-inherit'>
        

            {/* <ProductTable products={products} /> */}
            <div className='py-4 md:mx-8 sm:mx-2 mx-1'>

            <ProductsDataGrid
                loading={isLoading}
                page={page}
                pageSize={pageSize}
                products={products}
                setpage={setpage}
                setpageSize={setpageSize}
            />
            </div>
            
        </div>
    );
}

export default StockProducts;
