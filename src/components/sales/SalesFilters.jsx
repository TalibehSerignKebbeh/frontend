import React from 'react'
import format from 'date-fns/format'
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import SingleProductSearch from './Select/SingleProductSearch';
import SearchUser from '../user/SearchUser';
import Button from '../Buttons/Button';


export default function SalesFilters(
    { date, setdate, user, setuser,
        users,
        deletedBy,setDeletedBy,
        searchFilters, setsearchFilters,
        product, setproduct,
        showProduct, showDeletedUserInput}
) {
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
                        setsearchFilters({ ...searchFilters, date: '' })
                    }} >
                    <Clear />
                </IconButton>
            </div>
            {(typeof(showProduct) === 'boolean' && showProduct) ?
                <div className="flex flex-col">
                <span className='text-lg font-normal '>Search Product</span>
                <SingleProductSearch
                    product={product}
                    setproduct={setproduct}
                    onClear={() => {
                        setproduct('')
                        setsearchFilters({ ...searchFilters, product: '' })
                    }}
                    onSelect={(value) => {
                        setsearchFilters({ ...searchFilters, product: value })
                        setproduct(value)
                    }}
                />
            </div> : null}
            <div className="flex flex-col">
                <span className='text-lg font-normal '>Search User</span>
                <SearchUser
                   users={users} user={user}
                    setuser={setuser}
                    onSelect={(value) => {
                        setuser(value)
                        setsearchFilters({ ...searchFilters, user: value })
                    }}
                    onClear={() => {
                        setsearchFilters({ ...searchFilters, user: '' })
                        setuser('')

                    }}
                />
            </div>
            {(typeof (showDeletedUserInput) === 'boolean' && showDeletedUserInput) ?
                <div className="flex flex-col">
                    <span className='text-lg font-normal '>Search Cancelled User</span>
                    <SearchUser user={user}
                        setuser={setuser}
                        onSelect={(value) => {
                        
                            setsearchFilters({ ...searchFilters, deletedBy: value })
                        }}
                        onClear={() => {
                            setsearchFilters({ ...searchFilters, deletedBy: '' })
            

                        }}
                    />
                </div>
                : null}
            {(user?.length || date?.length || product?.length || deletedBy?.length) ?
                <Button text={`Clear filters`}
                clickEvent={() => {
                    setsearchFilters({ date: '', product: '', user: '' })
                    setproduct('')
                    setdate('')
                    setuser('')
                }}
                classNa={`text-white bg-red-500 px-2 py-[10px]
                 rounded-md shadow-lg -mb-5`}
            /> : null}
        </div>
    )
}
