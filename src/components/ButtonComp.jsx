import { Button } from '@mui/material';
import React from 'react';


const ButtonComp = ({ outline, text }) => {
    return (
        <Button sx={{ px: { lg: 2, md: 1, sm: 1 }, py: { md: 1, sm: 1 } }}
        >{text}
        </Button>
    );
}

export default ButtonComp;
