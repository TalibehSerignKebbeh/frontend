// import React from 'react'
// import { VictoryAnimation, VictoryLabel, VictoryPie } from "victory";

//   class PercentChart extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         percent: 25, data: this.getData(0)
//       };
//     }

//     componentDidMount() {
//       let percent = 25;
//       this.setStateInterval = window.setInterval(() => {
//         percent += (Math.random() * 25);
//         percent = (percent > 100) ? 0 : percent;
//         this.setState({
//           percent, data: this.getData(percent)
//         });
//       }, 2000);
//     }

//     componentWillUnmount() {
//       window.clearInterval(this.setStateInterval);
//     }

//     getData(percent) {
//       return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
//     }

//     render() {
//       return (
//         <div>
//           <svg viewBox="0 0 400 400" width="100%" height="100%">
//             <VictoryPie
//               standalone={false}
//               animate={{ duration: 1000 }}
//               width={400} height={400}
//               data={this.state.data}
//               innerRadius={120}
//               cornerRadius={2}
//               labels={() => null}
//               style={{
//                 data: { fill: ({ datum }) => {
//                   const color = datum.y > 30 ? "green" : "red";
//                   return datum.x === 1 ? color : "transparent";
//                 }
//                 }
//               }}
//             />
//             <VictoryAnimation duration={1000} data={this.state}>
//               {(newProps) => {
//                 return (
//                   <VictoryLabel
//                     textAnchor="middle" verticalAnchor="middle"
//                     x={200} y={200}
//                     text={`${Math.round(newProps.percent)}%`}
//                     style={{ fontSize: 45 }}
//                   />
//                 );
//               }}
//             </VictoryAnimation>
//           </svg>
//         </div>
//       );
//     }
//   }

//   export default PercentChart


// import React from 'react';
// import { VictoryPie, VictoryBar, VictoryLegend } from 'victory';

// const data1 = [
//   { x: 'A', y: 25 },
//   { x: 'B', y: 15 },
//   { x: 'C', y: 45 },
//   { x: 'D', y: 10 },
//   { x: 'E', y: 5 },
// ];

// const data2 = [
//   { x: 'A', y: 100 },
//   { x: 'B', y: 75 },
//   { x: 'C', y: 150 },
//   { x: 'D', y: 25 },
//   { x: 'E', y: 50 },
// ];

// const colors = ['#FF00A9', '#00FFE1', '#F44336', '#E91E63', '#9C27B0'];

// const legendData = [
//   { name: 'Data 1', symbol: { fill: colors[0] } },
//   { name: 'Data 2', symbol: { fill: colors[1] } },
// ];

// const VictoryCharts = () => (
//   <>
//     <VictoryPie data={data1} colorScale={colors} />
//     <VictoryBar data={data2} style={{ data: { fill: colors[1] } }} />
//     <VictoryLegend data={legendData} />
//   </>
// );

// export default VictoryCharts;


// import React from 'react';
// import { VictoryChart, VictoryBar, VictoryPie, VictoryLegend } from 'victory';

// const data = [
//   { x: 'Apples', y: 10 },
//   { x: 'Bananas', y: 15 },
//   { x: 'Oranges', y: 5 },
//   { x: 'Peaches', y: 20 },
//   { x: 'Grapes', y: 12 },
// ];

// const chartColors = ['#FF6347', '#FFD700', '#FF8C00', '#00FF7F', '#ADD8E6'];

// const chartStyles = {
//   data: {
//     fill: ({ index }) => chartColors[index % chartColors.length],
//   },
// };

// const legendData = data.map(({ x }) => ({ name: x }));

// const CommonLegend = ({ colorScale }) => (
//   <VictoryLegend
//     x={50}
//     y={0}
//     orientation="horizontal"
//     gutter={20}
//     style={{ border: { stroke: 'black' } }}
//     data={legendData}
//     colorScale={colorScale}
//   />
// );

// const VictoryBarAndPie = () => (
//   <>
//     <VictoryChart>
//       <VictoryBar
//         data={data}
//         style={chartStyles}
//       />
//       <CommonLegend colorScale={chartColors} />
//     </VictoryChart>
//     <VictoryChart>
//       <VictoryPie
//         data={data}
//         colorScale={chartColors}
//         style={chartStyles}
//       />
//       <CommonLegend colorScale={chartColors} />
//     </VictoryChart>
//   </>
// );

// export default VictoryBarAndPie;



import React from 'react';
import { VictoryBar, VictoryPie, VictoryChart, VictoryLegend, VictoryAxis } from 'victory';

const data = [
  { x: "Apples", y: 10 },
  { x: "Bananas", y: 5 },
  { x: "Cherries", y: 20 },
  { x: "Dates", y: 15 },
  { x: "Elderberries", y: 3 },
];

const colorScale = ["#FFC857", "#E9724C", "#C5283D", "#14213D", "#2E2E2E"];

const legendData = data.map(({ x }) => ({ name: x }));

const BarChart = ({barData,x,y }) => (
  <VictoryChart>
    <VictoryBar data={barData} x={x} y={y} style={{ data: { fill: "#FFC857" } }} />
  </VictoryChart>
);

const PieChart = ({pieData,x,y}) => (
  <VictoryChart>
    <VictoryPie data={pieData} x={x} y={y} colorScale={colorScale} />
    <VictoryAxis style={{axis:{display:'none'},tickLabels:{display:'none'}, axisLabel: {display:'none'}}} />
  </VictoryChart>
);

const ChartWithLegend = ({barData, pieData, x,y}) => (
  <div style={{ display: "flex" }}>
    <div style={{ width: "50%" }}>
      <BarChart barData={barData} x={x} y={y}/>
    </div>
    <div style={{ width: "50%" }}>
      <PieChart pieData={pieData } x={x} y={y} />
    </div>
    <div style={{ width: "100%" }}>
      <VictoryLegend
        data={legendData}
        orientation="horizontal"
        gutter={20}
        style={{ border: { stroke: "#f6f6f6" } }}
        colorScale={colorScale}
      />
    </div>
  </div>
);

export default ChartWithLegend;


