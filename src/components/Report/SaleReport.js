import React from 'react';
import AnnuanReport from './AnnuanReport';
import MonthlyReport from './MonthlyReport';

const SaleReport = () => {
    return (
        <div className='w-full flex flex-col gap-3 '>
            {/* <h2>Hello from report page</h2> */}
            <AnnuanReport />

            <MonthlyReport />
        </div>
    );
}

export default SaleReport;
