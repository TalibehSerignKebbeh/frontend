import { Select, Spin } from 'antd'
import React, { useState } from 'react'
// import useAuth from '../../hooks/useAuth';
// import { queryInstance } from '../../api';

// const {Option } = Select
export default function SearchUser({ user, setuser,
  onClear, onSelect, users }) {
    // const {token}= useAuth()
  const [usersArray, setUserArray] =
    useState(users?.length ? [...users?.map((person) => {
      return {
        ...person, fullName: person?.firstName + " " + person?.lastName,
        value:person?._id,label:person?.firstName + " " + person?.lastName,
      }
    })] : []);

    // const [searchTerm, setSearchTerm] = useState('');
    // const [filteredProducts, setFilteredProducts] = useState([]);
  // const [searching, setsearching] = useState(false);
  // const handleSearch = async (string) => {
  //     if(string?.length <2) return
  //       // console.log(string);
  //       setsearching(true)
  //       setSearchTerm(string);
  //       await queryInstance.get(`/users`, {params: {searchKey: string}, headers:{Authorization:`Bearer ${token}`}})
  //           .then((res) => {
  //           setUsers(res?.data?.users)
  //           }).catch((err) => {
  //           // alert(err?.response?.data?.message || 'an error occured')
  //       }).finally(()=>setsearching(false))
        
  //   }
    
    return (
      <Select className='w-48 bg-white dark:bg-slate-500
        text-gray-700 dark:text-white rounded'
            showSearch
            placeholder={'search a user'}
            // searchValue={searchTerm}
            allowClear
            size='large'
            // mode='tags'
            // notFoundContent={searching ? <Spin size='small' /> : null}
            // onSearch={handleSearch}
        options={usersArray}
        value={user}
        // optionLabelProp='username'
        // optionFilterProp='username'
        // labelInValue="username"
        // filterOption="username"
        //   onChange={handleDisplay}
          onClear={onClear}
          onDeselect={() => setuser('')}
            onSelect={(value)=>onSelect(value)}
      >
          {/* {users?.map((user) => (
              <Option key={user?._id}
                  value={user?._id}
              >
                  {user?.firstName +" "+user?.lastName}
              </Option>
      ))} */}
    </Select>
  )
}
