// import { DatePicker, Space } from 'antd';
// const { RangePicker } = DatePicker;
// const onChange = (value, dateString) => {
//   console.log('Selected Time: ', value);
//   console.log('Formatted Selected Time: ', dateString);
// };
// const onOk = (value) => {
//   console.log('onOk: ', value);
// };
// const DatePickersComp = () => (
//   <Space direction="vertical" size={12}>
//     {/* <DatePicker showTime onChange={onChange} onOk={onOk} /> */}
//         <RangePicker
            
//       showTime={{
//         format: 'HH:mm',
//             }}
        
//       format="YYYY-MM-DD HH:mm"
//       onChange={onChange}
//       onOk={onOk}
//     />
//   </Space>
// );
// export default DatePickersComp;

import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const DatePickersComp = () => (
  <Space direction="vertical" size={12}>
    <DatePicker bordered={false} />
    <DatePicker picker="week" bordered={false} />
    <DatePicker picker="month" bordered={false} />
    <DatePicker picker="year" bordered={false} />
    <RangePicker bordered={false} />
    <RangePicker picker="week" bordered={false} />
    <RangePicker picker="month" bordered={false} />
    <RangePicker picker="year" bordered={false} />
  </Space>
);
export default DatePickersComp;