import React, { useState, useEffect } from 'react';
import SearchProducts from './Select/SearchProducts';
// import { queryInstance } from '../../api';
import useAuth from '../../hooks/useAuth';
import AddCircle from '@mui/icons-material/AddCircle'
import  Minimize from '@mui/icons-material/Minimize';
import { queryInstance } from '../../api';
import { GetError } from '../other/OtherFuctions';
import SuccessMessage from '../StatusMessages/SuccessMessage';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import { Progress } from 'antd';
import {motion} from 'framer-motion'


const RegisterSale = () => {
  const { token } = useAuth()
  const [selected, setselected] = useState([])
  const [products, setproducts] = useState([])
  const [postingSales, setpostingSales] = useState(false);
  const [postStatus, setpostStatus] = useState({error:``, success:``});
  const [percent, setpercent] = useState(0);


  useEffect(() => {
    //     setproducts(prev => {
    //        return prev
    //    })  
    //     const fetchProducts = async () => {
    //         setloading(true)
    //         await queryInstance.get(`/products`, {headers: {Authorization:`Bearer ${token}`}})
    //             .then(res => {
    //                 const newProducts = res?.data?.products
    //                 setproducts(prev => {
    //                     if (newProducts?.length) return newProducts
    //                     return prev;
    //                 })
    //             }).catch(err => {
    //                 console.log(err);
    //             }
    //             ).finally(() => { setloading(false) })
    //     }
    //     fetchProducts()

    return () => {

    };
  }, [selected, token]);

  const handleSubmit = async () => {
    if (!selected?.length || !token) return;
    setpostStatus({ ...postStatus, error: ``, success: `` })
    selected?.map(sale => sale.saleDate = new Date().toUTCString())
    setpostingSales(true)
    await queryInstance.post(`/sales`, selected,
      {
        headers: { Authorization: `Bearer ${token}` }, onUploadProgress: (values) => {
        setpercent(Math.ceil(values?.progress * 100))
      }})
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setpostStatus({ ...postStatus, success: res?.data?.message })
          return;
        }
          setpostStatus({ ...postStatus, error: GetError(res) })
        
      }).catch((err) => {
        console.log(err);
          setpostStatus({ ...postStatus, error: GetError(err) })
      
    }).finally(()=>{setpostingSales(false)})
  }
  const handleIncrement = (value) => {
      setselected(selected?.map((prod)=>(prod?._id===value?._id?  {...prod, quantity:prod?.quantity+1}: prod)))
  }
   const handleDecrement = (value) => {
      setselected(selected?.map((prod)=>(prod?._id===value?._id?  {...prod, quantity:prod?.quantity-1}: prod)))
  }

  
  return (
    <div>
      <div className='bg-gray-400 w-full md:mx-10 mx-2'>

      <h2 className='text-2xl mt-4 font-normal '>
        Add Sales Here
      </h2>
        <motion.div style={{height: selected?.length? 'auto': '0px'}}
      initial={{ scale: 0 }}
      animate={{ scale: selected?.length? 1 : 0 }}
      transition={{ duration: 0.8 }}
      
    >
        <div style={{ maxHeight: `200px`, width: '600px', marginBlock: '30px',  }}
        className='max-w-screen-sm mt-10'>
        <table className='table table-fixed'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selected?.map((value, index) => (
              <tr key={index}>
                <td className='font-normal py-2'>{value?.name }</td>
                <td className='font-normal py-2'>{value?.price }</td>
                <td className='font-normal py-2'>{value?.quantity }</td>
                <td className='font-normal py-2'>{value?.price * value?.quantity }</td>
                <td className='font-normal py-2'><button onClick={e => handleIncrement(value)}>
                  <AddCircle />
                </button></td>
                <td className='font-normal py-2'><button onClick={e => handleDecrement(value)} disabled={value?.quantity <= 1}>
                  <Minimize />
                </button></td>
              </tr>
            ))}
            <tr>
              <td className='font-normal py-2' colSpan={3} align='right'>Total</td>
              <td className='font-normal py-2'  align='left'>{selected?.reduce((prev, current)=>{return  prev + (current?.quantity * current?.price)},0) }</td>
            </tr>
          </tbody>
        </table>
          </div>
    </motion.div>
   
      <div
        className="my-4  flex 
          flex-row flex-wrap gap-6 items-end gap-x-4 mb-7"
      >
        <div className='w-full h-auto'>
        <div className='block' style={{ width: `fit-content`,display:'block', height: `auto`, textAlign:'start' }}>
          {postStatus?.success ? <SuccessMessage message={postStatus?.success}
            resetFunction={() => setpostStatus({ ...postStatus, success: `` })} />
            : null}
          {postStatus?.error ? <ErrorMessage error={postStatus?.success}
            handleReset={() => setpostStatus({ ...postStatus, error: `` })} />
            : null}
        </div>
        </div>
        <SearchProducts
          selected={selected}
          setselected={setselected}
          products={products}
          setproducts={setproducts}
        />
        <button
          style={{ backgroundColor: "green", marginInline:'10px' }}
          className="ml-10 bg-green-900 p-2
            text-white py-2 px-8 h-fit rounded-lg "
          onClick={handleSubmit}
        >
          {/* {postingSales? `adding....` : `Add`} */}
          {postingSales? <Progress  percent={percent} size={`small`}/> : `Add`}
        </button>
      </div>
      </div>
    </div>
  );
}

export default RegisterSale;
