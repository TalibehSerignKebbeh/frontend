import React from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { salesColumns } from "./data";
import Box from "@mui/material/Box";

const MyDataGrid = ({ data, loading }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        boxShadow:
          "2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)",
        width: "auto",
        height: "auto",
      }}
    >
      <DataGrid
        columns={salesColumns}
        autoHeight
        rows={data?.length ? data : []}
        columnBuffer={4}
        columnThreshold={2}
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
          width: { xl: "75%", lg: "80%", md: "95%", sm: "95%", xs: "98%" },
          p: 2,
          [`& .${gridClasses.columnHeader}`]: {
            fontSize: "1rem",
            fontWeight: "700",
            color: "#3339",
          },
        }}
      />
    </Box>
  );
};

export default MyDataGrid;
