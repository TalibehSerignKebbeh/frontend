import React, { useState } from "react";
import  IconButton  from "@mui/material/IconButton";
import  {DataGrid,gridClasses,GridToolbar}  from "@mui/x-data-grid";
import Box from "@mui/system/Box";
import  Delete  from "@mui/icons-material/Delete";
import { salesColumns } from "./data";
import styled from "@emotion/styled";
import { Pagination } from "antd";
import Paginnation from "./Paginnation";
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
  
  const customPagination = () => {
    
  }

  return (
    <Box 
      className="w-fit bg-white 
      dark:bg-slate-700 
      text-gray-500 dark:text-white
     shadow shadow-white dark:shadow-slate-700
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
        <IconButton
          className="bg-slate-500 dark:bg-slate-100"
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
      <DataGrid className="text-gray-600 dark:text-white"
        autoHeight
        
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
      
        pagination={true}
      
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
