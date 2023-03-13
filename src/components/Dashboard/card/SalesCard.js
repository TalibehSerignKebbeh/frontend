import { Box, Card } from '@mui/material';
import React from 'react';
import './index.css'

const SalesCard = ({ quantity, text, icon, }) => {
    return (
        <Box sx={{
            p: "20px", bgcolor: 'white', borderRadius: '7px',
        boxShadow:
                "2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)",}} >
            <h4 className='text-lg font-normal'>{text}</h4>
            <small className='text-lg'>{quantity}</small>
        </Box>
    );
}

export default SalesCard;
