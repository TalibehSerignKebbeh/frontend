import React, { useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";
import './notification.css'
import { queryInstance } from "../../api";
import useAuth from "../../hooks/useAuth";
import { formatNotificationDate } from "../../utils/dateFormatters";

const AuthNotifications = ({ socket, data, open, setopen }) => {

  const ref = useRef(null)
  const { token } = useAuth()

  const handleClickAuthNotification = async () => {
    const ids = data?.map(notify => { return notify?._id })
    // socket.emit("read_all_auth_notification", { ids });
    await queryInstance.patch(`notifications`, { ids },
      { headers: { Authorization: `Bearer ${token}` } }
    )
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
    
      
    return () => {

    };
  }, [setopen, open]);

  const Row = ({ index, style }) => {
    const val = data[index];
    const date = val?.created_at?.length ? formatNotificationDate(val?.created_at) : ''
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
        
      >
       
       <div className="bg-white dark:bg-gray-700 
             shadow shadow-white dark:shadow-slate-800
              block py-2 px-[3px] "
        >
           <small className="absolute right-2
          bg-blue-600 text-white px-2 rounded-full text-xl  ">
            {index + 1}
          </small>
          <p className="text-gray-700 dark:text-gray-50 
        block font-normal capitalize ">
            {val?.message +" | "+date}
          </p>
          <span className='text-gray-700 dark:text-gray-50 
        block font-normal capitalize'>
           Name {fullName}
          </span>
          {/* <small className="text-gray-700 dark:text-gray-50 
        block  capitaliz font-serif font-semibold">
            {date}
          </small> */}
        </div>
      </div>
    );
  };

  if (!data?.length)
    return null
  return (
    <div ref={ref}
      className='notification-wrapper
        bg-slate-100 dark:bg-slate-800
        overflow-y-auto flex flex-col '
      style={{
        visibility: open ? "visible" : "hidden",
        position: 'absolute', right: 0, left: 'auto',
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
        itemCount={data?.length}
        itemSize={110}
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
};

export default AuthNotifications;
