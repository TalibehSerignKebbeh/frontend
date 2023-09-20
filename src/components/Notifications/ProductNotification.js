// import  Table  from '@mui/material/Table';
import  format  from "date-fns/format";
import parseISO from "date-fns/parseISO";
import React, { useEffect, useRef, } from 'react';
import './notification.css'
import { FixedSizeList } from "react-window";
import { queryInstance } from '../../api';
import useAuth from "../../hooks/useAuth";


const ProductNotification = ({ dataArray, socket, open, setopen }) => {
  
  const ref = useRef(null)
  const {token} = useAuth()

 
   const handleClickAuthNotification = async() => {
    const ids = dataArray?.map(notify => { return notify?._id })
    // socket.emit("read_all_auth_notification", { ids });
     await queryInstance.patch(`notifications`, { ids },
          { headers: { Authorization: `Bearer ${token}` } }
     )
      .then((res) => {
        if (res?.status === 200) {
          socket.emit("read_all_product_notification", {});
        }

      // console.log(res);
      }).catch((err) => {
      // console.log(err);
    })
  };
 
   useEffect(() => {
     window.addEventListener('mousedown', e => {
      if (!open) { return };
            const refRect = ref?.current?.getBoundingClientRect();
            if (e.clientX < refRect?.left || e.clientX > refRect?.right
                || e.clientY < refRect?.top || e.clientY > refRect?.bottom
            ) {
                if (open === true) {
                    setTimeout(() => {
                        
                        setopen(false)
                    }, 20);
                    return;
                }
            }
    })
   }, [open, setopen]);
  

  if (!dataArray?.length)
    return null

  const Row = ({ index, style }) => {
    const val = dataArray[index];
    const date = val?.created_at?.length ? format(parseISO(val?.created_at), " EEE MMM do yyyy, HH:mm b") : ''
    const fullName = val?.userId?.firstName + " " + val?.userId?.lastName;
    return (
      <div
        style={{
        ...style, 
          width: '100%', padding: '2px',paddingBlock:'10px',
          top: style?.top,
          left: style?.left,
          display: "block",
          marginBottom:'10px'
        }}
        className='bg-white dark:bg-gray-700 
             shadow shadow-white dark:shadow-slate-800
              block py-2 px-[3px]
      border border-slate-600 dark:border-slate-300'>
         <small className="absolute right-2
          bg-blue-600 text-white px-2 rounded-full text-xl  ">
            {index + 1}
          </small>
        <p className="text-gray-700 dark:text-slate-100
         block font-normal capitalize">{val?.message}
         </p>
         <p className="text-gray-700 dark:text-gray-50 
                       font-light text-lg capitalize"
          >
            Name: <small className=" text-xl font-normal
                        text-gray-700 dark:text-gray-50 ">
              {fullName}
            </small>
          </p>
        <small className="text-gray-700 dark:text-slate-100
          block text-xs font-semibold">
          {date}
        </small>
      </div>
    );
  };

    return (
      <div ref={ref}
        className='notification-wrapper
        bg-slate-100 dark:bg-slate-800
        overflow-y-auto flex flex-col '
        style={{
        visibility: open ? "visible" : "hidden",
        position: 'absolute',  right: 0, left: 'auto',
      }}
    >
      <button 
        className='mx-auto p-2 px-2 py-1 mt-2 rounded  
            bg-green-700 hover:bg-green-600
            text-white hover:text-white 
            self-center justify-self-center '
        onClick={handleClickAuthNotification}
      >
            Mark all as read
          </button>
              
          <FixedSizeList
            height={900}
            itemCount={dataArray?.length}
            itemSize={120}
                width={"100%"}
                style={{
                   marginTop: '40px',
          marginBlock: '10px',
          paddingBottom: '10px',
          display: 'flex', flexDirection: 'column',
          borderTop: '2px solid yellow',
          height:'100%'
                  }}
          >
            {Row}
                  </FixedSizeList>
           
        </div>
    );
}

export default ProductNotification;
