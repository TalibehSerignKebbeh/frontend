import  Add  from '@mui/icons-material/Add';
import React,{useState,useEffect} from 'react';
import SearchableProductSelect from './Sell/SearchableProductSelect';

const SellForm = ({ product, setproduct, products,setproductsTosell,
productsTosell }) => {
    const [search, setsearch] = useState('');
    const [options, setoptions] = useState([]);
    const [selected, setselected] = useState([]);
     const handleChangeProduct = (e) => {
        const value = e.target.value;
        const selectedProduct = products?.find(prod => prod?._id === value)
        setproduct({
            ...product, productId: value, name: selectedProduct?.name,
            price: selectedProduct?.price,
        })
    }
    const handleAddProductToCart = (e) => {
        e.preventDefault();
        if (!product?.quantity || !product?.productId) return;
        setproductsTosell([...productsTosell, { ...product, total: product?.price * product?.quantity }])

    }
    useEffect(() => {
        // console.log(products);
        if (search?.length === 0) {
            setoptions([])
            return;
        }
        const filteredOptions = products?.filter((product) => {
            return product?.name?.toLowerCase()?.includes(search?.toLowerCase()) || product?.stockId?.name?.toLowerCase()?.includes(search?.toLowerCase())
        })
        // console.log(filteredOptions);
        setoptions(filteredOptions)
        
        return () => {
            
        };
    }, [products, search]);
    return (
        <form className={`text-start flex flex-row flex-wrap gap-2
                    items-end mt-2`}
                            onSubmit={handleAddProductToCart}>
                            {/* <span>{productsTosell?.length}</span> */}
                            <div className=" w-auto  h-auto flex flex-col ">
                                <label className='block -mb-1 px-1 text-lg' htmlFor="id">Product</label>
                                <input className='border-2 border-gray-700 w-60 
                            h-12 rounded-md px-2 mx-auto my-3 p-1' type='text' placeholder='Search products'
                                value={search} onChange={e=>setsearch(e.target.value)}/>
                                <select
                                    className='border-2 border-gray-700  w-60 
                            h-12 rounded-md px-2 mx-auto my-3 p-1'
                                    value={product?.productId} id="id" name='id'
                                    multiple={false} onChange={handleChangeProduct}
                                >
                                    <option className='w-full' value={''}>None</option>
                                    {options?.map((aproduct, id) => (
                                        <option key={id} value={`${aproduct?._id}`}>
                                            {`${aproduct?.name} D${aproduct?.price} ${aproduct?.quantityInStock}`}
                                        </option>
                                    ))}
                                </select>
            </div>
            <SearchableProductSelect selected={selected}
                setselected={setselected}
                products={products} handleSelect={(obj) => {
                console.log(obj)
            }} />

                            <div className=" w-auto h-auto ">
                                <label className='block -mb-1 px-1 text-lg' htmlFor="quantity">quantity</label>
                                <input className='border-2 border-gray-700
                         w-28 h-12 rounded-md px-2 mx-auto my-3'
                                    type="text" id="quantity"
                                    placeholder='quantity'
                                    value={product?.quantity || ''}
                                    onChange={e => setproduct({ ...product, quantity: Number(e.target.value) })}
                                />
                            </div>
                            <div className=' py-2 mb-1 pb-3'>
                                <button type='submit'
                                    className='relative my-auto ml-auto mr-6 bg-white
                           shadow-white p-1  rounded-2xl hover:bg-zinc-300'
                                    disabled={!product?.productId || !product?.quantity}
                                    // onClick={() => handleAddProductToCart}
                                >
                                    <Add className='scale-150' />
                                </button>
                            </div>

                        </form>
    );
}

export default SellForm;
