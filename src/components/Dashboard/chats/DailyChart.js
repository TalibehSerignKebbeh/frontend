import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DailyChart({ chartData }) {
    const data = chartData?.map(sale =>
  ({
    x: sale._id,
        y: sale.money,
    quantity:sale.quantity,
        money: sale.money,
    date: format(parseISO(sale._id+' 00:00:00.000'), 'do MMM yyyy '),
    label: `Date: ${sale?._id}\n Quantity: ${sale.quantity}\nAmount: ${sale.money}`,
    }));
    data?.sort((a, b)=>a._id- a._id)
  return (
   <LineChart width={800} height={400} data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                className="text-gray-700 dark:text-white">
                  <CartesianGrid strokeDasharray="3 3" 
                    className="text-gray-700 dark:text-white"
                />
          <XAxis dataKey="date"
              className="text-gray-700 dark:text-white" />
                <YAxis className="text-gray-700 dark:text-white"/>
                <Tooltip className="text-gray-700 dark:text-white"/>
                <Legend className="text-gray-700 dark:text-white"/>
          <Line type="basisClosed" dataKey="quantity"
              stroke="#8884d8" activeDot={{ r: 8 }}
                className="text-gray-700 dark:text-white"  />
                  <Line type="monotone" dataKey="money" stroke="#82ca9d" 
                    className="text-gray-700 dark:text-white"
                />
              </LineChart>
  )
}
