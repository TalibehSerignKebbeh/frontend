import React from 'react';
import { VictoryPie, VictoryLegend, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';
import GenColor from 'string-to-color'
import { formatChartNumber, months } from '../../../other/format';


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
  flexWrap: 'wrap',
  justifyContent: 'center',
    alignItems: 'center',
  gap:'10px',
    backgroundColor: '#fff',
    padding: '10px 0'
  },
  flexWrap: 'wrap',
  justifyContent: 'center',
    alignItems: 'center',
  gap:'3px',
  labels: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333'
  }
};

const PieChart = ({ monthData }) => {
  console.log(monthData);
  return (
    <div style={{ width: '800px', height: '500px',  }}>
      <VictoryChart theme={VictoryTheme?.material}
        style={chartStyle} domainPadding={{ x: 200 }}>
        <VictoryAxis  style={{axis:{display:'none'},axisLabel:{display:'none'},ticks:{display:'none'}, tickLabels:{display:'none'}, datplay:'none'}}/>
        {/* <VictoryAxis   style={{datplay:'none'}}/> */}
      <VictoryPie
        data={monthData}
        x="name"
          y="revenue"
        colorScale={monthData?.map((datum)=>GenColor(datum))}
        style={{ labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' } }}
        labelRadius={80}
        innerRadius={60}
        padAngle={2}
          animate={{ duration: 1000 }}
          labels={({ datum }) =>`${months[datum?.month]}: ${formatChartNumber(datum?.revenue)}`
          }
        labelComponent={<VictoryTooltip  style={{color:'black'}}/>}
      />
      <VictoryLegend
          // data={legendData}
          orientation='horizontal'
           data={monthData?.map((datum) => {
            return { name: `${months[datum?.month]}: D${datum?.revenue}`, symbol:{fill: GenColor(datum)} };
          })}
        x={10} y={0} // middle of the chart
        style={legendStyle}
        />
        </VictoryChart>
    </div>
  );
};

export default PieChart;

