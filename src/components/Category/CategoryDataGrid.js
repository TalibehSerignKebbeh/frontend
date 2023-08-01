import React, { useState } from 'react';
import {
  DataGrid, GridToolbar, gridClasses,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import EditRounded from '@mui/icons-material/EditRounded';
import DeleteSweep from '@mui/icons-material/DeleteSweep';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ConfirmDelete from '../Modal/ConfirmDelete';
import { queryInstance } from '../../api';
import { QueryClient } from '@tanstack/react-query';
import { GetError } from '../other/OtherFuctions';
import useAuth from '../../hooks/useAuth';

const CategoryDataGrid = ({ data, setopenEdit, setstock,
  page, setpage, setpageSize, pageSize, isLoading,
}) => {
  const {token, isAdmin, isManager} = useAuth()
  const [openDelete, setopenDelete] = useState(false);
  const [stockToDelete, setstockToDelete] = useState(null);
  const [deletLoading, setdeletLoading] = useState(false);
  const [deleteSuccessMessage, setdeleteSuccessMessage] = useState('');
  const [deleteErrorMessage, setdeleteErrorMessage] = useState('');
  const queryClient = new QueryClient()

  const HandleDeleteStock = async () => {
    setdeletLoading(true)
    await queryInstance.delete(`/categories/${stockToDelete?._id}`, {headers:{Authorization: `Bearer ${token}`}})
      .then((res) => {
        if (res?.status === 200) {
          setdeleteSuccessMessage(res?.data?.message)
          queryClient.invalidateQueries({ queryKey: ['stocks', page, pageSize] })
          return;
        }
       setdeleteErrorMessage(GetError(res))
      }).catch((err) => {
       setdeleteErrorMessage(GetError(err))
      }).finally(() => {
        setdeletLoading(false)

      })
  }

  const handleStartDelete = (stock) => {
    setopenDelete(true)
    setstockToDelete(stock)
  }
  const handleCloseDelete = (stock) => {
    setstockToDelete(null)
    setdeleteSuccessMessage('')
    setdeleteErrorMessage('')
  }
  const columns = [
    { field: 'name', headerName: 'Name', width: 140 },

    { type: 'number', field: 'productCount', headerName: 'Products', width: 100, },

    {
      field: 'createdDate', headerName: 'AddedAt', width: 120,
      valueGetter: ({ value }) => value ? format(new Date(value), 'do MMM yyyy') : 'missing'
    },
    {
      field: 'lastUpdate', headerName: 'LastUpdated', width: 120,
      valueGetter: ({ value }) => value ? format(new Date(value), 'do MMM yyyy') : 'missing'
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 190,
      getActions: (params) => [

        <GridActionsCellItem 
          className='text-slate-800 dark:text-white
           text-xs' 
          sx={{ p: 1, py: '4px', borderRadius: 0, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.6)' }}
          icon={
            <Link
              className="font-normal  p-1"
              to={`/categories/${params.id}/products`}
            >
              Products
            </Link>
          }

          label="Products"
        />,
        <GridActionsCellItem hidden={!(isAdmin)}
        className='text-slate-800 dark:text-white' 
        sx={{ p: 1, py: '4px', borderRadius: 0, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.6)' }}
          onClick={() => { setopenEdit(true); setstock(params?.row) }}
          icon={<EditRounded />}
          label="Edit"
        />,
        <GridActionsCellItem hidden={!(isAdmin)}
        className='text-slate-800 dark:text-white' 
        sx={{ p: 1, py: '4px', color: 'darkred', borderRadius: 0, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.6)' }}
          onClick={() => handleStartDelete(params?.row)}
          icon={<DeleteSweep />}
          label="Delete"
        />,
      ],
    },
  ]
  return (
    <>

      <DataGrid
        className='bg-slate-50 dark:bg-slate-700
        text-gray-700 dark:text-white 
        shadow-md  '
        rows={data?.categories?.length ? data?.categories : []}
        columns={columns}
        pageSize={pageSize}
        page={page}
        rowCount={data?.count}
        
        // onPageChange={newPage => setpage(newPage)}
        onPaginationModelChange={({page, pageSize }) => {
          setpage(page);
          setpageSize(pageSize)
        }}
         paginationMode='server'
        paginationModel={{page:page, pageSize:pageSize}}
        loading={isLoading}
        columnBuffer={4}
        columnThreshold={2}
        pageSizeOptions={[5, 10, 20, 30, 50, 70, 100]}
        // onPageSizeChange={newSize => setpageSize(newSize)}
        // components={{
        //   Toolbar: GridToolbar,
        // }}

        localeText={{
          toolbarDensity: 'Size',
          toolbarDensityLabel: 'Size',
          toolbarDensityCompact: 'Small',
          toolbarDensityStandard: 'Medium',
          toolbarDensityComfortable: 'Large',
        }}
        getRowId={row => row?._id}
        sx={{
          minHeight: '400px',
          // bgcolor: '#fff', boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
          height: '400px', width: '100%',
          pt: 1, px: 1, mb: 4,
          [`& .${gridClasses.columnHeader}`]: {
            fontSize: '1rem', fontWeight: '300',
          },
        }}
      />
      <ConfirmDelete open={openDelete}
        setopen={setopenDelete}
        message={`Category: ${stockToDelete?.name}`}
        succcessMsg={deleteSuccessMessage}
        errorMessage={deleteErrorMessage}
        deleteLoading={deletLoading}
        deleteFunction={HandleDeleteStock}
        resetFunc={handleCloseDelete}
      />
    </>

  );
}

export default CategoryDataGrid;
