import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function WeeklyChart({daysDate}) {
  return (
     <LineChart
                  width={600}
                  height={300}
                  data={daysDate}
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <XAxis color='#333' stroke='#333' strokeWidth={2}  width={10}  dataKey="date" />
                  <YAxis color='#333' stroke='#333' strokeWidth={2}  width={10}  />
                  <CartesianGrid strokeDasharray="1 1" strokeWidth={5} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="money" stroke="#8884d8"
                  strokeWidth={2}  activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="profit" stroke="#333"
                  strokeWidth={2}  activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="productQuantity" stroke="#00b8e6" 
                  strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
  )
}
