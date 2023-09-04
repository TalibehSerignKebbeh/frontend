import { Box, Typography, } from '@mui/material'
import React from 'react'
const Header = ({ title, icon }) => {
  return (
    <Box className={`bg-white dark:bg-slate-700
      shadow shadow-white dark:shadow-slate-800`}
              sx={{
              width: {
            lg: "300px",
            xl: "300px",
            md: "280px",
                  sm: "300px",
            xs: "90vw",

              },
        py: 3, my: 2, textAlign: 'center',
              // bgcolor: "white",
              // color: "black",
              // boxShadow:
              //   "2px 1px 13px 0px rgba(0,0,0,0.09), 0px 1px 13px 2px rgba(0,0,0,0.09)",
              borderRadius:'4px'
              }}>
            { icon}
      <Typography
        className='text-black dark:text-white'
         sx={{ml: 2, fontSize: '1.2rem'}}>
          {title}
        </Typography>
        </Box>
  )
}

export default Header
