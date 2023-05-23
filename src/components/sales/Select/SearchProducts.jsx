import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import {queryInstance} from '../../../api'
import useAuth from '../../../hooks/useAuth'
import { Clear } from '@mui/icons-material';
const { Option } = Select;


const SearchProducts = ({ selected, setselected, products, setproducts }) => {
    const {token}= useAuth()
    const [searchTerm, setSearchTerm] = useState('');
    // const [filteredProducts, setFilteredProducts] = useState([]);
  const [searching, setsearching] = useState(false);
  const handleSearch = async (string) => {
      if(string?.length <2) return
        // console.log(string);
        setsearching(true)
        setSearchTerm(string);
        await queryInstance.get(`/products/sale`, {params: {searchKey: string}, headers:{Authorization:`Bearer ${token}`}})
            .then((res) => {
            setproducts(res?.data?.products)
            }).catch((err) => {
            // alert(err?.response?.data?.message || 'an error occured')
        }).finally(()=>setsearching(false))
        
    }
    const handleDisplay = (productId) => {
    const selectedProduct = products?.find(product => product._id === productId);
    setSearchTerm(`${selectedProduct?.name} - D${selectedProduct?.price}`);
  };
  const productKeysToDelete = ['addedBy','expiryDate','producedDate','updatedAt','quantity']
    return (
        <div className='w-fit'>
            <Select className='md:w-1/2 sm:w-10/12 w-11/12'
      showSearch
      size='large'
      mode='multiple'
          allowClear
          clearIcon={<Clear sx={{}} />}
          onClear={()=>{setselected(prev=>{return[]})}}
      value={selected?.map((val)=>val?._id)}
      notFoundContent={searching? <Spin size='small'/> : null}
          onSearch={handleSearch}
          
          style={{ width: 200 }}
          onChange={handleDisplay}
          // onSelect={handleSelect}
          // loading={searching}
      onDeselect={(value) => {
        const newValues = selected?.filter(avalue => avalue?._id !== value)
        setselected(newValues)
      }}
          onSelect={(value) => {
            const prod = products?.find(pro => pro?._id === value)
            productKeysToDelete?.forEach((key) => {
              if (prod.hasOwnProperty(key)) {
                delete prod[key]
              }
            })
            // delete prod?.quantityInStock
            setselected([...selected, {...prod,quantity:1}])
            // setSelectedProds([...selectedProds, prod])
          }}
    >
      {products?.map(product => (
        <Option key={product._id} value={product?._id}>
          {`${product?.name} D${product?.price}`}
        </Option>
      ))}
    </Select> 
        </div>
    );
}

export default SearchProducts;
