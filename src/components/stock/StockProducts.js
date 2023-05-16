import React,{useState, useEffect} from 'react';
import { queryInstance } from '../../api';
import { useParams } from 'react-router-dom';
import ProductTable from '../Product/Table';
import useAuth from '../../hooks/useAuth';
const StockProducts = () => {
    const { id } = useParams()
    const {token} = useAuth()
    const [products, setproducts] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    
    useEffect(() => {
         const fetchStockProducts = async () => {
        await queryInstance(`/stocks/${id}/products`, {headers:{Authorization:`Bearer ${token}`}})
            .then(res => {
                console.log(res);
                setproducts(res?.data?.products)
            })
            .catch(err => {
            console.log(err);
        })
    }
        fetchStockProducts()
        return () => {
            
        };
    }, [id, token]);
   
    return (
        <div className=''>
            <ProductTable products={products} />
        </div>
    );
}

export default StockProducts;
