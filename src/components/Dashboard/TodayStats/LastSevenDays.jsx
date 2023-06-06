import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { queryInstance } from '../../../api'
import SkeletonLoaders from '../../Loaders/SkelelonLoader'
import SalesDataGridVir from '../../sales/SalesDataGridVir'
 

export default function LastSevenDays() {
    const { token } = useAuth()
    const today = new Date();
    const [date, setDate] = useState( 
          today.setDate(today.getDate() - 7)
    )

    const fetchSalesToday = async() => {
  return queryInstance
      .get(`/sales/stats/date?saleDate=${new Date()}`,
          {
              headers: { Authorization: `Bearer ${token}` },
          params:{date: new Date()}})
    .then((res) => {
        if (res?.status === 200) return res?.data;
       return Promise.reject(res);
        
    })
    .catch((err) => {
       return Promise.reject(err);
    });
};
    
    const fetchFunc = useQuery({
        queryFn: fetchSalesToday,
        queryKey:['salesTodayStats']
        
    })
    if (fetchFunc?.isSuccess) {
       console.log(fetchFunc?.data);
   }
    if (fetchFunc?.isLoading)
        return <SkeletonLoaders />
  return (
    <div>
      <SalesDataGridVir data={fetchFunc?.data?.sales}
                loading={fetchFunc?.isLoading}
                total={fetchFunc?.data?.money}
          />
          
    </div>
  )
}
