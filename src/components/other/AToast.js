import { Box } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AToast = ({ body, limit,type }) => {
    
    return (
        <Box sx={{ ":read-only": true }}>
            {toast.error(body, {
                position: toast.POSITION.TOP_CENTER,
                
            })}
            <ToastContainer closeButton 
                autoClose={4000}
                pauseOnHover={true}
                hideProgressBar
                limit={limit}
            />
        </Box>
    );
}

export default AToast;
