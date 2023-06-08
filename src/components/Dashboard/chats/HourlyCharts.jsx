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
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      
                className="text-gray-700 dark:text-white">
                  <CartesianGrid color='#3332' 
        strokeWidth={5} 
                />
      <XAxis stroke='#333' widths={20} strokeWidth={2} color='#333'
        dataKey="hour"  
        
        />
      <YAxis stroke='#333' widths={20} color='#333' 
        strokeWidth={2}
                />
                <Tooltip className="text-gray-700 dark:text-white"/>
                <Legend className="text-gray-700 dark:text-white"/>
      <Line type="basisClosed" color='#333'
        dataKey="quantity" stroke="#8884d8" strokeWidth={5} activeDot={{ r: 8 }}
                className="text-gray-700 dark:text-white"  />
                  <Line type="monotone" dataKey="money" stroke="#333" 
                    className="text-gray-700 dark:text-white"
                />
              </LineChart>
  )
}
