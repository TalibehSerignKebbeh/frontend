import  Money  from '@mui/icons-material/MoneyOffCsredOutlined';
import React from 'react'
import MoneyStatsCard from './card/MoneyStatsCard';

export default function MoneyStats({ data }) {
    const {moneyStats } = data
    const {profit, money } = moneyStats[0];
    
  return (
      <div className='w-full  flex flex-row flex-wrap
      items-baseline justify-start
      gap-6 gap-y-8 py-4 px-2
    '>
          <MoneyStatsCard amount={profit}
              icon={<Money />}
              title1={'profit'}
              title2={'Estimated Profit'}
          />
          <MoneyStatsCard amount={money}
              icon={<Money />}
              title1={'Money'}
              title2={'Estimated Amount Sold'}
        />
    </div>
  )
}
