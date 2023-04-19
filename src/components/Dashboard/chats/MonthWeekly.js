import React from 'react';
import "./chat.css";
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
    fontSize: 3,
    fontWeight: 'bold',
    color: '#333',
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap' 

  }
};
const chartColors = ['#FF6347', '#FFD700', '#FF8C00', '#00FF7F', '#ADD8E6'];

const MonthWeekly = ({ data }) => {
  return (
    <div className='w-auto text-start h-auto  bg-slate-100 mx-auto'
      // style={{ width: '800px', height: '500px', margin: 'auto' }}
    >
      <VictoryChart theme={VictoryTheme?.material}
        width={140} height={140}
        style={{...chartStyle}} domainPadding={{ x: 200, y:100 }}>
        <VictoryAxis  style={{axis:{display:'none'},axisLabel:{display:'none'},ticks:{display:'none'}, tickLabels:{display:'none'}, display:'none'}}/>
        {/* <VictoryAxis   style={{datplay:'none'}}/> */}
      <VictoryPie
        data={data}
        x="week"
          y="revenue"
          // width={80} height={80}
        colorScale={data?.map((datum)=>GenColor(datum))}
        style={{labels: { fill: 'white', fontSize: 2, fontWeight: '400' } }}
        labelRadius={50}
        innerRadius={5}
        padAngle={2}
          animate={{ duration: 1000 }}
          labels={({ datum }) =>`week ${datum?.week} : D${formatChartNumber(datum?.revenue)}`
          }
        labelComponent={<VictoryTooltip activateData={true} style={{color:'black'}}/>}
      />
      <VictoryLegend
          // data={legendData}
          orientation='horizontal'
           data={data?.map((datum) => {
            return { name: `week ${datum?.week}: D${datum?.revenue}`, symbol:{fill: GenColor(datum)} };
          })}
        x={10} y={0} // middle of the chart
        style={{...legendStyle, title:{fontSize:2}, data:{backgroundColor:'red'}}}
        />
        </VictoryChart>
    </div>
  );
}

export default MonthWeekly;
