import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const SellProduct = () => {
    const {token, roles} = useAuth()
    const [productToSell, setproductToSell] = useState({ name: '', quantity: 0 });

    const handleSell = async (e) => {
        if(!token) return new AbortController().abort()
        e.preventDefault()
        await axios.post(process.env.custom_url + `/product/sale`, productToSell)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
                // setisError(true)
            })
    }
    return (
        <div>
            <form onSubmit={handleSell}>
                <input className='my-3 border-2 p-2 rounded-sm' type={'text'} value={productToSell.name}
                    onChange={(e) => setproductToSell({ ...productToSell, name: e.target.value })}
                    placeholder="Product name"
                />
                <br />
                <input className='my-3 border-2 p-2 rounded-sm' type={'text'} value={productToSell.quantity || ""}
                    onChange={(e) => setproductToSell({ ...productToSell, quantity: Number(e.target.value) })}
                    placeholder="Product name"
                />
                <br />
                <button className='w-auto h-auto p-3 px-20 rounded-md bg-green-400'>Sell</button>
            </form>
        </div>
    );
}

export default SellProduct;
