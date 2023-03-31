import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const QuantityCard = ({ header, quantityText,linkTo }) => {
    return (
        <Box sx={{
            p: '8px',px:'13px', width: { xl: 'auto', lg: 'auto', md: 'auto', sm: 'auto', xs:'auto' },
            color: 'black',borderRadius: '3px',
            boxShadow:
                "2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)",
        }}>
            <Typography
                sx={{  fontSize: {xl:'1.1rem',md:'.8rem', lg:'1.2rem', sm:'.8rem'}, py: 1 }}>
                {header}
            </Typography>
            <Typography
                sx={{
                    fontSize: {
                        xl: '1.2rem', md: '.8rem',
                        lg: '1.2rem', sm: '.8rem'
                    }, py: 1, fontWeight: 'semibold'
                }}>
                {quantityText + ` products`}
            </Typography>
            <Link className='float-right text-blue-400' to={linkTo}>
                More
            </Link>
        </Box>
    );
}

export default QuantityCard;
