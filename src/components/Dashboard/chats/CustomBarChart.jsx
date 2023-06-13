import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomBarChart = (
    { data, xDataKey, bar1Key, bar2Key }
) => {
    return (
                            <BarChart
                      className="min-w-[300px] w-fit min-h-[300px] h-auto "
                      width={data?.length * 100} height={400}
                      style={{color:'inherit'}}
                      // barSize={10} barGap={3}
                      // barCategoryGap={3}
                      data={data} margin={{
                        top: 20, right: 30,
                        left: 20, bottom: 5
                      }}>
                    <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={xDataKey}
                        spacing={1} 
                    />
                      <YAxis        />
                    <Tooltip />
                    <Legend color="green" />
                      <Bar dataKey={bar1Key}
                      maxBarSize={20} fill="blue" 
                        spacing={3}
                      />
                      <Bar dataKey={bar2Key}
                      maxBarSize={20} fill="red" 
                        spacing={3}
                      />
                      
                    </BarChart>
    );
}

export default CustomBarChart;
