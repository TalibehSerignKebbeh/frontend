import React, { useEffect,useRef } from "react";
import { FixedSizeList } from "react-window";
import  format  from "date-fns/format";
import parseISO from "date-fns/parseISO";
import '../notification.css'
import { queryInstance } from "../../../api";

const AuthNotificationsTable = ({ socket, data, open, setopen }) => {

  const ref = useRef(null)

  const handleClickAuthNotification = async () => {
    const ids = data?.map(notify => { return notify?._id })
    // socket.emit("read_all_auth_notification", { ids });
  await  queryInstance.patch(`notifications`, { ids })
      .then((res) => {
        // console.log(res);
        if (res?.status === 200) {
           socket.emit("read_all_auth_notification", {});
        }

      // console.log(res);
      }).catch((err) => {
      // console.log(err);
        alert('some error occurred')
    })
  };
  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      // console.log(ref?.current?.contains(e.target));
          if (!ref?.current?.contains(e.target)) {
              setopen(false)
            }
        })
    return () => {
      
    };
  }, [setopen]);

  const Row = ({ index, style }) => {
    const val = data[index];
    const date = val?.created_at?.length ? format(parseISO(val?.created_at), " EEE MMM do yyyy, HH:mm b") : ''
    const fullName = val?.userId?.firstName + " " + val?.userId?.lastName;
    return (
      <div
        style={{
        ...style, display: 'block', flexDirection: 'column', rowGap: '-20px',
        height: 'auto', width: '100%', padding: '2px 5px',
          textAlign: 'center', justifyContent: 'center',
        }}
        className='bg-inherite'
      >
        <div className="bg-white dark:bg-gray-600 
             shadow-md shadow-slate-100 dark:shadow-slate-400">
          
        <small className="text-gray-700 dark:text-gray-50 
        block font-normal capitaliz
        e
        ">{val?.message}</small>
        <small className="text-gray-700 dark:text-gray-50 
        font-light text-xs capitalize"
        >
        Name: <small className="text-lg font-normal">{ fullName} </small></small>
        <small className="text-gray-700 dark:text-gray-50 
         block text-xs font-normal"
         >
         {date}</small>
      
      </div>
        </div>
    );
  };

    return (
       <div  ref={ref}
        className='notification-wrapper
        bg-slate-100 dark:bg-slate-800'
            style={{
        visibility: open ? "visible" : "hidden",
              position: 'fixed', right:0, left:'auto',
        }}
      >
        <div className="w-full text-center">
          <button
            className='mx-auto p-2 px-8 mt-2 rounded  
            bg-green-700 hover:bg-green-600
            text-white hover:text-white  '
                onClick={handleClickAuthNotification}>
            Read All
          </button>
       </div>

              
          <FixedSizeList
            height={250}
            itemCount={data?.length}
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
};

export default AuthNotificationsTable;
