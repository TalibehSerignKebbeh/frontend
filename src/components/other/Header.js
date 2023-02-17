import { Box, Typography, } from '@mui/material'
import React from 'react'
const Header = ({ title, icon }) => {
  return (
      <Box
              sx={{
              width: {
            xs: "90%",
            lg: "300px",
            xl: "300px",
            md: "300px",
            sm: "240px",
              },
              mx: {
                  xs: 1,
            lg: 3,
            xl: 3,
            md: 3,
            sm: 1,
              }, py:3,my:2,textAlign:'center',
              bgcolor: "white",
              color: "black",
              boxShadow:
                "2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)",
              borderRadius:'4px'
              }}>
            { icon}
        <Typography sx={{color:'black',
          ml: 2, fontSize: '1.2rem'
        }}>
          {title}
        </Typography>
        </Box>
  )
}

export default Header
