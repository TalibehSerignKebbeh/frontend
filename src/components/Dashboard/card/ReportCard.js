import React from 'react';

const ReportCard = (props) => {
    const { title, value, icon } = props;
    return (
       <div
        className="card-shadow gap-x-16 rounded-sm max-w-xs p-2 px-4
           bg-white dark:bg-slate-600 flex flex-row 
                items-center justify-between place-content-center gap-1 "
              >
                <div className="">
                  <h3 className='text-slate-700 dark:text-white 
                  font-normal font-sans   text-lg'>
                  {title}
                  </h3>
                  <h1 className="text-slate-700 dark:text-white px-1 
                  font-normal font-sans  text-lg">
                  {value}
                  </h1>
                </div>
                {icon}
              </div>
    );
}

export default ReportCard;
