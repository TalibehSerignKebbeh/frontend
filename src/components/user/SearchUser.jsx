import { Select, Spin } from 'antd'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { queryInstance } from '../../api';

const {Option } = Select
export default function SearchUser({ user, setuser, onClear, onSelect }) {
    const {token}= useAuth()

    const [users, setUsers] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    // const [filteredProducts, setFilteredProducts] = useState([]);
  const [searching, setsearching] = useState(false);
  const handleSearch = async (string) => {
      if(string?.length <2) return
        // console.log(string);
        setsearching(true)
        setSearchTerm(string);
        await queryInstance.get(`/users`, {params: {searchKey: string}, headers:{Authorization:`Bearer ${token}`}})
            .then((res) => {
            setUsers(res?.data?.users)
            }).catch((err) => {
            // alert(err?.response?.data?.message || 'an error occured')
        }).finally(()=>setsearching(false))
        
    }
    
    return (
      <Select className='w-40 bg-white dark:bg-slate-500
        text-gray-700 dark:text-white rounded'
            showSearch
            placeholder={'search a user'}
            // searchValue={searchTerm}
            allowClear
            size='large'
            // mode='tags'
            notFoundContent={searching ? <Spin size='small' /> : null}
            onSearch={handleSearch}
          
        value={user}
        
        //   onChange={handleDisplay}
          onClear={onClear}
          onDeselect={() => setuser('')}
            onSelect={(value)=>onSelect(value)}
      >
          {users?.map((user) => (
              <Option key={user?._id}
                  value={user?._id}
              >
                  {user?.firstName +" "+user?.lastName}
              </Option>
      ))}
    </Select>
  )
}
