import React from 'react';
import "./chat.css";
import {
    VictoryLabel,
    VictoryLegend,
    VictoryPie,
    VictoryTooltip,
} from "victory";

const MonthWeekly = ({ data }) => {
    return (
        <div className='small-chart-wrapper'>

            <VictoryPie data={data}
                x={'week'}
                y={'revenue'}
                height={140}
                width={140}
                innerRadius={2}
                cornerRadius={2}
                style={{labels:{fontSize:3}}}
                labels={({ datum }) => `week ${datum?.week}: D${datum?.revenue}`}
                labelComponent={<VictoryTooltip />}
            />

            <VictoryLegend   title={"Week Money"}
          x={20}
          y={0}  
            titleOrientation='top'
            //  gutter={10}
          // padding={30}
          domainPadding={10}
          horizontal={false}
          orientation='horizontal'
          // sortKey={({datum})=>datum?.month}
            style={{ data: { marginLeft: 5, marginRight: 15, overflowWrap:'break-word' },parent:{width:'auto', minWidth:100, maxWidth:'100%', }, title:{color:'#319753', fontSize: 18}}}
          data={data?.map((datum) => {
            return { name: `${datum?.week}: D${datum?.revenue}`, };
          })}
          />


        </div>
    );
}

export default MonthWeekly;
