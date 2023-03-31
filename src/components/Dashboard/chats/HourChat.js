import React from 'react';
import  {VictoryChart, VictoryLine, VictoryScatter, } from 'victory'

const HourChat = ({ data }) => {
  

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];

    const ScatterPoint = ({ x, y, datum, min, max }) => {
  const i = React.useMemo(() => {
    return Math.floor(((datum.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);

//   return <StyledPoint color={colors[i]} cx={x} cy={y} r={6} />;
    };
      const temperatures = data.map(({ y }) => y);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

    return (
        <div>
            <VictoryChart>
      <VictoryLine data={data} />
      <VictoryScatter
        data={data}
        dataComponent={<ScatterPoint min={min} max={max} />}
      />
    </VictoryChart>
        </div>
    );
}

export default HourChat;
