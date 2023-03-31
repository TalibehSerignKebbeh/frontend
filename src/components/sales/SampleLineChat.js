import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    LineElement, LinearScale,
    CategoryScale, PointElement, Title, Tooltip, Legend
} from 'chart.js'

Chartjs.register(
    LineElement, LinearScale, 
    CategoryScale, PointElement,
    Title, Tooltip, Legend
)
const SampleLineChat = () => {
    const labels = ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18",];
    const values =[8, 7, 8, 6, 8, 7, 5, 6,9]
    const values2 =[5, 7, 3, 7, 9, 10, 6, 7,10]
    const data = {
        labels,
        datasets: [{
            label:"Last seven days infor",
            data:values,
            backgroundColor:'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension:0.6,
        },
        {
            label:"infor 2",
            data:values2,
            backgroundColor:'transparent',
            borderColor: '#216e9c',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension:0.6,
        }]
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
                grid: {
                    display:false,
                }
            },
            y: {
                min: 2,
                max: 10,
                ticks: {
                    stepSize: 2,
                    callback: value=>value+'K'
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    }
    return (
        <div className='w-9/12 h-auto bg-slate-100 mx-auto '>
            <Line data={{...data}} options={{...options,backgroundColor:'#a6a9ab', font:{size:'20px',style:"inherit", weight:'600'}, indexAxis:'x'}}></Line>
        </div>
    );
}

export default SampleLineChat;
