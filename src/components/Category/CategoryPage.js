import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import './index.css'
import Header from '../other/Header';
import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from '../../api/index'
import   Store  from '@mui/icons-material/Store';
import  Collapse  from '@mui/material/Collapse';
// import  Button from '@mui/material/Button';
import AddStock from './AddStock';
import CategoryDataGrid from './CategoryDataGrid';
import { GetError } from '../other/OtherFuctions';
import ErrorMessage from '../StatusMessages/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import Button from '../Buttons/Button';

const CategoryPage = ({ socket, setactiveNavLink }) => {
    
    const {token} = useAuth()
    const formRef = useRef()
    const [errorMessage, seterrorMessage] = useState('');
    const [pageSize, setpageSize] = useState(10);
    const [page, setpage] = useState(0);
    const [openEdit, setopenEdit] = useState(false);
     const [stock, setstock] = useState({
       _id:'', name: '', description: ''
    });

    const { isLoading, isError, error, failureReason, data,
} = useQuery({
        queryKey: ['categories', page, pageSize],
        queryFn: () => fetchStocks({ token,page, pageSize  }),
        refetchInterval: 15000,
        keepPreviousData:true,
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
        // console.log(data);
        if (error) {
           seterrorMessage(GetError(error))
        }
         if (failureReason) {
           seterrorMessage(GetError(failureReason))
        }
    },[data, error, failureReason, isError])
    

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
            <Header title={"Manage Categories"}
                icon={<Store className='text-black dark:text-white' sx={{ scale: 2 }} />} />

            <Button 
                clickEvent={handleOpenCloseCollapse}
                text={openEdit ? "Close Add" : "Open Add"} 
                classNa={`bg-white text-slate-700 dark:bg-slate-700
                dark:text-white shadow-md rounded-sm p-2 px-5
                text-lg mb-4 rounded-md `}
            />
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



export default CategoryPage;
