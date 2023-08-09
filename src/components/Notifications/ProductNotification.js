// import  Table  from '@mui/material/Table';
import  format  from "date-fns/format";
import parseISO from "date-fns/parseISO";
import React, { useEffect, useRef, useState } from 'react';
import './notification.css'
import { FixedSizeList } from "react-window";
import { queryInstance } from '../../api';
import useAuth from "../../hooks/useAuth";


const ProductNotification = ({ dataArray, socket, open, setopen }) => {
  
  const ref = useRef(null)
  const {token} = useAuth()
  console.log(dataArray); 
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
 
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
        ...style, display: 'block', flexDirection: 'column', rowGap: '-20px',
        height: 'auto', width: '100%', padding: '2px 5px',
          textAlign: 'center', justifyContent: 'center',
        }}
        className='bg-white dark:bg-slate-600 shadow-md 
        shadow-slate-100 dark:shadow-slate-400
      '>
        <small className="text-gray-700 dark:text-slate-100
         block font-normal capitalize">{val?.message}</small>
        <small className="text-gray-700 dark:text-slate-100
         font-light text-xs capitalize">User:
          <small className="text-lg font-normal">{fullName} </small></small>
        <small className="text-gray-700 dark:text-slate-100
          block text-xs font-normal">{date}</small>
      </div>
    );
  };
   useEffect(() => {
        window.addEventListener('mousedown', (e) => {
          if (ref?.current && !ref.current?.contains(e.target)) {
              setopen(false)
            }
        })
      
  }, [ref, setopen]);
    return (
      <div ref={ref}
        className='notification-wrapper bg-slate-200 dark:bg-slate-700
        text-center'
          style={{
            visibility: open ? "visible" : "hidden",
            position: 'absolute',
             right:0, left:'auto',
        }}
        onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      >
        <button  className='mx-auto p-2 px-8 mt-2 rounded  
            bg-green-700 hover:bg-green-600
            text-white hover:text-white  '
                onClick={handleClickAuthNotification}>
            Read All
          </button>
              
          <FixedSizeList
            height={250}
            itemCount={dataArray?.length}
            itemSize={65}
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
