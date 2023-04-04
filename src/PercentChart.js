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


import React from 'react';
import { VictoryPie, VictoryBar, VictoryLegend } from 'victory';

const data1 = [
  { x: 'A', y: 25 },
  { x: 'B', y: 15 },
  { x: 'C', y: 45 },
  { x: 'D', y: 10 },
  { x: 'E', y: 5 },
];

const data2 = [
  { x: 'A', y: 100 },
  { x: 'B', y: 75 },
  { x: 'C', y: 150 },
  { x: 'D', y: 25 },
  { x: 'E', y: 50 },
];

const colors = ['#FF00A9', '#00FFE1', '#F44336', '#E91E63', '#9C27B0'];

const legendData = [
  { name: 'Data 1', symbol: { fill: colors[0] } },
  { name: 'Data 2', symbol: { fill: colors[1] } },
];

const VictoryCharts = () => (
  <>
    <VictoryPie data={data1} colorScale={colors} />
    <VictoryBar data={data2} style={{ data: { fill: colors[1] } }} />
    <VictoryLegend data={legendData} />
  </>
);

export default VictoryCharts;
