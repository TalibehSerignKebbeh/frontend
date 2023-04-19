import React from "react";
import GenColor from 'string-to-color'
import { colorScale } from ".";

import "./chat.css";
import {  formatChartNumber, months } from "../../../other/format";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

const chartStyle = {
  parent: {
    position: 'relative',
    paddingBottom: '30px', // 30px to accommodate the legend
  }
};

const legendStyle = {
  parent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '10px 0'
  },
  labels: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap' 

  }
};

const MonthlyMonthChart = ({ monthlyData }) => {
  return (
    <div className="w-auto text-start h-auto  bg-slate-100 mx-auto ">
      {/* <Line data={{...data}} options={{...options, backgroundColor:'#a6a9ab', font:{size:'50px',style:"inherit", weight:'600'}, indexAxis:'x'}}></Line> */}
      <VictoryChart  theme={VictoryTheme.material}
        domainPadding={{x:250, y:30}}
        height={500} width={650}
      style={{...chartStyle}}        
      >
        <VictoryAxis  colorScale={monthlyData?.map((datum)=>GenColor(datum))}
             tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          tickFormat={[...months]}
          padding={20}

          // crossAxis={true}
          tickLabelComponent={
            <VictoryLabel
              angle={50}
              dx={20}
              dy={-7}
            style={{padding:'0 0 13px 0'}}
              // datum={({value})=>value?.toString()}
            />
          }
        />
        <VictoryAxis 
          dependentAxis height={450}
          tickFormat={(x) => `D${x / 1000}k`}
        />
        <VictoryBar  colorScale={colorScale}
          barWidth={20} 
          barRatio={0.4}
          data={monthlyData}
          x="month"
          y="revenue"
          animate={{ duration: 1000 }}
          labels={({ datum }) =>
            // `D${datum?.revenue} `
            formatChartNumber(datum?.revenue)
          }
        labelComponent={<VictoryTooltip />}
          // labelComponent={<VictoryLabel style={{color:'#660000', fontSize:15}}
          //   angle={-70} dy={8} dx={({ datum }) => {
          //     const revenueLength = datum?.revenue?.toString()?.length;
          //     return revenueLength + 30
          //   }} 
          //   />}
        />
        <VictoryLegend  colorScale={colorScale}
           x={0}
          y={0}
          style={{...legendStyle}}
          gutter={20}
          orientation="horizontal" 
         data={monthlyData?.map((datum) => {
            return { name: `${months[datum?.month]}: D${datum?.revenue}`, symbol:{fill: GenColor(datum)} };
          })}
        />
      </VictoryChart>
    </div>
  );
};

export default MonthlyMonthChart;
