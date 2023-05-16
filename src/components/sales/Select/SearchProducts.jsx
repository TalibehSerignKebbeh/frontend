import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import {queryInstance} from '../../../api'
import useAuth from '../../../hooks/useAuth'
const { Option } = Select;


const SearchProducts = ({ selected, setselected }) => {
    const {token}= useAuth()
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setproducts] = useState([]);
  const [searching, setsearching] = useState(false);
    const handleSearch = async (string) => {
        // console.log(string);
        setsearching(true)
        setSearchTerm(string);
        await queryInstance.get(`/products`, {params: {searckValue: string}, headers:{Authorization:`Bearer ${token}`}})
            .then((res) => {
            setproducts(res?.data?.products)
            }).catch((err) => {
            alert(err?.response?.data?.message || 'an error occured')
        })
        
    }
    const handleDisplay = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    setSearchTerm(`${selectedProduct?.name} - D${selectedProduct?.price}`);
  };
    return (
        <div>
            <Select
      showSearch
      size='middle'
      mode='multiple'
      allowClear
      value={selected}
      notFoundContent={searching? <Spin size='small'/> : null}
      onSearch={handleSearch}
          style={{ width: 200 }}
          onChange={handleDisplay}
          // onSelect={handleSelect}
          loading={searching}
      onDeselect={(value) => {
        const newValues = selected?.filter(avalue => avalue !== value)
        setselected(newValues)
      }}
      onSelect={(value) => {
         setselected([...selected, value])
          }}
    >
      {products?.map(product => (
        <Option key={product._id} value={product?._id}>
          {product?.name}
        </Option>
      ))}
    </Select> 
        </div>
    );
}

export default SearchProducts;
