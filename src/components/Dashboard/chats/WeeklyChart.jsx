import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function WeeklyChart({daysDate}) {
  return (
     <LineChart
                  width={600}
                  height={300}
                  data={daysDate}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="money" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="productQuantity" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
  )
}
