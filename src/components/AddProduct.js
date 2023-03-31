import React, {useState} from 'react';
import { queryInstance } from '../api';

const AddProduct = () => {
    const [product, setproduct] = useState({
    name: '', price: 0, category: '', quantity: 0,
    dimensions: '', description: '', picture: ''
  });
  const [uploading, setuploading] = useState(false);
  const [isError, setisError] = useState(false);

     const handleSubmitForm = (e) => {
    e.preventDefault()
    console.log(product);
    setisError(false)
    setuploading(true)
    // console.log([...Array(5).fill(product)]);
    queryInstance.post(`/products`, product)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
        setisError(true)
      }).finally(() => setuploading(false))
  }
  const handlePictureChange = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader()
    reader.onload = x => {
      setproduct({ ...product, picture: x.target.result })
    }
    reader.readAsDataURL(image)
  }
    return (
        <div>
     <form onSubmit={handleSubmitForm}
        className="flex flex-col place-items-center bg-transparent">

        <input className='border-2 p-2 rounded-sm' type={'text'} value={product.name}
          onChange={(e) => setproduct({ ...product, name: e.target.value })}
          placeholder="Product name"
        />
        <br />

        <input className='border-2 p-2 rounded-sm' type={'text'} value={product.category}
          onChange={(e) => setproduct({ ...product, category: e.target.value })}
          placeholder="Product category"
        />
        <br />
        <input className='border-2 p-2 rounded-sm' type={'text'} value={product.price || ""}
          onChange={(e) => setproduct({ ...product, price: Number(e.target.value) })}
          placeholder="Product price"
        />
        <br />
        <input className='border-2 p-2 rounded-sm' type={'number'} value={product.quantity || ""}
          onChange={(e) => setproduct({ ...product, quantity: Number(e.target.value) })}
          placeholder="Product quantity"
        />
        <br />
        {product?.picture ? <img src={product?.picture} height="200px" width={'200px'} alt="" /> : null}
        <input className='p-2 rounded-sm' type={'file'}
          onChange={handlePictureChange}
        />
        <br />
        <input className='border-2 p-2 rounded-sm' type={'text'} value={product.description}
          onChange={(e) => setproduct({ ...product, description: e.target.value })}
          placeholder="Product description"
        />
        <br />

        <button  >{uploading? "uploading..." : 'Submit'}</button>
      </form>   
        </div>
    );
}

export default AddProduct;
