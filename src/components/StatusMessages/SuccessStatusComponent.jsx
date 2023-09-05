import React from 'react';
import successIcon from '../../assets/images/success_icon2.png'


const SuccessStatusComponent = ({successMessage, handleReset}) => {
    return (
        <div className='text-center mx-auto w-fit 
            grid grid-cols-3 
            auto-rows-auto items-start
                    bg-slate-100  rounded relative
                    place-items-baseline'>
             <button className='py-[1px] pb-[3px] px-[10px] 
            bg-green-600 text-white rounded-[1px] shadow shadow-green-800
               row-start-1 row-end-2 col-start-2 col-end-4
               self-start justify-self-end
               '
            onClick={handleReset} type='reset'>
                reset
            </button>
            
            <img src={successIcon}
                alt='icon' width={100} height={100}
                className='mx-auto rounded-[5px]  row-start-2
                row-end-3 self-start justify-self-center
                col-start-1 col-end-4 my-4'
                />
            <p className='text-2xl text-green-400 mt-2 mx-auto col-span-3
            px-2'>
                {successMessage}
            </p>

            
           
                    </div>
    );
}

export default SuccessStatusComponent;
