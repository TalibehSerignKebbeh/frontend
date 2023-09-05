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
          minHeight:'200px',
          height:'max-content'
        }}
        className='bg-white dark:bg-gray-700 
             shadow shadow-white dark:shadow-slate-800
              block py-2 px-[3px]
      '>
         <small className="absolute right-2
          bg-blue-600 text-white px-2 rounded-full text-xl  ">
            {index + 1}
          </small>
        <p className="text-gray-700 dark:text-slate-100
         block font-normal capitalize">{val?.message}
         </p>
        <small className="text-gray-700 dark:text-slate-100
         font-light text-xs capitalize">User:
          <small className="text-lg font-normal">{fullName} </small></small>
        <small className="text-gray-700 dark:text-slate-100
          block text-xs font-normal">{date}</small>
      </div>
    );
  };
   useEffect(() => {
       if (open) {
      
    window.addEventListener('mousedown', (e) => {
      // console.log(ref?.current?.contains(e.target));
      const isChild = ref?.current?.contains(e.target)
      // console.log(`is child of modal `, isChild);
      if (ref?.current && !isChild) {
        // console.log(isChild);
        setopen(false)
      } else {
        setopen(true)
      }
    })
    }
      
   }, [open, setopen]);
  
  if (!dataArray?.length)
    return null
    return (
      <div ref={ref}
        className='notification-wrapper bg-slate-200 dark:bg-slate-700
        text-center'
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
            height={250}
            itemCount={dataArray?.length}
            itemSize={110}
                width={"100%"}
                style={{
                  marginTop:'60px', 
                  marginBlock: '10px',
                  }}
          >
            {Row}
                  </FixedSizeList>
           
        </div>
    );
}

export default ProductNotification;
