import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DailyChart({ chartData }) {
  // console.log(chartData);
  const data = chartData?.map(sale =>
  ({
    x: sale._id,
    y: sale.money,
    quantity: sale.quantity,
    money: sale.money,
    profit: sale?.profit,
    date: isValid(parseISO(sale._id)) ? format(parseISO(sale._id + ' 00:00:00.000'), 'do MMM yyyy ') : '',
    label: `Date: ${sale?._id}\n Quantity: ${sale.quantity}\nAmount: ${sale.money}`,
  }));
  data?.sort((a, b) => a._id - a._id)
  return (
    <LineChart width={800} height={400} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3"
        strokeWidth={3} color='#3333'
      />
      <XAxis dataKey="date"
        stroke='#333' widths={20} strokeWidth={2} color='#333' />
      <YAxis stroke='#333' widths={20} strokeWidth={2} color='#333' />
      <Tooltip />
      <Legend />
      <Line type="basisClosed" color='#00CED1'
        dataKey="quantity" stroke="#8884d8" strokeWidth={5} activeDot={{ r: 8 }}
        className="text-gray-700 dark:text-white" />
      <Line type="monotone" dataKey="money" stroke="#333"
        className="text-gray-700 dark:text-white"
      />
      <Line type="monotone" dataKey="profit" stroke="#006400"
        className="text-gray-700 dark:text-white"
      />
    </LineChart>
  )
}
