import { ResponsivePie } from '@nivo/pie'
import React from 'react'

export default function PieChart({data, xKey, yKey}) {
  return (
     <ResponsivePie 
          data={[...data]}
          fit={true}
          
          // role=''
          id={xKey}
          value={yKey}
          margin={{ top: 10, right: 10, bottom: 80, left: 10 }}
        //   motionConfig={{bounce:2, velocity:1,}}
          animate={true}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
          arcLinkLabelsDiagonalLength={3}
          arcLinkLabelsStraightLength={12}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        //   fill={[
        
        //     {
        //         match: {
        //             id: 'ruby'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'c'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'go'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'python'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'scala'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'lisp'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'elixir'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'javascript'
        //         },
        //         id: 'lines'
        //     }
        // ]}
        legends={[
            {
            
                anchor: 'bottom',
                direction: 'row',
            justify: false,
            symbolSpacing:1,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 20,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#333',
                toggleSerie: true,
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
            symbolShape: 'square',
            
                padding:{bottom:-60 ,left:3, right:3,top:3},
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                        
                        },
                    
                    }
                ]
            }
        ]}
       
        />
  )
}
