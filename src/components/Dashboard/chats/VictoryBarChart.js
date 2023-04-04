import React from 'react';
import { VictoryBar, VictoryChart, VictoryLegend } from 'victory';

const data = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 3500 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 7500 },
];

const legendData = [
  { name: 'revenue', symbol: { fill: 'tomato' } },
];

const VictoryBarChart = () => {
  return (
    <div>
      <VictoryChart domainPadding={{ x: 50 }}>
        <VictoryBar data={data} x="month" y="revenue" />
        <VictoryLegend
          x={100}
          y={300}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: 'black' }, title: { fontSize: 20 } }}
          data={legendData}
        />
      </VictoryChart>
    </div>
  );
};

export default VictoryBarChart;
