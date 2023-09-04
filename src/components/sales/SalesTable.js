import React, { useState } from "react";
// import  IconButton  from "@mui/material/IconButton";
import  {DataGrid,gridClasses}  from "@mui/x-data-grid";
import Box from "@mui/system/Box";
// import  Delete  from "@mui/icons-material/Delete";
import { salesColumns, cancelledSalesColumns } from "./data";
import { queryInstance } from "../../api";
import useAuth from "../../hooks/useAuth";
import { GetError } from "../other/OtherFuctions";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import SuccessMessage from "../StatusMessages/SuccessMessage";
// import isToday from "date-fns/isToday";
// import parseISO from "date-fns/parseISO";

const SalesTable = ({
  sales,
  page,
  setpage,
  pageSize,
  setpageSize,
  rowCount,
  loading,
  socket,
  deletable,

}) => {
  const [cancelling, setCancelling] = useState(false);
 const {token}= useAuth()
  const [selectedIds, setselectedIds] = useState([]);
  const [cancelledStatus, setcancelledStatus]
    = useState({success:'', error:''});
  
  const handleCancellSales = async () => {
    setcancelledStatus({error:'', success:''})
    setCancelling(true)
    await queryInstance.patch(`/sales`, selectedIds , { headers: { Authorization: `Bearer ${token}`, }, date: new Date() })
      .then((res) => {
        if (res?.status === 200) {
          socket.emit(`notify_sale`)
          // console.log(res?.data);
          setcancelledStatus({success:res?.data?.message, error:''})
          setselectedIds([])
          return
        } else {
        setcancelledStatus({error: GetError(res), success:''})
        }
      // console.log(res);
      }).catch(err => {
      console.log(err);
        setcancelledStatus({error: GetError(err), success:''})
    }).finally(()=>setCancelling(false))
  }


  // console.log(sales[sales?.length-1]?.saleDate);
  // console.log(isToday(parseISO('2023-08-24T13:19:23.000Z')));
 

  return (
    <Box 
      className=" bg-white mt-8
      dark:bg-slate-800 
      text-gray-500 dark:text-white
     shadow 
     max-w-full overflow-scroll p-0"
      sx={{
        width: '100%',
        // minWidth: 'max-content', maxWidth: '1000px',
      }}
      
    >
      {(selectedIds?.length && deletable) ? (
        <div className="bg-gray-300 dark:bg-gray-800
        mb-0">

          <button className="bg-red-500 text-white
           px-3 py-2 float-right
          rounded-md opacity-100 hover:opacity-95 "
            onClick={handleCancellSales}>
           {cancelling? 'cancelling...': 'Cancell'}
          </button>
        </div>

      ) : null}
      {cancelledStatus?.error?.length ?
        <div className="w-fit block mt-3">
          <ErrorMessage error={cancelledStatus?.error}
          handleReset={() => 
          setcancelledStatus({...cancelledStatus, error: '' })} />
        </div> : null}
       {cancelledStatus?.success?.length ?
        <div className="w-fit block mt-3">
          <SuccessMessage message={cancelledStatus?.success}
            resetFunction={() => 
          setcancelledStatus({...cancelledStatus, success: '' })} />
        </div> : null}
      

      <DataGrid className="text-gray-600 dark:text-white"
        // autoHeight
        rowCount={rowCount}
        rows={sales?.length ? sales : []}
        checkboxSelection={deletable}
        columns={!deletable? salesColumns : cancelledSalesColumns}
        getRowId={(row) => row?._id}
        page={page}
        pageSize={pageSize}
        paginationMode={"server"}
        pagination={true}
        // filterModel={{}}
        // filterMode="server"
        // onFilterModelChange={({ items, logicOperator, quickFilterLogicOperator, quickFilterValues }) => {
        //   console.log(items)
        //   console.log(logicOperator)
        //   console.log(quickFilterLogicOperator)
        //   console.log(quickFilterValues)
          
        // }}
        onPaginationModelChange={({ page, pageSize }) => {
          setpage(page);
          setpageSize(pageSize)
        }}
        paginationModel={{ page: page, pageSize: pageSize }}

        keepNonExistentRowsSelected

        pageSizeOptions={[10, 20, 30, 40, 50, 100]}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        loading={loading}
        
        // onSelectionModelChange={(ids) => {
        //   console.log(ids)
        //   setselectedIds(ids);
        // }}
        onRowSelectionModelChange={(details) => {
          setselectedIds([...details])
        }}
        
        columnBuffer={4}
        columnThreshold={2}
        scrollbarSize={1}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
          toolbarFiltersTooltipActive: 2,
          
        }}
        
           getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        
        sx={{
          height: "100%",
          width: "100%",
          // minWidth:'max-content',maxWidth:'2000px',
          minHeight:'800px', maxHeight: '1000px',
          mx: "auto",
          mb: 8,
          [`& .${gridClasses.row}`]: {
            fontSize: ".9rem",
          },
          [`& .${gridClasses.columnHeader}`]: {
            fontSize: "1rem",
            fontWeight: "700",
          },
          [`& .${gridClasses.actionsCell}`]: {
            fontSize: "1.1rem",
          },
          py: 3,
          px: 2,
        }}
      />
          </Box>
  );
};

export default SalesTable;
