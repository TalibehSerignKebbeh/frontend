import React from 'react';
// import image from './assets/images/minimarket.jpg'
import { ResponsiveBar } from '@nivo/bar'
const data = [
  {
    day: "Monday",
    degress: 59,
    celcius:80,
  },
  {
    day: "Tuesday",
    degress: 61,
    celcius:80,
  },
  {
    day: "Wednesday",
    degress: 55,
    celcius:80,
  },
  {
    day: "Thursday",
    degress: 78,
    celcius:80,
  },
  {
    day: "Friday",
    degress: 71,
    celcius:80,
  },
  {
    day: "Saturday",
    degress: 56,
    celcius:80,
  },
  {
    day: "Sunday",
    degress: 67,
    celcius:80,
  }
];
const Test = () => {
    return (
        <div className='w-full h-screen overflow-auto'>

        <ResponsiveBar
      data={data}
      keys={["degress"]}
      indexBy="day"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "band", }}
      colors="#3182CE"
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "degrees",
        legendPosition: "middle",
          legendOffset: -40,
        
            }}
            axisBottom={{
                legend: 'days',
                legendPosition: 'middle',
                legendOffset: 40,
            
            }}
            />
            <h3>Some text</h3>
            <h3>Some text</h3>
            <h3>Some text</h3>
            <h3>Some text</h3>
            <h3>Some text</h3>
         {/* <div className='kenburns-bottom-right' style={{backgroundImage: image}}>
             some text here
         </div> */}
        </div>
            
    );
}

export default Test;
