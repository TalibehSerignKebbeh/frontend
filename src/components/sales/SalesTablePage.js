import React, { useState, useMemo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { AiFillDelete } from "react-icons/ai";
import { Box } from "@mui/system";
import { salesColumns } from "./data";
const SalesTablePage = ({
  sales,
  page,
  setpage,
  pageSize,
  setpageSize,
  rowCount,
  loading,
}) => {
  // sales?.map(sale=>console.log(isYesterday(parseISO(sale?.saleDate))))
  // sales?.map(sale => sale.total = (+sale.price * +sale.quantity))
  // const [deleting, setdeleting] = useState(false);
  // const [openDelete, setopenDelete] = useState(false);
  // const [openView, setopenView] = useState(false);
  // const [saleToView, setsaleToView] = useState({});
  // const [salesToview, setsalesToview] = useState([]);
  // const [saleToDelete, setsaleToDelete] = useState(null);
  // const [success, setsuccess] = useState('');
  // const [errorMsg, seterrorMsg] = useState('');
  const [selectedIds, setselectedIds] = useState([]);
  
  // const apiRef = useGridApiRef()
  // const handleInitializedDelete = (ids) => {
  //     // setsaleToDelete(sale)
  //     setopenDelete(true); setsuccess(''); seterrorMsg('')
  // }
  // const handleClose = () => {
  //     setopenView(false)
  //     setsaleToView(null)
  // }
  // const handleOpenView = (sale) => {
  //     setsaleToView(sale)
  //     setopenView(true)
  // }

  // const handleDeleteClose = () => { setopenDelete(false); setsaleToDelete(null) }
  // const DeleteSaleRequest = async () => {
  //     setdeleting(true)
  //     await queryInstance.delete(`/sales/${saleToDelete?._id}`)
  //         .then(res => {
  //             console.log(res);
  //             setsuccess(res?.data?.message)
  //         })
  //         .catch(err => {
  //             console.log(err);
  //             seterrorMsg(err?.data?.message)
  //         }).finally(() => setdeleting(false))
  // }
  //     const handleSelectSale = () => {
  //     // console.log(value);
  // }
  return (
    <Box
      position={"relative"}
      height={"700px"}
      sx={{
        width: {
          xl: "80%",
          lg: "90%",
          md: "100%",
          sm: "100%",
          xs: "100%",
          mb: 6,
        },
      }}
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
          >
            <AiFillDelete />
          </IconButton>
      ) : null}
      <DataGrid
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
        keepNonExistentRowsSelected
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
        // getRowClassName={params => params?.}
        // isRowSelectable={params => params?.row?.saleDate < new Date()}
        // isCellEditable={params=> params?.}
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

      {/* {sales?.length ?
                <Dialog open={openDelete}
                    sx={{ borderRadius: '20px' }}>
                    {<DialogTitle >
                        <Typography variant='h5'
                            sx={{ width: '100%', color: 'darkred', fontWeight: 'bold', pt: 1 }}>Delete Sale</Typography>
                        <p className='pt-1 w-60 text-base text-red-500'>
                            Are you sure you want to delete this
                            instance of sale
                            <span className='text-lg text-purple-800 px-2'>
                                {saleToDelete?.product}
                            </span>
                        </p>
                    </DialogTitle>}
                    <DialogContent>
                        {success?.length ?
                            <p className='p-1 text-lg text-green-700'>{success}</p>
                            : errorMsg?.length ?
                                <p className='p-1 text-lg text-red-700'>{errorMsg}</p>
                                : null}
                    </DialogContent>
                    <DialogActions sx={{ borderTop: '2px solid black', borderRadius: '4px' }}>
                        <Stack direction={'row'} spacing={2}>
                            <Button color="primary" variant='outlined'
                                onClick={handleDeleteClose} >Close</Button>
                            <Button color="error" variant='contained'
                                onClick={DeleteSaleRequest}>
                                {deleting ? <CircularProgress /> : 'Delete'

                                }</Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
                : null
            } */}
      {/* {sales?.length ?
                <Dialog open={openView}
                fullWidth>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                // aria-label="close"
                            >
                                <CloseSharp />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="Box">
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <h3>{saleToView?.product }</h3>

                </Dialog> : null} */}
    </Box>
  );
};

export default SalesTablePage;
