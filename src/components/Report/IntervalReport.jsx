import React, { useState } from 'react'
import { DatePicker, } from 'antd'

const {RangePicker} = DatePicker

export default function IntervalReport() {
    // const [selectedRange, setselectedRange] = useState([]);

    const handleChange = (value) => {
        
    }
  return (
    <div>
          <RangePicker 
            //   disabledDate={()=>}
              onChange={ handleChange}
             
          />
    </div>
  )
}
