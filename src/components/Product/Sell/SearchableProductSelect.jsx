import React, { useState } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

const SearchableProductSelect = ({ products, selected,
  setselected,handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searching, setsearching] = useState(false);
  const handleSearch = async(string) => {
    // console.log(string);
    setsearching(true)
    setSearchTerm(string);

    if (string.length === 0) {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product?.name?.toLowerCase().includes(string?.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setsearching(false)
  };
const handleDisplay = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    setSearchTerm(`${selectedProduct?.name} - D${selectedProduct?.price}`);
  };
  return (
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
      onDeselect={(value) => {
        const newValues = selected?.filter(avalue => avalue !== value)
        setselected(newValues)
      }}
      onSelect={(value) => {
         setselected([...selected, value])
          }}
    >
      {filteredProducts?.map(product => (
        <Option key={product._id} value={product._id}>
          {product.name}
        </Option>
      ))}
    </Select>
  );
};

export default SearchableProductSelect;
