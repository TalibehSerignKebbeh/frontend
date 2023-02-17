import { Card, CardActionArea, CardActions, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const QuantityCard = ({ header, quantityText,linkTo }) => {
    return (
        <Card sx={{
            p: 1, width: { xl: '230px', lg: '220px', md: '200px', sm: '100px' },
            color: 'black'
        }}>
            <Typography
                sx={{  fontSize: {xl:'1.3rem',md:'1rem', lg:'1.3rem', sm:'.8rem'}, py: 1 }}>
                {header}
            </Typography>
            <Typography
                sx={{
                    fontSize: {
                        xl: '1.3rem', md: '1rem',
                        lg: '1.3rem', sm: '.8rem'
                    }, py: 1, fontWeight: 'semibold'
                }}>
                {quantityText + ` products`}
            </Typography>
            <Link className='float-right text-blue-400' to={linkTo}>
                More
            </Link>
        </Card>
    );
}

export default QuantityCard;
