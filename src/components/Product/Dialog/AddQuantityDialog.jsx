import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { queryInstance } from '../../../api';
import useAuth from '../../../hooks/useAuth';
import { GetError } from '../../other/OtherFuctions';
import successIcon from '../../../assets/images/success_icon2.png'
import ErrorMessage from '../../StatusMessages/ErrorMessage';
import {  QueryClient } from '@tanstack/react-query';

const Transition = React.forwardRef(function Transition(props, ref) {

    return <Slide direction="up" ref={ref} {...props} />;
});
const AddQuantityDialog = ({ open, handleClose,
    loading, productId,
    message, socket
}) => {
    const { token } = useAuth()
    const [quantity, setQuantity] = useState(0);
    const [successMessage, setsuccessMessage] = useState('');
    const [errorMessage, seterrorMessage] = useState('');
    const [updating, setupdating] = useState(false);

    const queryClient = new QueryClient()

    useEffect(() => {
        setsuccessMessage('')
        seterrorMessage('')
   },[])
    const handleSubmitAddStock = async () => {

        console.log(!quantity || isNaN(quantity));

        if (!quantity || isNaN(quantity)) {
            return
        }
        console.log('after checking');
        console.log(!quantity || isNaN(quantity));

        setsuccessMessage('')
        seterrorMessage('')
        setupdating(true)
        await queryInstance.patch(`/products/${productId}`,
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                queryClient.invalidateQueries({exact:false, queryKey: ['products']})
                socket?.emit(`notify_update_product`)
                console.log(res);
                setsuccessMessage(res?.data?.message)
            }).catch((err) => {
                seterrorMessage(GetError(err))
                console.log(err);
            }).finally(() => {
                setupdating(false)
            })

    }

    const CloseModal = () => {
        setsuccessMessage('')
        seterrorMessage('')
        handleClose()
    }
    return (
        <Dialog
            open={open} onClose={CloseModal}
            keepMounted={true}

            fullWidth={true}
            fullScreen={false}
            TransitionComponent={Transition}
            sx={{
                p: 1, width: "auto", height: "auto",
            }}
        //  className='bg-slate-50 dark:bg-slate-800'
        >
            <div className='w-full h-full bg-slate-400 
            flex flex-col gap-0 py-6 md:px-10 sm:px-4 px-[4px]'>
                {successMessage?.length ?
                    <div className='text-center mx-auto w-fit flex flex-col justify-center
                    bg-slate-100 p-2 rounded'>
                        <img src={successIcon}
                            alt='icon' width={90} height={90}
                            className='mx-auto rounded-[5px]'
                        />
                        <p className='text-2xl text-green-400 mt-2 mx-auto'>{successMessage}</p>

                    </div>
                    :
                    <>
                        <h1 className='text-white text-lg'>Add Stock Dialog</h1>
                        {errorMessage?.length ?
                            <ErrorMessage error={errorMessage}
                                handleReset={() => seterrorMessage('')} /> : null}
                        {message}
                        <input type='number' inputMode='numeric'
                            className='p-2 px-[3px] min-w-[130px] max-w-[320px]'
                            step={0.1}
                            value={quantity}
                            onChange={e => {
                                setQuantity(e.target.value)
                            }}
                        />
                        <button
                            onClick={handleSubmitAddStock}
                            className='bg-green-700 text-white
                px-10 py-2 rounded-md
                w-fit mt-5 self-end'>{updating ? 'updating ...' : 'Submit'}</button>
                    </>}
            </div>

        </Dialog>

    );
}

export default AddQuantityDialog;
