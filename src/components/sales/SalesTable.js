import React, { useState } from "react";
import  IconButton  from "@mui/material/IconButton";
import  {DataGrid,gridClasses,GridToolbar}  from "@mui/x-data-grid";
// import Box from "@mui/system/Box";
import  Delete  from "@mui/icons-material/Delete";
import { salesColumns } from "./data";
const SalesTable = ({
  sales,
  page,
  setpage,
  pageSize,
  setpageSize,
  rowCount,
  loading,
}) => {
 
  const [selectedIds, setselectedIds] = useState([]);
  
  return (
    <div 
      className="w-fit bg-white dark:bg-slate-700 text-gray-500
     shadow-xl shadow-white"
      // sx={{
      //   width: {
      //     xl: "80%",
      //     lg: "90%",
      //     md: "100%",
      //     sm: "100%",
      //     xs: "100%",
      //     mb: 6,
      //   },
      // }}
      
    >
      {selectedIds?.length ? (
          <IconButton
            sx={{
              cursor: "pointer",
                      float: 'right',
              mb:'-40px',
                      color: "red",
              zIndex:10,
          }}
          onClick={()=>alert('click')}
          >
            <Delete sx={{transform:'scale(1.2)', color:'red'}} />
            {/* <AiFillDelete /> */}
          </IconButton>
      ) : null}
      <DataGrid autoHeight
        rowCount={rowCount}
        rows={sales?.length ? sales : []}
        checkboxSelection
        columns={salesColumns}
        getRowId={(row) => row?._id}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setpage(newPage)}
        paginationMode={"server"}
        onPageSizeChange={(newSize) => {
          setpageSize(newSize);
          setpage(0);
        }}
        onPaginationModelChange={({page, pageSize}) => {
          setpage(page);
          setpageSize(pageSize)
        }}
        paginationModel={{ page: page, pageSize: pageSize }}
        keepNonExistentRowsSelected
        pageSizeOptions={[10, 20, 30, 40, 50, 100]}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        loading={loading}
        onSelectionModelChange={(ids) => {
          setselectedIds(ids);
        }}
        columnBuffer={4}
        columnThreshold={2}
        components={{
          Toolbar: GridToolbar,
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
          boxShadow: "2px 2px 2px rgba(0,0,0,0.4)",
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
            color: "#3339",
          },
          [`& .${gridClasses.actionsCell}`]: {
            fontSize: "1.1rem",
          },
          py: 3,
          px: 2,
        }}
      />
          </div>
  );
};

export default SalesTable;
