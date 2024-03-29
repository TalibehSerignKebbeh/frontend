import React from 'react';
import {formatNumber} from '../../../other/format'
import './index.css'

const SalesCard = ({ stats, text, }) => {
   
    return (
        <>
<div className="card">
  <div className="card-body">
    <h5 className="card-title">{text} Report</h5>
            <p className="card-text">#Sales: <span className="sales-num">
              {stats?.length? stats[stats?.length - 1]?.totalSalesInstances || 0 : 0}
            </span></p>
            <p className="card-text">#Products: <span className="sales-num">
              {stats?.length? stats[stats?.length - 1]?.quantityProduct || 0 : 0}
            </span></p>
            <p className="card-text">Revenue : D <span className="sales-num">
              {stats?.length? stats[stats?.length-1]?.revenue? formatNumber(stats[stats?.length - 1]?.revenue) : 0 : 0}
            </span></p>
  </div>
</div>

   
        </>
    );
}
     // <Box sx={{
        //     p: "10px 20px", bgcolor: 'white', borderRadius: '3px',
        //     display:'flex', alignContent:'center',alignItems:'flex-start', flexDirection:'column',
        // boxShadow:
        //         "2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)",}} >
        //     <h4 className='text-lg font-semibold'>{text}</h4>
        //     <small className='text-lg '>{"#sales "+  stats[stats?.length-1]?.totalSalesInstances}</small>
        //     <small className='text-lg '>{"#products "+ stats[stats?.length-1]?.quantityProduct}</small>
        //     <small className='text-lg self-end'>{"D"+ stats[stats?.length-1]?.revenue}</small>
        // </Box>
export default SalesCard;
