import { Select, Spin } from 'antd'
import React, { useState } from 'react'
import { queryInstance } from '../../../api';
import useAuth from '../../../hooks/useAuth';


const {Option } = Select
export default function SingleProductSearch({ product, setproduct, onClear, onSelect }) {
    const {token}= useAuth()

    const [products, setproducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    // const [filteredProducts, setFilteredProducts] = useState([]);
  const [searching, setsearching] = useState(false);
  const handleSearch = async (string) => {
      if(string?.length <2) return
        // console.log(string);
        setsearching(true)
        setSearchTerm(string);
        await queryInstance.get(`/products/sale`, {params: {searchKey: searchTerm}, headers:{Authorization:`Bearer ${token}`}})
            .then((res) => {
            setproducts(res?.data?.products)
            }).catch((err) => {
            // alert(err?.response?.data?.message || 'an error occured')
        }).finally(()=>setsearching(false))
        
    }
    
    return (
      <Select className='w-48 bg-white dark:bg-slate-500
        text-gray-700 dark:text-white rounded'
            showSearch
            placeholder={'search a product'}
            // searchValue={searchTerm}
            allowClear
            size='large'
            // mode='tags'
            notFoundContent={searching ? <Spin size='small' /> : null}
            onSearch={handleSearch}
          
        value={product}
        
        //   onChange={handleDisplay}
          onClear={onClear}
          onDeselect={() => setproduct(null)}
            onSelect={(value)=>onSelect(value)}
      >
          {products?.map((prod) => (
              <Option key={prod?._id}
                  value={prod?._id}
              >
                  {prod?.name}
              </Option>
      ))}
    </Select>
  )
}
