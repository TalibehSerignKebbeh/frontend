import React from "react";

import "./chat.css";
import { monthNames } from "../../../other/format";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

const MonthlyMonthChart = ({ monthlyData }) => {
  
  return (
    <div className=" chat-container card-shadow text-start w-9/12 h-auto  bg-slate-100 mx-auto ">
      {/* <Line data={{...data}} options={{...options, backgroundColor:'#a6a9ab', font:{size:'50px',style:"inherit", weight:'600'}, indexAxis:'x'}}></Line> */}
      <VictoryChart  theme={VictoryTheme.material}
        colorScale={"warm"}
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={10}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          tickFormat={["January","February","March","April","May","June","July","August","September","October","November","December",
          ]}
          padding={20}
          crossAxis={true}
          tickLabelComponent={
            <VictoryLabel
              angle={70}
              dx={20}
              dy={-7}
              polar={true}
              renderInPortal={true}
              // datum={({value})=>value?.toString()}
            />
          }
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `D${x / 1000}k`}
        />
        <VictoryBar
          colorScale={"warm"}
          data={monthlyData}
          x="month"
          y="revenue"
          labels={({ datum }) =>
            `${monthNames[datum?.month]}: D${datum?.revenue} `
          }
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </div>
  );
};

export default MonthlyMonthChart;
