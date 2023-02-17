import React, { useState, useEffect } from 'react';
import UsersTable from './UsersTable';
import { fetchUsers, queryInstance } from '../../api';
import {
    Button,
    Dialog, DialogTitle, DialogActions,
    DialogContent, DialogContentText, Slide,
    CircularProgress, 
} from '@mui/material'
import { Add } from '@mui/icons-material';

import { Box } from '@mui/system';
import useAuth from '../../hooks/useAuth';
import RolesSelect from './Inputs/RolesSelect';
import { useQuery } from '@tanstack/react-query';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const initialUser = { firstName: '', lastName: '', username: '', password: '', confirmPassword: '', roles: [] }
const UserPage = () => {
    const { isAdmin, isManager } = useAuth()
    // const [loading, setloading] = useState(false);
    // const [users, setusers] = useState([]);
    const [userToAdd, setuserToAdd] = useState(initialUser);
    const [openAdd, setopenAdd] = useState(false);
    const handleOpenAdd = () => { setopenAdd(true) }
    const handleCloseAdd = () => { setopenAdd(false); setuserToAdd(initialUser) }
    const [adding, setadding] = useState(false);
    const [addMessages, setaddMessages] = useState({ error: '', success: '' });

    const UserFetch = useQuery({
        queryKey: ['users'], queryFn:()=>fetchUsers()
    })
   
    useEffect(() => {
        // const fetchUsers = async () => {
        //     setloading(true)
        //     await queryInstance.get(`/users`)
        //         .then(res => {
        //             console.log(res?.data);
        //             setusers(res?.data?.users)
        //         }).catch(err => {
        //             console.log(err);
        //         }).finally(() => { setloading(false) })
        // }
        // fetchUsers()
    }, [])
    const handleAddUser = async () => {
        console.log(userToAdd);
        setadding(true)
        setaddMessages({ success: '', error: '' })
        await queryInstance.post(`/users`, userToAdd)
            .then(res => {
                setaddMessages({ ...addMessages, success: res?.data?.message })
                console.log(res);
            })
            .catch(err => {
                setaddMessages({ ...addMessages, error: err?.data?.message })
                console.log(err?.response?.data?.message)
                console.log(err);
            })
            .finally(() => {
                setadding(false)
            })
    }
   
   
    return (
        <div className='w-full h-full '>
            {UserFetch?.isLoading ?
                <div>
                    <p>Loading ..... </p>
                </div>
                :
                <>
                    {(isAdmin || isManager) ?
                        <Box mt={2}
                        sx={{
                            float: {xl:'right', lg:'right', md:'right', sm:'none',xs:'none' }, zIndex:2,
                            ml: 'auto', mr: {lg:'40px', xl:'80px', md: '40px', sm: '20px', xs: "20px" },
                            mb: { md: '0', sm: "10px", xs: '10px' }
                        }}>
                        <Button endIcon={<Add />}
                            variant="contained"
                            onClick={handleOpenAdd}>Add User</Button>
                        </Box> : null}
                    
                    {UserFetch?.data?.users?.length ?
                        <UsersTable users={UserFetch?.data?.users}  />
                        :
                        <div className='p-3 '>
                            <h3>No Users</h3>
                        </div>}
                </>

            }
            {(isAdmin || isManager) ? <Dialog open={openAdd}
                onClose={handleCloseAdd}
                scroll={'paper'}
                TransitionComponent={Transition}
            >
                <DialogTitle id="scroll-dialog-title">Add User</DialogTitle>
                <DialogContent dividers={true} >
                    <DialogContentText
                        id="scroll-dialog-description"
                        // ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {addMessages?.error?.length || addMessages?.success?.length ?
                            <span className={`${addMessages?.success?.length} 'text-green-800':'text-red-700'
                            text-center m-auto`}>
                                {addMessages?.success?.length ? addMessages?.success : addMessages?.error}
                            </span>
                            : null}
                    </DialogContentText>
                    <form onSubmit={() => { }} className="  
                                    md:px-12 md:py-5 py:2  px-6 ">
                        <div className='flex flex-col gap-2 '>

                            <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                                <label className='font-semibold text-lg' htmlFor="firstname">Firstname</label>
                                <input
                                    className='w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black '
                                    type="text" name="" id="firstname" placeholder='firstname'
                                    value={userToAdd?.firstName} onChange={e => setuserToAdd({ ...userToAdd, firstName: e.target.value })} />
                            </div>
                            <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                                <label className='font-semibold text-lg' htmlFor="lastname">Lastname</label>
                                <input className='w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black '
                                    type="text" name="" id="lastname" placeholder='lastname'
                                    value={userToAdd?.lastName}
                                    onChange={e => setuserToAdd({ ...userToAdd, lastName: e.target.value })}
                                />
                            </div>

                            <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                                <label className='font-semibold text-lg' htmlFor="username">Username</label>
                                <input className='w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black 
                        '          type="text" name="" id="username"
                                    placeholder='username'
                                    value={userToAdd?.username}
                                    onChange={e => setuserToAdd({ ...userToAdd, username: e.target.value })}
                                />
                            </div>
                            <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                                <label className='font-semibold text-lg' htmlFor="password">Password</label>
                                <input className='w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black '
                                    type="text" name="" id="password"
                                    placeholder='password'
                                    value={userToAdd?.password}
                                    onChange={e => setuserToAdd({ ...userToAdd, password: e.target.value })}
                                />
                            </div>
                            <div className=" md:w-72 sm:w-60 w-56 h-auto input-container">
                                <label className='font-semibold text-lg' htmlFor="confirm password">Confirm Password</label>
                                <input className='w-full py-1 px-2 rounded-lg text-lg h-14 text-black border-2 border-black '
                                    type="text" name="" id="confirm password"
                                    placeholder='confirm password'
                                    value={userToAdd?.password}
                                    onChange={e => setuserToAdd({ ...userToAdd, confirmPassword: e.target.value })}
                                />
                            </div>
                           <RolesSelect user={userToAdd} setuser={setuserToAdd} />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained'
                    size='medium' color='warning' sx={{mr:3}}
                    onClick={handleCloseAdd}>Cancel</Button>
                    <Button variant='contained'
                    size='medium' color='success' sx={{mr:1}}
                    onClick={handleAddUser}>{adding ? <CircularProgress /> : "Add"}</Button>
                </DialogActions>
            </Dialog> : null}
        </div>
    );
}

export default UserPage;
