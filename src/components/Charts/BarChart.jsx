import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

export default function BarChart({ data, keys,
    index, bottomLegend,
  leftLegend }) {
  const formatYAxisValue = (value) => {
    // Format the y-axis value here (example: convert to millions)
    return (value / 1000).toFixed(0) + 'K';
  };

  return (
     <ResponsiveBar
      theme={{
        background:'#989898',
        textColor: '#fff', 
        fontSize: '.9rem',
        labels: { text: { color: '#fff', fontSize: '1.1rem' } },
        markers:{textColor:'#333', fontSize:'.6rem', }
      }}
    
          data={data}
      keys={[...keys]}
      groupMode='grouped'
                indexBy={index}
      margin={{ top: 50, right: 20, bottom: 100, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear", nice:true, }}
      indexScale={{type:'band', round:true}}
      colors={{ scheme: 'nivo',size:6}}
      
      animate={true}
      axisTop={null}
      axisRight={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      role='application'
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: leftLegend,
        legendPosition: "middle",
        legendOffset: -50,
        format: formatYAxisValue,
        
            }}
            axisBottom={{
                legend: bottomLegend,
                legendPosition: 'middle',
                legendOffset: 70,
                tickRotation: 45,
            
          }}
          legends={[
            {
              
                anchor: 'top',
                direction: 'row',
              justify: false,
              
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 70,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                  symbolShape: 'circle',
                  dataFrom: 'keys',
                //  data: 
                // dataFrom:{'keys'},
              itemBackground: '#fff',
                padding:{top:-100, right:0, left:0, bottom:0},
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        />
  )
}
