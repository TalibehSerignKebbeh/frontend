import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import {queryInstance} from '../../../api'
import useAuth from '../../../hooks/useAuth'
// import { Clear } from '@mui/icons-material';
const { Option } = Select;


const ProductsSearch = ({ selected, setselected, products, setproducts }) => {
  const { token } = useAuth()
  const [productsToDisplay, setproductsToDisplay] = useState(products?.map(prod => {
    return {...prod, label:prod?.name, value:prod?._id}
  }));
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

//   const searchProduct = (string) => {
//     setSearchTerm(string)
//     setsearching(true)
//     const searchedProducts = products?.filter((product) => {
//    return   product?.name?.includes(string?.toLocaleLowerCase()) ||
//            product?.description?.includes(string?.toLocaleLowerCase())
//     })
//     // console.log(searchedProducts);
//     setproductsToDisplay(searchedProducts?.map(prod => {
//     return {...prod, label:prod?.name, value:prod?._id}
//   }))
//     setsearching(false)
//   }
    const handleDisplay = (productId) => {
    const selectedProduct = products?.find(product => product._id === productId);
    setSearchTerm(`${selectedProduct?.name} - D${selectedProduct?.price}`);
  };
  const productKeysToDelete = ['addedBy','expiryDate','producedDate','updatedAt','quantity']
    return (
        <div className=''>
        <Select className='md:w-[600px] sm:w-[500px]
       min-w-[14rem] max-w-[20rem]'
      size='large'
      mode='multiple'
      showSearch
          // allowClear={!searchTerm?.length}
          // clearIcon={<Clear sx={{}} />}
          onClear={() => {
            setselected(prev => { return [] });
          }}

      value={selected?.map((val)=>val?._id)}
      notFoundContent={searching? <Spin size='small'/> : null}
          onSearch={handleSearch}
    //       optionLabelProp='name'
    //       filterOption={(input, option) =>
    //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    // }
          onChange={handleDisplay}
          // onSelect={handleSelect}
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
            setselected([...selected, {...prod,quantity:1, label:prod?.name, value:prod?._id}])
          }}
          optionFilterProp='label' 
    >
      {products?.map(product => (
        <Option key={product._id} value={product?._id}
        label={product?.name}>
          {`${product?.name} D${product?.price} ${product?.quantityInStock}`}
        </Option>
      ))}
    </Select> 
        </div>
    );
}

export default ProductsSearch;