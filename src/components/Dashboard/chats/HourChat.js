import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    LineElement, LinearScale,
    CategoryScale, PointElement, Title, Tooltip, Legend
} from 'chart.js'
import './chat.css'

Chartjs.register(
    LineElement, LinearScale, 
    CategoryScale, PointElement,
    Title, Tooltip, Legend
)

const HourChat = ({hourlyData}) => {
 const labels = hourlyData?.map(d=>d?.hour)
    const salesData =hourlyData?.map(d=>d?.totalSalesInstances)
    const quantityData =hourlyData?.map(d=>d?.quantityProduct)
    const revenueData =hourlyData?.map(d=>d?.revenue)
    const data = {
        labels,
      datasets: [
        {
            label:"Sales Instances",
            data:salesData,
            backgroundColor:'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension:0.6,
        },
        {
            label:"Revenue ",
            data:revenueData,
            backgroundColor:'transparent',
            borderColor: '#216e9c',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension:0.6,
          },
         {
            label:"Products Quantity",
            data:quantityData,
            backgroundColor:'transparent',
            borderColor: '#4d4dff',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension:0.6,
        }
      ]
    }
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect:true,
        },
        stacked: false,
        title: {
            display: true,
            text:"Sample chart",
        },
        plugins:{
            legend: true,
        },
        scales: {
          x: {
              min: Math.min(hourlyData?.map(h=>h?.hour)),
                max: Math.max(hourlyData?.map(h=>h?.hour)),
                grid: {
                    display:false,
                }
            },
            y: {
                min: Math.min(hourlyData?.map(h=>h?.revenue)),
                max: Math.max(hourlyData?.map(h=>h?.revenue)),
                ticks: {
                    stepSize: 1,
                    callback: value=>value
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    }
    return (
        <div className=' chat-container card-shadow w-9/12 h-auto  bg-slate-100 mx-auto '>
            <Line data={{...data}} options={{...options, backgroundColor:'#a6a9ab', font:{size:'50px',style:"inherit", weight:'600'}, indexAxis:'x'}}></Line>
        </div>
    );
}

export default HourChat;
