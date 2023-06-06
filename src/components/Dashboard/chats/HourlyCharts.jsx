import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function HourlyCharts({ hourlyData }) {
    const chartData = hourlyData.map(sale =>
  ({
    x: `${sale.hour}:00 - ${sale?.hour===23? '00' : sale.hour + 1}:00`,
    y: sale.quantityProduct,
    hour: `${sale.hour}:00 - ${sale.hour+1}:00`,
    quantity: sale.quantityProduct,
    money: sale.money,

    label: `${sale.hour}:00 - ${sale.hour + 1}:00\nQuantity: ${sale.quantityProduct}\nAmount: ${sale.revenue}`,
  }));
  return (
    <LineChart width={800} height={400} data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                className="text-gray-700 dark:text-white">
                  <CartesianGrid strokeDasharray="3 3" 
                    className="text-gray-700 dark:text-white"
                />
                <XAxis dataKey="hour" className="text-gray-700 dark:text-white"/>
                <YAxis className="text-gray-700 dark:text-white"/>
                <Tooltip className="text-gray-700 dark:text-white"/>
                <Legend className="text-gray-700 dark:text-white"/>
                  <Line type="basisClosed" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }}
                className="text-gray-700 dark:text-white"  />
                  <Line type="monotone" dataKey="money" stroke="#82ca9d" 
                    className="text-gray-700 dark:text-white"
                />
              </LineChart>
  )
}
