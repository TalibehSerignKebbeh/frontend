import React, { useEffect, useRef } from 'react';
import { FixedSizeList } from "react-window";
import  format  from "date-fns/format";
import parseISO from "date-fns/parseISO";
import './notification.css'
import { queryInstance } from '../../api';
// import { DataGrid } from '@mui/x-data-grid';

const SaleNotificationPanel = ({ dataArray, socket, open, setopen }) => {
  const ref = useRef(null)
  // console.log(dataArray);

  const handleReadSaleNotification = async () => {
       const ids =dataArray?.map(notify=>{return notify?._id})
    // socket.emit("read_all_sale_notification", {ids});
    
    await queryInstance.patch(`notifications`, { ids })
      .then((res) => {
   if (res?.status === 200) {
    socket.emit("read_all_sale_notification", {});
        }

      // console.log(res);
      }).catch((err) => {
      // console.log(err);
    })
    
    }

    useEffect(() => {
        window.addEventListener('mousedown', (e) => {
          if (ref?.current && !ref.current?.contains(e.target)) {
              setopen(false)
            }
        })
      
    }, [ref, setopen]);
  
  const Row = ({ index, style }) => {
    const val = dataArray[index];
    const date = val?.created_at?.length ? format(parseISO(val?.created_at), " EEE MMM do yyyy, HH:mm b") : ''
    const fullName = val?.userId?.firstName + " " + val?.userId?.lastName;
    return (
      <div
        style={{
        ...style,display: 'block', flexDirection: 'column', rowGap: '-20px',
        height: 'auto', width: '100%', padding: '2px 5px',
          textAlign: 'center', justifyContent: 'center',
        }}>
        <div className='bg-slate-200 dark:bg-gray-600 
             shadow-md shadow-slate-100 dark:shadow-slate-400'>

        <h3 className="text-gray-700 dark:text-gray-50 
        block font-normal capitalize">
          {val?.message}</h3>
        <span className='text-gray-700 dark:text-gray-50 
        block font-normal capitalize'>
          sold by {fullName}
        </span>
        <small className="text-gray-700 dark:text-gray-50 
        block  capitaliz font-serif font-light">
          {date}
          </small>
        </div>
          
      </div>
    );
  };


    return (
      <div ref={ref} className='notification-wrapper
        bg-slate-400 dark:bg-slate-800 text-center'
        style={{
        visibility: open ? "visible" : "hidden",
        position: 'fixed',left:'auto',
             top: 0, right:0,
        }}
        
      >
        
          <button
          className='mx-auto p-2 px-8 mt-2 rounded  
            bg-green-700 hover:bg-green-600
            text-white hover:text-white  '
          onClick={handleReadSaleNotification}>
                      Mark all as read
        </button>
         <FixedSizeList
             height={250}
            itemCount={dataArray?.length}
            itemSize={65}
                width={"100%"}
                style={{
                  marginTop:'60px', 
                  marginBlock: '10px',
                  minHeight: '230px',
                  maxHeight:'400px',
            height: 'auto'
          }}
          className=''

          >
            {Row}
                  </FixedSizeList>
        </div>
    );
}

export default SaleNotificationPanel;
