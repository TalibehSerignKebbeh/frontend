

//  const columns = useMemo(() => [
//         {
//             field: 'firstName', headerName: 'FirstName', minWidth: 120,
//             valueGetter: ({ value }) => value ? value : ''
//         },
//         {
//             field: 'lastName', headerName: 'LastName', width: 110,
//             valueGetter: ({ value }) => value ? value : ''
//         },

//         {
//             field: 'username', headerName: 'Username', minWidth: 150,
//             valueGetter: ({ value }) => value ? value : ''
//         },
//         {
//             field: 'roles', type: 'select', editable: true, valueOptions: ['seller', 'admin'], headerName: 'Roles', minWidth: 150,
//             valueGetter: ({ value }) => value ? value?.toString() : ''
//         },
        
//         {
//             type: 'actions', field:'actions', headerName: "Actions", getActions: (params) => [
//                 <GridActionsCellItem  label='edit'
//                     icon={<Edit >
//                     <Link to={`/users/:${params?.id}`}></Link>
                      
//                   </Edit>}  >
//                     {/* <Link to={`/users/:${params?.id}`}><Edit color='green' className='hover:text-green-400'/></Link> */}
//                   </GridActionsCellItem>
//             ]
//         }


//     ], [])



// selected ids component
// {selectedIds?.length ? <Box sx={{
//                     right: '40px', top: '5px', zIndex:3, position: 'absolute'
//                 }}>
//                     <IconButton sx={{color:'lightseagreen'}}><EditSharp /> </IconButton>
//                     <IconButton sx={{ color: 'red' }}
//                     onClick={handleDeleteOpen}><Delete /></IconButton>
//                 </Box> : null}


{/* <DataGrid columns={columns}
                    rows={users?.length ? users : []}
                    checkboxSelection 
                    autoHeight getRowId={row => row?._id}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    keepNonExistentRowsSelected
                    onSelectionModelChange={ids => {
                        setselectedIds(ids)
                    }}
                    sx={{
                        bgcolor: '#fff', boxShadow: '2px 2px 3px rgba(0,0,0,0.4)',
                        height: '450px', 
                        py: 3, px: 1, mb: 4, ml: '10px'
                    }}
                /> */}