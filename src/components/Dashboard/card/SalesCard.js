import { Card } from '@mui/material';
import React from 'react';
import './index.css'

const SalesCard = ({ quantity, text, icon, }) => {
    return (
        <Card sx={{ p: "20px", bgcolor: 'white' }} borderRadius='7px'>
            <h4 className='text-lg font-semibold'>{text}</h4>
            <small className='text-lg'>{quantity}</small>
        </Card>
    );
}

export default SalesCard;
