import React from 'react';
import format from 'date-fns/format'
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import SingleProductSearch from '../../sales/Select/SingleProductSearch';
import SearchUser from '../../user/SearchUser';
import Button from '../../Buttons/Button';
const OptionsValues = ['expire', 'spoil']


const FilterInputs = ({
    date, setdate, user, setuser,
    product, setproduct,
    type, setType,
    searchFilters,setsearchFilters
}) => {
    return (
        <div className="flex flex-row flex-wrap items-center
        lg:gap-4 md:gap-3 gap-2 
        my-3 mt-12 bg-white  dark:bg-slate-700
        shadow-sm
        w-fit p-2 pb-3 text-gray-600 dark:text-slate-50"
        >
            <div className="flex-none">
                <label htmlFor="data"
                    className="font-normal mb-3 py-2 
              text-[1.3rem]">Date</label>
                <br />
                <input className="bg-white dark:bg-slate-400 
            border border-gray-400 p-2 py-3 rounded"
                    type="date" name="data" id="data" value={date}
                    onChange={(e) => {
                        setdate(e.target.value)
                    }}
                    max={format(new Date(), 'yyyy-MM-dd')}
                />
                <IconButton className="text-gray-800 dark:text-white
            bg-slate-200 dark:bg-gray-600
            shadow-md hover:bg-current ml-2"
                    onClick={() => {
                        setdate('')
                    }} >
                    <Clear />
                </IconButton>
            </div>

            <div className="flex flex-col">
                <span className='text-lg font-normal '>Search Product</span>
                <SingleProductSearch
                    product={product}
                    setproduct={setproduct}
                    onClear={() => {
                        setproduct('')
                    }}
                    onSelect={(value) => {
                        setproduct(value)
                    }}
                />
            </div>

            <div className="flex flex-col">
                <span className='text-lg font-normal '>Search User</span>
                <SearchUser user={user}
                    setuser={setuser}
                    onSelect={(value) => {
                        setuser(value)
                    }}
                    onClear={() => {
                        setuser('')

                    }}
                />
            </div>
            <div className='flex flex-col '>
                <label className='text-lg font-sans capitalize 
                        text-black dark:text-white'
                    htmlFor='type'>
                    Type
                </label>
                <select value={type}
                    onChange={e => setType(e.target.value)}
                    className='px-2 py-3 w-24
                    border border-orange-200
                    rounded-md bg-white
                    dark:bg-slate-400 
                    text-black dark:text-white   '>
                    <option value="">None</option>
                    {OptionsValues?.map((opt, ind) => (
                        <option value={opt}
                            key={ind}>{opt}</option>
                    ))}
                </select>
            </div>
            {/* <div className="w-auto md:mx-2 mx-1 
                        h-auto p-1
                        rounded-md input-container">
                <span className="py-2 text-lg
                     font-normal text-slate-700 dark:text-slate-50 
           ">Cancell
                </span>
                <label
                    className={`${cancelled ?
                        'bg-green-400' : 'bg-gray-400'} 
                        w-24 rounded-md
                        shadow-md p-[2px]
                        text-start font-normal 
                        text-lg cursor-pointer
                        flex items-center justify-start`}
                    htmlFor="active"
                >

                    <input
                        className={`hidden peer w-full h-full rounded-md `}
                        type="checkbox"
                        name="active"
                        id="active"
                        placeholder=""
                        checked={cancelled}
                        value={cancelled}
                        onChange={(e) => {
                            const { target: { checked } } = e;
                            setcancelled(checked)
                        }}
                    />
                    <span className="
                        bg-slate-200 
                        h-10 w-10 rounded-[50%] 
                        transform   
                        transition-transform ease-in-out 
                        translate-x-[1px] peer-checked:translate-x-[53px]
            "></span>
                </label>
            </div> */}
            {(user?.length || date?.length || product?.length || type?.length) ?
                <Button text={`Apply filters`}
                clickEvent={() => {
                    setsearchFilters
                        ({
                            date: date, product: product, user: user,
                        type:type})
                   
                }}
                classNa={`text-white bg-blue-500 px-2 py-[10px]
                 rounded-md shadow-lg -mb-5`}
                /> : null}
            {(user?.length || date?.length || product?.length || type?.length
           ) ?
                <Button text={`Clear filters`}
                    clickEvent={() => {
                        setproduct('')
                        setType('')
                        setdate('')
                        setuser('')
                        setsearchFilters({product:'', user:'', type:'', date:''})
                    }}
                    classNa={`text-white bg-red-500 px-2 py-[10px]
                 rounded-md shadow-lg -mb-5`}
                /> : null}
        </div>
    );
}

export default FilterInputs;
