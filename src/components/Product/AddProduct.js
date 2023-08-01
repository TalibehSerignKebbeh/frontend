import React, { useState } from 'react';
import  Button  from '@mui/material/Button';
import  TextField  from '@mui/material/TextField';
import  useMediaQuery  from '@mui/material/useMediaQuery';
import  Box  from '@mui/material/Box';
import  CircularProgress  from '@mui/material/CircularProgress';
import  Dialog  from '@mui/material/Dialog';
import  DialogActions  from '@mui/material/DialogActions';
import  DialogContent  from '@mui/material/DialogContent';
import  DialogTitle  from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import axios from 'axios';
// import { serverUrl } from '../../api';
// import ButtonComp from '../ButtonComp';


const AddProduct = ({ openAddModal, setopenAddModal, socket }) => {
    const initialState = {
        name: '', price: 0, category: '', quantity: 0,
        dimensions: '', description: '', picture: '', produced_date: '',
        expiry_date: '',
    }
    const [product, setproduct] = useState(initialState);
    const [uploading, setuploading] = useState(false);
    const [isError, setisError] = useState(false);
    const [successMessage, setsuccessMessage] = useState('');

    const theme = useTheme()
    const controller = new AbortController()
    const fullwidth = useMediaQuery(theme.breakpoints.down('lg'))
    const handleClose = () => {
        setopenAddModal(false)
        setproduct(initialState)
        controller.abort()
    }
    const handleSubmit = (e) => {
        setisError(false)
        setuploading(true)
        // console.log([...Array(5).fill(product)]);
        setsuccessMessage('')
        axios.post(process.env.custom_url + `/product`, product)
            .then(res => {
                console.log(res);
                setsuccessMessage(res?.data?.message)
            }).catch(err => {
                console.log(err);
                setisError(true)
            }).finally(() => setuploading(false))

    }
    return (
        <Dialog

            fullWidth={fullwidth}
            open={openAddModal}
            onClose={handleClose}
            maxWidth="sm"

        >
            <DialogTitle>
                <Typography> Add Product</Typography>
                {successMessage ? <span
                    className='text-green-400 md:text-lg text-sm font-semibold'>
                    {successMessage}
                </span> :null
                }
            </DialogTitle>
            <DialogContent sx={{ w: '100%', h: '100%', bgcolor: 'lightblue', overflowX: 'hidden' }}>

                <form className='w-full my-3 mt-5 mx-1 flex flex-row flex-wrap gap-x-6 gap-y-4'>
                    <Box maxWidth={'250px'} sx={{ h: { lg: '40px', md: "30px", sm: '27px' } }}>
                        <TextField type={'text'} placeholder="" label="name"
                            onChange={(e) => setproduct({ ...product, name: e.target.value })}
                            className="p-1" value={product?.name}
                        />
                    </Box>

                    <Box maxWidth={'250px'} sx={{ h: { lg: '40px', md: "30px", sm: '27px' } }}>
                        <TextField type={'text'} placeholder="" label="category"
                            onChange={(e) => setproduct({ ...product, category: e.target.value })}
                            className="p-1" value={product?.category}
                        />

                    </Box>
                    <Box maxWidth={'250px'} sx={{ h: { lg: '40px', md: "30px", sm: '27px' } }}>
                        <TextField type={'text'} placeholder="" label="quantity"
                            onChange={(e) => setproduct({ ...product, quantity: Number(e.target.value) })}
                            className="p-1" value={product?.quantity || ''}
                        />
                    </Box>
                    <Box maxWidth={'250px'} sx={{ h: { lg: '40px', md: "30px", sm: '27px' } }}>
                        <TextField type={'text'} placeholder="" label="price"
                            onChange={(e) => setproduct({ ...product, price: Number(e.target.value) })}
                            className="p-1" value={product?.price || ''}
                        />
                    </Box>
                    <Box maxWidth={'250px'} sx={{ h: { lg: '40px', md: "30px", sm: '27px' } }}>
                        <TextField type={'text'} placeholder="" label="description"
                            onChange={(e) => setproduct({ ...product, description: e.target.value })}
                            className="p-1" value={product?.description}
                        />
                    </Box>

                    <Box maxWidth={'250px'} sx={{ h: { lg: '40px', md: "30px", sm: '27px' } }}>
                        <label htmlFor="Produced-date">Produced date</label>
                        <TextField type={'date'} id="Produced-date"
                            onChange={(e) => setproduct({ ...product, produced_date: e.target.value })}
                            className="p-1" value={product?.produced_date}
                        />
                    </Box>
                    <Box maxWidth={'250px'} sx={{ h: { lg: '40px', md: "30px", sm: '27px' } }}>
                        <label htmlFor="Produced-date">Expired date</label>
                        <TextField type={'date'}
                            // label="Expired date" hiddenLabel={true}  
                            onChange={(e) => setproduct({ ...product, expiry_date: e.target.value })}
                            className="p-1" value={product?.expiry_date}
                        />

                    </Box>

                </form>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Stack direction={'row'} spacing={1}>
                    <Button sx={{ px: { lg: 2, md: 1, sm: 1 }, py: { md: 1, sm: 1 } }}
                        onClick={handleSubmit} disabled={uploading}
                        variant="contained">{uploading ? <CircularProgress sx={{ w: '13px', h: "13px" }} /> : 'Add'}</Button>
                    {!uploading ? <Button sx={{ px: { lg: 2, md: 1, sm: 1 }, py: { md: 1, sm: 1 } }}
                        variant="outlined" onClick={() => setproduct(initialState)}
                    >Reset
                    </Button> : null}
                    <Button sx={{ px: { lg: 2, md: 1, sm: 1 }, py: { md: 1, sm: 1 } }}
                        variant="outlined" color='warning'
                        onClick={handleClose}
                    >{uploading ? "Cancell" : 'Close'}
                    </Button>

                </Stack>
            </DialogActions>

        </Dialog>
    );
}

export default AddProduct;
