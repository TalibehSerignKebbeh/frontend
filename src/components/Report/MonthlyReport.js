import React, { useState, useEffect } from 'react';
import { queryInstance } from '../../api';
import ReportForm from './ReportForm';
import MonthWeekly from '../Dashboard/chats/MonthWeekly';
import { CircularProgress } from '@mui/material';
import { DatePicker } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, LabelList, Cell } from 'recharts';

const CustomTooltip = (props) => {
  const { active, payload, label } = props;
  console.log(props);
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p>{`Date: ${label}`}</p>
        {payload?.map((data, index) => (
          <p key={index} style={{ color: data.color }}>
            {`${data.week}: ${data.percent}`}
          </p>
        ))}
      </div>
    );
  }
  return null
}


const MonthlyReport = () => {
  const [date, setdate] = useState('');
  const [monthDate, setmonthDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  const [isLoading, setisLoading] = useState(false);
  const [loadSuccess, setloadSuccess] = useState(false);
  const [weekData, setweekData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FFA15C', '#666666'];

  useEffect(() => {
    const handleSubmit = async () => {
      // e.preventDefault()
      setloadSuccess(false)
      setisLoading(false)
      setweekData([])
      await queryInstance
        .get(`/sales/stats/month?year=${monthDate?.year}&month=${monthDate?.month}`)
        .then((res) => {
          console.log(res);
          if (res?.status === 200) {
            setloadSuccess(true)
            setweekData(res?.data?.weeklySales)
          }
        })
        .catch((err) => {
          setloadSuccess(false)
          console.log(err);
        })
        .finally(() => {
          setisLoading(false);
        });
    }
    handleSubmit()
    return () => {

    };
  }, [monthDate?.month, monthDate?.year]);


  const getUniqueColor = (index) => COLORS[index % COLORS.length];



  return (
    <div className='w-full bg-gray-50 p-2'>
      <h2 className="py-3 text-lg font-sans italic ">Monthly Report Section</h2>

      <DatePicker picker="month" allowClear
        
        onChange={(val) => {
          setmonthDate({ year: val?.$y, month: val?.$M })
        }}
      />
      {
        isLoading ? <CircularProgress sx={{ margin: 'auto' }} /> :
          loadSuccess ? <div>

            {weekData?.length ?
              <div className='flex flex-wrap w-full py-3 md:gap-x-3 gap-x-1 gap-y-2 items-start justify-start'>
                <div>
                <BarChart width={600} height={400} data={weekData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <LabelList />
              
                  <Bar dataKey="money" fill="#8884d8" barSize={30} spacing={3}/>
                  </BarChart>
                </div>
                <div>
                <PieChart width={200} height={200} data={weekData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <Pie data={weekData} dataKey="percent" nameKey="week" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" >
                    {weekData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getUniqueColor(index)} />
                    ))}
                  </Pie>
                  <Tooltip  />
                  <LabelList />
                  </PieChart>
                  </div>
              </div>
              : null}
          </div> : null
      }
    </div>
  );
}

export default MonthlyReport;
