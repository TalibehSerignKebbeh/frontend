// import  Table  from '@mui/material/Table';
import  Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import './notification.css'


const ProductNotification = ({ dataArray, socket, open, setopen }) => {
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
  const handleClickAuthNotification = () => {
       const ids = dataArray?.map(notify=>{return notify?._id})
    socket.emit("read_all_product_notification", {ids});
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
        className='notification-wrapper'
          style={{
            visibility: open ? "visible" : "hidden",
            position: 'absolute',
             right:0, left:'auto',
        }}
        onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      >
           <div className="table-container w-full">
          <table className="py-2 relative w-full table-fixed">
            <thead className=" bg-white shadow-md py-4">
              <tr>
                <th className="text-sm font-normal">Action</th>
                <th className="text-sm font-normal">Date</th>
                <th colSpan={7} className="text-sm font-normal">From</th>
                <th colSpan={7} className="text-sm font-normal">To</th>
              </tr>
            </thead>
            <tbody>
              {dataArray?.map((val, index) => (
                <tr className="text-xs" key={index}>
                  <td className="capitalize">{val?.type}</td>
                  <td className="text-xs">
                    {format(parseISO(val?.created_at), " EEE MM yyyy, HH:mm b")}
                      </td>
                      <td className='w-full' colSpan={7} >
                          <table className='inner-table'>
                             <thead>
                                <tr>
                                   <th className='td-small'>Name</th> 
                                   <th className='td-small'>Qty</th> 
                                   <th className='td-small'>Stock</th> 
                                   <th className='td-small'>Price</th> 
                                   <th className='td-small'>Desc</th> 
                                </tr>
                              </thead> 
                              <tbody>
                                  <tr>
                                      <td>{val?.data?.from?.name }</td>
                                      <td>{val?.data?.from?.quantity }</td>
                                      <td>{val?.data?.from?.quantityInStock}</td>
                                      <td>{val?.data?.from?.price}</td>
                                      <td>{val?.data?.from?.description }</td>
                                      <td>{val?.data?.from?.stockId?.name }</td>
                                  </tr>
                              </tbody>
                        </table>  
                      </td>
                       <td className='w-full' colSpan={7} >
                          <table className='inner-table'>
                             <thead>
                                <tr>
                                   <th className='td-small'>Name</th> 
                                   <th className='td-small'>Qty</th> 
                                   <th className='td-small'>Stock</th> 
                                   <th className='td-small'>Price</th> 
                                   <th className='td-small'>Desc</th> 
                                </tr>
                              </thead> 
                              <tbody>
                                  <tr>
                                      <td>{val?.data?.to?.name }</td>
                                      <td>{val?.data?.to?.quantity }</td>
                                      <td>{val?.data?.to?.quantityInStock}</td>
                                      <td>{val?.data?.to?.price}</td>
                          <td>{val?.data?.to?.description}</td>
                                      <td>{val?.data?.to?.stockId?.name }</td>
                          
                                  </tr>
                              </tbody>
                        </table>  
                      </td>
                      
                </tr>
              ))}
            </tbody>
          </table>
          {/* <DataGrid sx={{height:'250px', zIndex:2}}
            rows={dataArray}
            columns={[
              { field: 'type', headerName: 'Action', },
              {
                field: 'created_at', headerName: 'Date',
                valueGetter: ({ value }) => value && format(parseISO(value), " EEE MM yyyy, HH:mm b")
              },
              {
                headerName: 'From', colSpan: 7, renderCell: ({row}) => {
                  <span>{row?.data?.from?.name }</span>
              },flex:1 },
              
              {headerName:'To', colSpan:7, }
            ]}
            getRowId={(row) => row?._id}
            hideFooter
          /> */}
          <Button onClick={handleClickAuthNotification}>
            Mark All As read
          </Button>
        </div>  
        </div>
    );
}

export default ProductNotification;
