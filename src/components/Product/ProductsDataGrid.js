import React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import  format  from "date-fns/format";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AddIcon from '@mui/icons-material/AddBoxOutlined'
import parseISO from "date-fns/parseISO";
const ProductsDataGrid = ({ products, pageSize,
  setpageSize, page,  setpage,  loading,totalPages,
}) => {
 
  const { isSeller} = useAuth()
 
  const columns = [
    {
      field: "name", headerName: "Name", width: 140,headerClassName:'header'
    },
    { type: "number", field: "quantity", headerName: "Quantity", width: 90,headerClassName:'header', },
    {
      type: "number",
      field: "price",
      headerName: "Price",
      width: 120,headerClassName:'header',
      valueFormatter: (params) => {
        if (params.value === null) return "";
        const priceFormat = Number(params.value).toLocaleString();
        return `D ${priceFormat}`;
      },
    },
    {
      type: "number",
      field: "quantityInStock",
      headerName: "InStock",headerClassName:'header',
      width: 100,
    },
    {
      field: "stockId",
      headerName: "Category",headerClassName:'header',
      width: 140,
      valueGetter: ({ value }) => value && value.name,
    },
    {
      field: "producedDate",
      headerName: "MFD",
      width: 120,
      valueGetter: ({ value }) =>
        value ? format(parseISO(value), "do MMM yyyy") : "missing",
    },
    {
      field: "expiryDate",
      headerName: "Exp",headerClassName:'header',
      width: 120,
      valueGetter: ({ value }) =>
        value ? format(parseISO(value), "do MMM yyyy") : "missing",
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
      headerName: "Actions", headerClassName: 'header',
      type: "actions",
      width: 140,
      getActions: (params) => [
        <GridActionsCellItem
          sx={{ p: 1, py: '4px', borderRadius: 0, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.6)' }}
          icon={
            <Link
              className="font-normal text-zinc-700
              dark:text-slate-50 p-1"
              to={`/products/${params.id}/sales`}
            >
              {/* <Inventory2 color='success' /> */}
              Sales
            </Link>
          }
          showInMenu  
        />,
        <GridActionsCellItem  hidden={isSeller}
          onClick={() => {
            alert('action btn click')
          }}
          sx={{ p: 1, py: '4px', borderRadius: 0, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.6)' }}
          showInMenu
          icon={
            <AddIcon 
              sx={{fontSize:'3rem'}}
            />
          } 
          label="Add Stock"
        />,
      
          <GridActionsCellItem hidden={isSeller}
          sx={{ p: 1, py: '4px', borderRadius: 0, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.6)' }}
          icon={
            <Link 
              className="font-normal 
              text-blue-600 dark:text-blue-300
               p-1 px-3"
              to={`/products/${params.id}`}
            >
              {/* <AiOutlineEdit className='p-3 ' color='secondary' /> */}
              Edit
            </Link>
          }
          showInMenu  
        />,
      ],
    },
  ];

  return (
    <div className="mb-3 text-gray-600 dark:text-white">
      <DataGrid
        className="bg-white dark:bg-slate-700 
        text-gray-500 dark:text-slate-100 
        group-[.columnHeader]:font-light
        only:[.datagrid-footer]:text-slate-400"
        rows={products?.length ? products : []}
        columns={columns}
        paginationModel={{ page: page, pageSize: pageSize }}
        
        classes={{
          'footerContainer': 'text-white',
          'footerCell': 'bg-slate-100 dark:bg-slate-700 text-black dark:text-white',
          'rowCount': 'text-black dark:text-white',
          'panelFooter': 'text-black dark:text-white',
          
        }}
        pageSizeOptions={[10,20,30,40,50,75,100]}
        // onPageChange={(newPage) => setpage(newPage)}
        onPaginationModelChange={({page, pageSize }) => {
          setpage(page)
          setpageSize(pageSize)
        } }
      
        loading={loading}
        columnBuffer={4}
        columnThreshold={2}
        // rowsPerPageOptions={[10, 20, 30, 50, 70, 100]}
        // onPageSizeChange={(newSize) => setpageSize(newSize)}
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
        sx={{
          // bgcolor: "#fff",
          // boxShadow: "2px 2px 3px rgba(0,0,0,0.4)",
          height: "600px",
          width: { xl: "70%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
          pt: 1,
          px: 1,
          mb: 4,
          [`& .${gridClasses.columnHeader}`]: {
            fontSize: "1rem",
            fontWeight: "200",
            color: "inherit",
          },
          [`& .header`]: {
            fontWeight:200
          },
          // eslint-disable-next-line no-undef
          [`& .${gridClasses.MuiTablePagination}`]: {
            color:'#80aaff'
          }
        }}
      />
      {/* <TablePagination count={totalPages}
        // rowsPerPage={pageSize}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[10, 15, 20,30, 50, 100]}
        onRowsPerPageChange={({ target: { value } }) => {
          setpageSize(value)
        }}
        page={page}
        onPageChange={({ event, page }) => {
         setpage(page)
        }} 
         className="bg-slate-100 dark:bg-slate-700
      text-slate-800 dark:text-white" 
      /> */}
    </div>
  );
};

export default ProductsDataGrid;
