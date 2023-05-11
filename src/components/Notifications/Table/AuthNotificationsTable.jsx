import React, { useEffect,useRef } from "react";
import { FixedSizeList } from "react-window";
import  format  from "date-fns/format";
import parseISO from "date-fns/parseISO";
import  Button  from '@mui/material/Button';
import '../notification.css'
// import { DataGrid } from "@mui/x-data-grid";

const AuthNotificationsTable = ({ socket, data, open, setopen }) => {

  const ref = useRef(null)

  const handleClickAuthNotification = () => {
    const ids = data?.map(notify => { return notify?._id })
    socket.emit("read_all_auth_notification", {ids});
  };
  useEffect(() => {
     window.addEventListener('mousedown', (e) => {
          if (ref?.current && !ref.current?.contains(e.target)) {
              setopen(false)
            }
        })
    return () => {
      
    };
  }, [setopen]);

  const Row = ({ index, style }) => {
    const val = data[index];
    const date = val?.created_at?.length ? format(parseISO(val?.created_at), " EEE MMM yyyy, HH:mm b") : ''
    const fullName = val?.userId?.firstName + " " + val?.userId?.lastName;
    return (
      <div
        style={{
        ...style, display: 'flex', flexDirection: 'column', rowGap: '-15px',
        backgroundColor: 'white',boxShadow:'2px 2px 4px 0px rgba(0,0,0,0.5)',
        height: 'auto', width: '100%', padding: '0px 5px',
      textAlign:'center', justifyContent:'center'}}>
        <h3 className="text-normal text-lg font-serif">
          {fullName +" "+val?.action}</h3>
        <h5 className="text-xs font-serif font-light">{date}</h5>
      </div>
    );
  };

    return (
       <div  ref={ref}
        className='notification-wrapper'
            style={{
        visibility: open ? "visible" : "hidden",
              position: 'absolute', right:0, left:'auto',
      backgroundColor:''
        }}>
        {/* <DataGrid 
          sx={{height:'300px'}}
          rows={data}
          columns={[{ field: 'message', headerName: 'message', width: 200, },
            {
              field: 'userId', headerName: 'username',width: 200,
              valueGetter: ({ value }) => value?.username
            },
            {
              field: 'created_at', headerName: 'DateTime',width:300,
              // valueGetter:({value})=>value?.toString(),
              valueGetter: ({ value }) => format(parseISO(value), " EEE MM yyyy, HH:mm b")
            }]}
          getRowId={(row) => row?._id}
          hideFooterPagination
          hideFooterSelectedRowCount
          hideFooter={true}
         /> */}
    <div className="w-full">
      <div className="py-2 relative w-full ">
        {/* <div className="bg-white shadow-md">
          <div className="flex flex-row">
            <div className=" w-1/3 py-2">Message</div>
            <div className=" w-1/3 py-2">DateTime</div>
            <div className=" w-1/3 py-2">Name</div>
          </div>
        </div> */}
            <Button color="success"
              // sx={{ position: 'absolute', top: '5px' }}
                onClick={handleClickAuthNotification}>
            Read All
          </Button>
            <div style={{position:'relative'}} className=" relative">
              
          <FixedSizeList
            height={250}
            itemCount={data.length}
            itemSize={65}
                width={"100%"}
                style={{
                  marginTop:'60px', 
                  marginBlock: '10px',
                height:'auto'}}
          >
            {Row}
                  </FixedSizeList>
           
        </div>
      </div>
        </div>
         {/* <Button onClick={handleClickAuthNotification}>
            Mark All As read
          </Button> */}
        </div>
            
  );
};

export default AuthNotificationsTable;
