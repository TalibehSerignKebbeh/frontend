import React from 'react';
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
const SpinnerLoader = () => {
    return (
        <Box sx={{
            width: '100%', display: 'flex', alignSelf: 'center', alignItems: 'center',
            justifyContent: 'center', height: 'auto',
            textAlign: 'center'
        }}>
        <CircularProgress sx={{color:'red'}} />
    </Box>
    );
}

export default SpinnerLoader;
