import React, { useState } from 'react';
// import SearchProducts from './Select/SearchProducts';
import useAuth from '../../hooks/useAuth';
import { queryInstance } from '../../api';
import { GetError } from '../other/OtherFuctions';
import SuccessMessage from '../StatusMessages/SuccessMessage';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import  CircularProgress  from '@mui/material/CircularProgress';
import ReceiptTable from './ReceiptTable';
import {QueryClient} from '@tanstack/react-query'
import ProductsSearch from './Select/ProductsSearch';


const RegisterSale = ({ socket, products,
  setproducts, loadingProducts }) => {
  const  client = new QueryClient()
  const { token } = useAuth()
  const [selected, setselected] = useState([])
  const [postingSales, setpostingSales] = useState(false);
  const [postStatus, setpostStatus] = useState({error:``, success:``})

  const handleSubmit = async () => {
    if (!selected?.length || !token) return;
    setpostStatus({ ...postStatus, error: ``, success: `` })
    // selected?.map(sale => sale.saleDate = new Date().toUTCString())
   const listToSubmit =  selected?.map(
            (prod) =>
            (!prod?.saleDate?.length ?
                { ...prod, saleDate: new Date().toUTCString() } : prod))

    setpostingSales(true)
    await queryInstance.post(`/sales`, listToSubmit,
      {
        headers: { Authorization: `Bearer ${token}` }, onUploadProgress: (values) => {
      
      }})
      .then(async(res) => {
        // console.log(res);
        if (res?.status === 200) {
          socket.emit('notify_sale')
          
          // socket.emit()
          setpostStatus({ ...postStatus, success: res?.data?.message })
          client.invalidateQueries({queryKey:['products']})
          return;
        }
          setpostStatus({ ...postStatus, error: GetError(res) })
        
      }).catch((err) => {
        // console.log(err);
          setpostStatus({ ...postStatus, error: GetError(err) })
      
    }).finally(()=>{setpostingSales(false)})
  }
  const handleIncrement = (value) => {
      setselected(selected?.map((prod)=>(prod?._id===value?._id?  {...prod, quantity:prod?.quantity+1}: prod)))
  }
  const handleDecrement = (value) => {
    const selectedProduct = selected?.find((prod) => prod?._id === value?._id)
    if (selectedProduct && selectedProduct?.quantity <= 1) {
      const newSelectedProducts = selected?.filter(prod => prod?._id !== selectedProduct?._id)
      setselected(newSelectedProducts)
      return
    };
      setselected(selected?.map((prod)=>(prod?._id===value?._id?  {...prod, quantity:prod?.quantity-1}: prod)))
  }

  return (
    <div
      // style={{ backgroundColor: `gray`, paddingBlock: `2rem` }}
      className='bg-text-4xl bg-slate-200 dark:bg-slate-700 
      mb-5 mt-2 py-2 
      shadow-gray-400 dark:shadow-slate-800 
      shadow-md max-h-fit h-auto'
    >
      <div className='w-full md:mx-10 mx-2 overflow-x-auto'>

        <h2 className='text-2xl my-2 font-light 
       dark:text-slate-50 text-slate-800'
        >
        Add Sales Here
      </h2>
  
        {selected?.length ?
          <ReceiptTable selected={selected}
            setselected={setselected}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
           /> : null}
   
      <div
        className="my-4  flex 
          flex-row flex-wrap gap-6 items-end gap-x-4 mb-7"
      >
        <div className='w-full h-auto'>
        <div className='block' style={{ width: `fit-content`,display:'block', height: `auto`, textAlign:'start' }}>
          {postStatus?.success ? <SuccessMessage message={postStatus?.success}
            resetFunction={() => setpostStatus({ ...postStatus, success: `` })} />
            : null}
          {postStatus?.error ? <ErrorMessage error={postStatus?.error}
            handleReset={() => setpostStatus({ ...postStatus, error: `` })} />
            : null}
        </div>
          </div>
          {loadingProducts ?
            <span>loading..</span> : null}
        <ProductsSearch
          selected={selected}
          setselected={setselected}
          products={products}
          setproducts={setproducts}
        />
        <button disabled={!selected?.length}
            style={{
              backgroundColor: "green",
              marginInline: '10px', paddingInline: '40px'
            }}
          className="ml-10 bg-green-900 
            text-white py-2 h-fit rounded-md 
            justify-self-end"
          onClick={handleSubmit}
        >
            {postingSales ?
              <CircularProgress sx={{ color: 'red' }} size={`small`} />
              : `Upload`}
          </button>
          {/* <button
            
            className="relative 
          ml-10 bg-blue-600 
            text-white py-2 h-fit rounded-md 
            px-5">

            Local Save
          </button> */}
      </div>
      </div>
    </div>
  );
}

export default RegisterSale;
