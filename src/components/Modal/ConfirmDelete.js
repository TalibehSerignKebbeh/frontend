import  Button  from '@mui/material/Button';
import  Dialog  from '@mui/material/Dialog';
import  DialogActions  from '@mui/material/DialogActions';
import  DialogContent  from '@mui/material/DialogContent';
import  Slide  from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  // console.log(props);
  return <Slide direction="up" ref={ref} {...props} />;
});
const ConfirmDelete = ({ open, setopen, resetFunc, deleteFunction,
  deleteLoading, message, succcessMsg, errorMessage }) => {
    const handleClose = () => {
        setopen(false)
        resetFunc()
    }
    return (
        <div>
          <Dialog
          open={open} onClose={handleClose}
          keepMounted={deleteLoading}
          fullWidth={true}
          fullScreen={false}
          TransitionComponent={Transition}
          sx={{
            p: 1, width: "auto", height: "auto", 
          }}
          //  className='bg-slate-50 dark:bg-slate-800'
            >
          <h2 className='bg-white dark:bg-slate-600
             text-dark dark:text-white'
            style={{
              padding: "14px",
              fontWeight: "bold",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.6)",
            }}
           
          >
            Are you sure to delete{" "}
            <span className="text-red-600">
              {" " + message}
            </span>
          </h2>
          
               {/* {(succcessMsg?.length || errorMessage?.length)? ( */}
          <DialogContent className='bg-white dark:bg-slate-600 
          text-start' >
            {/* <Box
                my={1}
                sx={{float:'left',ml:'-10px',height:'auto',
                  boxShadow: "0px 0px 2px 0px rgba(20,0,0,0.4)",
              textAlign:'start'  }}
              >  */}
                {/* <p className='text-green-600'>paragraph</p> */}
                {succcessMsg?.length ? (
              <Typography className="text-green-600 dark:text-green-200
                  text-lg bg-slate-400  -mt-7
                  rounded-3xl px-2 -ml-4  ">
                    {succcessMsg}
                  </Typography>
                ) : null}
                {errorMessage?.length ? (
              <Typography className="text-red-500 dark:text-red-200 
               text-lg bg-slate-400  -mt-7
                  rounded-3xl px-2 -ml-4 ">
                  {errorMessage}
                </Typography>
              ) : null}
            {/* </Box> */}
          </DialogContent>
          {/* ) : null} */}
                <DialogActions className='bg-white dark:bg-slate-600' >
                     <Stack direction={"row"} spacing={3}>
              <Button
                size="medium"
                variant="outlined"
                color={`info`}
                className='bg-white dark:bg-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-400'
                disabled={deleteLoading}
                sx={{ mr: 2, fontSize: { md: "11px", sm: "7px", xs: "7px" } }}
                onClick={handleClose}
              >
                Close
              </Button>
             
              <Button
                size="medium"
                variant="contained"
                color={`error`}
                disabled={deleteLoading}
                sx={{ mr: 1, fontSize: { md: "11px", sm: "7px", xs: "7px" } }}
                onClick={deleteFunction}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </Stack>
          </DialogActions>      
        </Dialog>   
        </div>
    );
}

export default ConfirmDelete;
