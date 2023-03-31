import React,{useState, useEffect} from 'react';
import { queryInstance } from '../../api';
import { useParams } from 'react-router-dom';
import ProductTable from '../Product/Table';
const StockProducts = () => {
    const { id } = useParams()
    
    const [products, setproducts] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    
    useEffect(() => {
        fetchStockProducts()
        return () => {
            
        };
    }, [id]);
    const fetchStockProducts = async () => {
        await queryInstance(`/stocks/${id}/products`)
            .then(res => {
                console.log(res);
                setproducts(res?.data?.products)
            })
            .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className=''>
            <ProductTable products={products} />
        </div>
    );
}

export default StockProducts;
