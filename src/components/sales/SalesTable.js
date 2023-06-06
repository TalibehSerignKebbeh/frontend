import React, { useState } from "react";
// import  IconButton  from "@mui/material/IconButton";
import  {DataGrid,gridClasses,GridToolbar}  from "@mui/x-data-grid";
import Box from "@mui/system/Box";
// import  Delete  from "@mui/icons-material/Delete";
import { salesColumns } from "./data";
import { queryInstance } from "../../api";
import useAuth from "../../hooks/useAuth";
import { GetError } from "../other/OtherFuctions";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import SuccessMessage from "../StatusMessages/SuccessMessage";

const SalesTable = ({
  sales,
  page,
  setpage,
  pageSize,
  setpageSize,
  rowCount,
  loading,
  socket,
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
          console.log(res?.data);
          setcancelledStatus({success:res?.data?.message, error:''})
          setselectedIds([])
          return
        } else {
        setcancelledStatus({error: GetError(res), success:''})
        }
      // console.log(res);
      }).catch(err => {
      // console.log(err);
        setcancelledStatus({error: GetError(err), success:''})
    }).finally(()=>setCancelling(false))
  }
 

  return (
    <Box 
      className="w-fit bg-white mt-8
      dark:bg-slate-700 
      text-gray-500 dark:text-white
     shadow 
     max-w-full overflow-scroll p-0"
      sx={{
        // eslint-disable-next-line no-useless-computed-key
        ['& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar']: {
          color: 'inherit',
          bgcolor:'inherit'
           }
      }}
      
    >
      {selectedIds?.length ? (
        <div className="bg-gray-300 dark:bg-gray-800
        mb-0">

          <button className="bg-red-500 text-white px-3 py-2 float-right
          rounded-md opacity-100 hover:opacity-95 "
            onClick={handleCancellSales}>
           {cancelling? 'cancelling...': 'Cancell'}
          </button>
        </div>

      ) : null}
      {cancelledStatus?.error?.length ?
        <div className="w-fit block mt-3">
          <ErrorMessage error={cancelledStatus?.error}
          handleReset={() => setcancelledStatus({ error: '' })} />
        </div> : null}
       {cancelledStatus?.success?.length ?
        <div className="w-fit block mt-3">
          <SuccessMessage error={cancelledStatus?.success}
          handleReset={() => setcancelledStatus({ success: '' })} />
        </div> : null}
      

      <DataGrid className="text-gray-600 dark:text-white"
        autoHeight
        rowCount={rowCount}
        rows={sales?.length ? sales : []}
        checkboxSelection
        columns={salesColumns}
        getRowId={(row) => row?._id}
        page={page}
        pageSize={pageSize}
        paginationMode={"server"}
        pagination={true}
      
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
        components={{
          Toolbar: GridToolbar,
          // Pagination: Paginnation({page, pageSize, rowCount, setpage, setpageSize}),
        }}
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
          // eslint-disable-next-line no-template-curly-in-string
          '& .${gridClass.mui-datagrid-footer-pagination}': {
          color: 'inherit',
          bgcolor:'inherit'
           },
          // ['& .{$gridClasses}']
          py: 3,
          px: 2,
        }}
      />
          </Box>
  );
};

export default SalesTable;
