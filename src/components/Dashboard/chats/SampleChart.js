import React from 'react';
import { VictoryChart, VictoryBar, VictoryPie, VictoryLegend } from 'victory';

const data = [
  { x: 'Apples', y: 10 },
  { x: 'Bananas', y: 15 },
  { x: 'Oranges', y: 5 },
  { x: 'Peaches', y: 20 },
  { x: 'Grapes', y: 12 },
];

const chartColors = ['#FF6347', '#FFD700', '#FF8C00', '#00FF7F', '#ADD8E6'];

const chartStyles = {
  data: {
    fill: ({ index }) => chartColors[index % chartColors.length],
  },
};

const legendData = data.map(({ x }) => ({ name: x }));

const CommonLegend = ({ colorScale }) => (
  <VictoryLegend
    x={50}
    y={0}
    orientation="horizontal"
    gutter={20}
    style={{ border: { stroke: 'black' } }}
    data={legendData}
    colorScale={colorScale}
  />
);

const VictoryBarAndPie = () => (
  <>
    <VictoryChart>
      <VictoryBar
        data={data}
        style={chartStyles}
      />
      <CommonLegend colorScale={chartColors} />
    </VictoryChart>
    <VictoryChart>
      <VictoryPie
        data={data}
        colorScale={chartColors}
        style={chartStyles}
      />
      <CommonLegend colorScale={chartColors} />
    </VictoryChart>
  </>
);

export default VictoryBarAndPie;
