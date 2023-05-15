import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList } from "react-window";
import  format  from "date-fns/format";
import parseISO from "date-fns/parseISO";
import './notification.css'
import { queryInstance } from '../../api';
// import { DataGrid } from '@mui/x-data-grid';

const SaleNotificationPanel = ({ dataArray, socket, open, setopen }) => {
  const ref = useRef(null)
  // console.log(dataArray);
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
  const handleReadSaleNotification = async () => {
       const ids =dataArray?.map(notify=>{return notify?._id})
    // socket.emit("read_all_sale_notification", {ids});
    queryInstance.patch(`notifications`, { ids })
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
        ...style, display: 'flex', flexDirection: 'column', rowGap: '0px',
        backgroundColor: 'white',boxShadow:'2px 2px 4px 0px rgba(0,0,0,0.5)',
          height: 'auto', width: '100%', padding: '0px 5px',
        borderTop:'1px solid #333',borderBottom:'1px solid #333',
      textAlign:'center', justifyContent:'center', marginBottom:'20px'}}>
        <h3 className="font-normal text-lg font-serif">
          {val?.message}</h3>
        <span className='text-sm -mt-2 font-serif font-light'>
          sold by {fullName}
        </span>
        <small className="text-xs font-serif font-light">
          {date}
        </small>
      </div>
    );
  };


    return (
        <div ref={ref} className='notification-wrapper'
        style={{
        visibility: open ? "visible" : "hidden",
        position: 'fixed',left:'auto',
             top: position.y, right:0,
        }}
        onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      >
        
          {/* <DataGrid 
            sx={{height:'300px'}}
            rows={dataArray}
            columns={[
              { field: 'message', headerName: '#msg', width: '160', cellClassName: 'text_cell' },
              { field: 'type', headerName:'type',  },
              {
                field: 'quantity', type: 'Number', headerName: '#Qty',
                valueGetter: ({row }) => row?.data?.quantity
              },
              { field: 'data', headerName: '#Price', valueGetter: ({ value }) => value?.quantity * value?.price },
              {
                field: 'userId', headerName: 'User',
                cellClassName:'text_cell',width:170,
                valueGetter: ({ value }) => value?.firstName + ' ' + value?.lastName
              },
              
            ]}
            getRowId={(row) => row?._id}
            hideFooter hideFooterSelectedRowCount
            hideFooterPagination
            /> */}
            <Button sx={{fontSize:'.7rem'}} onClick={handleReadSaleNotification}>
                      Mark all as read
        </Button>
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
                height:'auto'}}

          >
            {Row}
                  </FixedSizeList>
        </div>
    );
}

export default SaleNotificationPanel;
