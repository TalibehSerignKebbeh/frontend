import React, { useState, useMemo } from 'react';
import {TableContainer, Table, TableRow, TableBody, TableCell, Paper, TableHead,
     Button, Stack, Dialog, DialogTitle, DialogActions, Slide, IconButton, TextField, Typography, CircularProgress
} from '@mui/material'
import useAuth from '../../hooks/useAuth';
// import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import {  EditSharp } from '@mui/icons-material';
// import { AiFillDelete } from 'react-icons/ai';

import { queryInstance, fetchUsers,  } from '../../api';
import RolesSelect from './Inputs/RolesSelect';
import {useQuery,QueryClient } from '@tanstack/react-query'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const UsersTable = ({ users, setusers }) => {
    const queryClient = new QueryClient()

    const { roles, isManager, isAdmin, isSeller } = useAuth()
    const [UserToEdit, setUserToEdit] = useState(null);
    const [openEdit, setopenEdit] = useState(false);
   const [EditStatus, setEditStatus] = useState({deleting:false, updating: false});
   const [updateMessage, setupdateMessage] = useState('');
       const UserFetch = useQuery({
        queryKey: ['users'], queryFn:()=>fetchUsers()
       })

    const handleInitialiseEdit = (user) => {
        setopenEdit(true)
        setUserToEdit(user)
    }
     const handleCloseEdit = () => {
        setopenEdit(false)
        setUserToEdit(null)
    }
    
    const handleDeleteUser = async () => {
        setEditStatus({...EditStatus, deleting: true})
   
        const id = UserToEdit?._id
        await queryInstance.delete(`/users/${id}`)
            .then(res => {
                alert(res?.data?.message)
                console.log(res);
            })
            .catch(err => {
                alert(err?.response?.data?.message)
                console.log(err?.response?.data?.message)
                console.log(err);
            })
            .finally(async () => {
        setEditStatus({...EditStatus, deleting: false})
                await queryInstance.get(`/users`)
                    .then(res => {
                        setusers(res?.data?.users)
                    })
            })
    }
    const handleUpdateuser = async() => {
        setEditStatus({...EditStatus, updating: true})
        const id = UserToEdit?._id
        await queryInstance.put(`/users/${id}`,UserToEdit)
            .then(res => {
                // alert(res?.data?.message)
                console.log(res);
            })
            .catch(err => {
                // alert(err?.response?.data?.message)
                console.log(err?.response?.data?.message)
                console.log(err);
            })
            .finally(async () => {
                setEditStatus({ ...EditStatus, updating: false })
                      queryClient.invalidateQueries({queryKey: ['users']})
            })
    }
    return (
        <div className='w-auto h-auto md:mt-6 mt-3'>
            {UserFetch?.isLoading ? <Box>
                <h3 className='p-2 text-lg'>Loading....</h3>
            </Box>
            :<TableContainer component={Paper}
                sx={{
                    width: {
                        xs: '100%', md: '90%', xl: '80%', lg: '80%',
                    },
                    my: 2, mx: { md: '10px', sm: '3px' }, px: 3, py: 4,
                    overflowX: 'scroll', mb: 4,
                    textAlign: 'center'
                }}
            >
                <Table sx={{ m: 'auto', p: 4, py: 3 }} stickyHeader>
                    <TableHead >
                        <TableRow className="font-semibold text-gray-900">
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell>Status</TableCell>
                            {(isAdmin || isManager) ?
                                <TableCell align='justify' colSpan={2} >Actions</TableCell> : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {UserFetch?.data?.users?.map((user, id) => (

                            <TableRow key={id}>
                                <TableCell>{user?.firstName} {user?.lastName}</TableCell>
                                <TableCell>{user?.username}</TableCell>
                                <TableCell>{user?.roles?.toString()}</TableCell>
                                <TableCell>
                                    <span
                                        className={`p-1 rounded-md ${user?.active ? 'bg-green-400' : 'bg-red-400'}`}>
                                        {user?.active ?
                                            'active' : 'inactive'}
                                    </span>
                                </TableCell>

                                {(isAdmin || isManager) ?
                                    <TableCell>
                                        <Button size='small' variant='contained'
                                            color={`success`}
                                            sx={{ fontSize: { md: '11px', sm: '7px', xs: '7px' } }}
                                            onClick={() => handleInitialiseEdit(user)}
                                        >
                                            <EditSharp />
                                        </Button>
                                    </TableCell> : null}
                            </TableRow>
                        ))

                        }
                    </TableBody>
                    
                </Table>
            </TableContainer>}
            {(isAdmin || isManager) ? <Dialog open={openEdit}
                TransitionComponent={Transition}
                sx={{ p: 3, width: 'auto' }}
            >
                <DialogTitle sx={{ p: 2, fontWeight: 'bold' }}>
                    Edit User <span className='text-red-600'>
                        {" " + UserToEdit?.firstName + " " + UserToEdit?.lastName}
                    </span>
                    <span>

                    </span>
                </DialogTitle>
                <Box width="auto" px={2}>
                    {/* <Typography>{UserToEdit?.username }</Typography> */}
                    <RolesSelect user={UserToEdit} setuser={setUserToEdit} />
                </Box>
                <Box width="auto" px={3}>
                    <label htmlFor='active'
                        className='block font-semibold text-lg pb-1 '>Active</label>
                    <input type={'checkbox'} id="active"
                        defaultChecked={UserToEdit?.active}
                        onChange={e => setUserToEdit({ ...UserToEdit, active: Boolean(e.target.value) })}
                        className="fifty-percent-radius p-1 h-10 w-10  "
                    />
                </Box>
                <DialogActions>
                    <Stack direction={'row'} spacing={3}>
                        <Button size='medium' variant='outlined'
                            color={`info`}
                            sx={{ mr: 2, fontSize: { md: '11px', sm: '7px', xs: '7px' } }}
                            onClick={handleCloseEdit}
                        >Close</Button>
                        <Button size='medium' variant='contained'
                            color={`warning`}
                            sx={{ mr: 2, fontSize: { md: '11px', sm: '7px', xs: '7px' } }}
                            onClick={handleUpdateuser}
                        >{EditStatus?.updating ? "Updating..." : 'Edit'}</Button>
                        <Button size='medium' variant='contained'
                            color={`error`}
                            sx={{ mr: 1, fontSize: { md: '11px', sm: '7px', xs: '7px' } }}
                            onClick={handleDeleteUser}
                        >{EditStatus?.updating ? "Deleting..." : 'Delete'}</Button>
                    </Stack>
                </DialogActions>
            </Dialog> : null}



        </div>
    );
}

export default UsersTable;
