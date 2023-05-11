import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import  Box  from "@mui/material/Box";
// import  IconButton  from "@mui/material/IconButton";
import  format  from "date-fns/format";
// import { Inventory2 } from "@mui/icons-material";
// import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductsDataGrid = ({
  products,
  pageSize,
  setpageSize,
  page,
  setpage,
  loading,
}) => {
 
  const columns = [
    { field: "name", headerName: "Name", width: 140 },
    { type: "number", field: "quantity", headerName: "Quantity", width: 90 },
    {
      type: "number",
      field: "price",
      headerName: "Price",
      width: 120,
      valueFormatter: (params) => {
        if (params.value === null) return "";
        const priceFormat = Number(params.value).toLocaleString();
        return `D ${priceFormat}`;
      },
    },
    {
      type: "number",
      field: "quantityInStock",
      headerName: "InStock",
      width: 100,
    },
    {
      field: "stockId",
      headerName: "Category",
      width: 140,
      valueGetter: ({ value }) => value && value.name,
    },
    {
      field: "producedDate",
      headerName: "MFD",
      width: 120,
      valueGetter: ({ value }) =>
        value ? format(new Date(value), "do MMM yyyy") : "missing",
    },
    {
      field: "expiryDate",
      headerName: "Exp",
      width: 120,
      valueGetter: ({ value }) =>
        value ? format(new Date(value), "do MMM yyyy") : "missing",
    },
    //  {
    //   field: "createdAt",
    //   headerName: "AddedAt",
    //   width: 120,
    //   valueGetter: ({ value }) =>
    //     value ? format(new Date(value), "EEE MM yyyy, HH:mm b") : "",
    // },
    // {
    //   field: "updatedAt",
    //   headerName: "UpdatedAt",
    //   width: 120,
    //   valueGetter: ({ value }) =>
    //     value ? format(new Date(value), "EEE MM yyyy, HH:mm b") : "",
    // },
    {
      field: "description",
      headerName: "description",
      width: 170,
      valueGetter: ({ value }) => (value ? value : ""),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 140,
      getActions: (params) => [
        <GridActionsCellItem sx={{p:1, py:'4px', borderRadius:0, boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
          icon={
            <Link
              className="font-normal text-zinc-800 p-1"
              to={`/products/${params.id}/sales`}
            >
              {/* <Inventory2 color='success' /> */}
              Sales
            </Link>
          }
          label="Sales"
        />,
        <GridActionsCellItem sx={{p:1, py:'4px', borderRadius:0, boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
          icon={
            <Link
              className="font-normal text-blue-600 p-1"
              to={`/products/${params.id}`}
            >
              {/* <AiOutlineEdit className='p-3 ' color='secondary' /> */}
              Edit
            </Link>
          }
          label="Edit"
        />,
      ],
    },
  ];

  return (
    <Box mb={3}>
      <DataGrid
        rows={products?.length ? products : []}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={(newPage) => setpage(newPage)}
        loading={loading}
        columnBuffer={4}
        columnThreshold={2}
        // checkboxSelection
        rowsPerPageOptions={[10, 20, 30, 50, 70, 100]}
        onPageSizeChange={(newSize) => setpageSize(newSize)}
        components={{
          Toolbar: GridToolbar,
          // MoreActionsIcon: GridM
        }}
        localeText={{
          toolbarDensity: "Size",
          toolbarDensityLabel: "Size",
          toolbarDensityCompact: "Small",
          toolbarDensityStandard: "Medium",
          toolbarDensityComfortable: "Large",
          // toolbarQuickFilterDeleteIconLabel: ''
        }}
        getRowId={(row) => row._id}
        onRowDoubleClick={(params) => {}}
        sx={{
          bgcolor: "#fff",
          boxShadow: "2px 2px 3px rgba(0,0,0,0.4)",
          height: "600px",
          width: { xl: "70%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
          pt: 1,
          px: 1,
          mb: 4,
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

export default ProductsDataGrid;
