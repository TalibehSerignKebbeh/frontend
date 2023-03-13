import { Button, Table } from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import { format, parseISO } from 'date-fns';
import React, { useEffect } from 'react';
import './notification.css'


const ProductNotification = ({ dataArray, socket, open, setopen }) => {
     const handleClickAuthNotification = () => {
    socket.emit("read_all_product_notification");
    };

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                setopen(false)
            }
        })
      
    }, [setopen]);
    return (
        <div className='notification-wrapper'
          style={{
        visibility: open ? "visible" : "hidden",
        width: "auto",
        height: "auto",
        padding: "30px 10px",
        position: "absolute",
        top: "20px",
        right: "6px",
        left: "auto",
        overflow: "scroll",
        backgroundColor: "#fff",
        boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.4)",
        maxHeight: "400px",
              minWidth: "350px",
        resize:'both'
        
      }}>
           <div className="table-container w-full">
          <table className="py-2 relative w-full">
            <thead className=" bg-white shadow-md py-4">
              <tr>
                {/* <th className="text-sm font-normal">Action</th> */}
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
                                      <td>{val?.data?.to?.description }</td>
                                  </tr>
                              </tbody>
                        </table>  
                      </td>
                      
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={handleClickAuthNotification}>
            Mark All As read
          </Button>
        </div>  
        </div>
    );
}

export default ProductNotification;
