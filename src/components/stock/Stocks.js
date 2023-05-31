import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import './index.css'
import Header from '../other/Header';
import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from '../../api/index'
import   Store  from '@mui/icons-material/Store';
import  Collapse  from '@mui/material/Collapse';
import  Button from '@mui/material/Button';
import AddStock from './AddStock';
import CategoryDataGrid from './CategoryDataGrid';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import useAuth from '../../hooks/useAuth';

const StocksPage = () => {
    const {token} = useAuth()
    const formRef = useRef()
    const [errorMessage, seterrorMessage] = useState('');
    const [pageSize, setpageSize] = useState(5);
    const [page, setpage] = useState(1);
    const [openEdit, setopenEdit] = useState(false);
     const [stock, setstock] = useState({
       _id:'', name: '', description: ''
    });

    const {isLoading,isError,isSuccess, error, data} = useQuery({
        queryKey: ['stocks'],
        queryFn:()=>fetchStocks({token})
    })
    const handleOpenCloseCollapse = () => {
        if (openEdit) {
            setstock({ _id: '', name: '', description: '' })
            window.scrollTo({
                top: formRef?.current?.offsetTop,
                behavior: 'smooth'
            })
        }
        setopenEdit(prev=>!prev)
    }

    useEffect(() => {
        if (isError) {
           seterrorMessage(GetError(error))
        }
    },[error, isError])
    

    return (
        <Box sx={{
           mb: 10,ml:1,px:1, display: 'flex',
            flexDirection: 'column', alignItems: 'baseline',
            justifyContent: 'flex-start', width: {xl:'50%', lg:'70%', md:'85%', sm:'95%', xs:'100%'},
            '& .':{}, minHeight:'900px',height:'auto', alignSelf:'baseline', textAlign:'start'
        }}
            className={``}
        >
            {errorMessage?.length ?
                <ErrorMessage error={errorMessage} 
                    handleReset={()=>seterrorMessage('')}
            />: null}
            <Header title={"Manage Stocks"}
                icon={<Store className='text-black dark:text-white' sx={{ scale: 2 }} />} />

            <Button 
                className='bg-white dark:bg-slate-700
                hover:bg-slate-50 dark:hover:bg-slate-500
                text-slate-800 dark:text-white
                shadow shadow-slate-100 dark:shadow-slate-500'
            sx={{
                mb: openEdit ? 0 : 2,
                 px: 3, py: '6px',
            }} 
                onClick={handleOpenCloseCollapse}>
               {openEdit? "Close":"Open"} Add
            </Button>
            <Collapse sx={{mb:2}} ref={formRef} in={openEdit} unmountOnExit timeout={'auto'} >
                <AddStock stock={stock} setstock={setstock} />
            </Collapse>
            <CategoryDataGrid data={data} setopenEdit={setopenEdit}
                setstock={setstock} page={page} setpage={setpage}
                pageSize={pageSize} setpageSize={setpageSize}
                isLoading={isLoading}
             />
        </Box>
    );
}



export default StocksPage;
