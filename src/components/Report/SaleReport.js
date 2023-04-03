import React from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';

const SaleReport = () => {
    return (
        <div className='flex flex-col gap-2 '>
            {/* <h2>Hello from report page</h2> */}
            <AnnuanReport />

            <MonthlyReport />
        </div>
    );
}

export default SaleReport;
