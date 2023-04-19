import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SearchableProductSelect = ({ products, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm.length === 0) {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
const handleDisplay = (productId) => {
    const selectedProduct = products.find(product => product._id === productId);
    setSearchTerm(`${selectedProduct?.name} - D${selectedProduct?.price}`);
  };
  return (
    <Select
      showSearch
      allowClear
      value={searchTerm}
      onSearch={handleSearch}
          style={{ width: 200 }}
          onChange={handleDisplay}
          onSelect={handleSelect}
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
