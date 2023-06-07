import React from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { salesColumns } from "./data";
import Box from "@mui/material/Box";

const MyDataGrid = ({ data, loading }) => {
  return (
    <Box className={`bg-slate-200 dark:bg-slate-600
    text-gray-600 dark:text-white w-fit`}
      sx={{
        // bgcolor: "#fff",
        boxShadow:
          "2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)",
        height: "auto",
      }}
    >
      <DataGrid className="text-slate-700 dark:text-slate-50
      w-fit"
        columns={salesColumns}
        autoHeight 
        rows={data?.length ? data : []}
        columnBuffer={4}
        columnThreshold={4}
        hideFooterPagination={true}
        getRowId={(row) => row?._id}
        loading={loading}
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
        sx={{
          maxHeight: "500px",
          // width: { xl: "75%", lg: "80%", md: "95%", sm: "95%", xs: "98%" },
          p: 2,
          [`& .${gridClasses.columnHeader}`]: {
            fontSize: "1rem",
            fontWeight: "500",
            color: "inherit",
          },
        }}
      />
    </Box>
  );
};

export default MyDataGrid;
