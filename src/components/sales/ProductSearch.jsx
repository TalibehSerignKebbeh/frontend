import React, { useState } from 'react';
import SearchProducts from './Select/SearchProducts';

const ProductSearch = ({selected, setselected}) => {
  const [products, setproducts] = useState([]);

    return (
        <div>
            <SearchProducts selected={selected} setselected={setselected} setproducts={setproducts} products={products} />
        </div>
    );
}

export default ProductSearch;
