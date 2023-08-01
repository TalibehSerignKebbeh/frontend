import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import React,{useState} from 'react';
import useAuth from '../../hooks/useAuth';
import {} from '@fortawesome/free-solid-svg-icons'

const UsersTableRow = ({ user }) => {
    const { isAdmin } = useAuth()
    const [UserToEdit, setUserToEdit] = useState(null);
    const [openEdit, setopenEdit] = useState(false);
   const [EditStatus, setEditStatus] = useState({deleting:false, updating: false});


     const handleInitialiseEdit = (user) => {
        setopenEdit(true)
        setUserToEdit(user)
    }
     const handleCloseEdit = () => {
        setopenEdit(false)
        setUserToEdit(null)
    }

    
    return (
        <TableRow>
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

            {(isAdmin) ?
                <TableCell>
                    <Button size='small' variant='contained'
                        color={`success`}
                        sx={{ fontSize: { md: '11px', sm: '7px', xs: '7px' } }}
                        onClick={() => handleInitialiseEdit(user)}
                    >
                        {/* <EditSharp /> */}
                    </Button>
                   
                </TableCell> : null}
        </TableRow>
    );
}

export default UsersTableRow;
