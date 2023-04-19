import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import './index.css'
import Header from '../other/Header';
import { useQuery } from '@tanstack/react-query';
import { fetchStocks } from '../../api/index'
import   Store  from '@mui/icons-material/Store';
import { Button, Collapse } from '@mui/material';
import AddStock from './AddStock';
import CategoryDataGrid from './CategoryDataGrid';

const StocksPage = () => {
    const formRef = useRef()
    const [pageSize, setpageSize] = useState(5);
    const [page, setpage] = useState(1);
    const [openEdit, setopenEdit] = useState(false);
     const [stock, setstock] = useState({
       _id:'', name: '', description: ''
    });

    const {isLoading,isError, error, data} = useQuery({
        queryKey: ['stocks'],
        queryFn:()=>fetchStocks()
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
        console.log(data);
         if (data?.response?.status===403) {
          
     }
    },[data, data?.response?.status])
    

    return (
        <Box sx={{
           mb: 10,ml:1,px:1, display: 'flex',
            flexDirection: 'column', alignItems: 'baseline',
            justifyContent: 'flex-start', width: {xl:'50%', lg:'70%', md:'85%', sm:'95%', xs:'100%'},
            '& .':{}, minHeight:'900px',height:'auto', alignSelf:'baseline', textAlign:'start'
        }}
        >
            <Header title={"Manage Stocks"} icon={<Store sx={{ scale: 2 }} />} />

            <Button 
            sx={{
                mb: openEdit ? 0 : 2,
                boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.07),0px 3px 6px 2px rgba(0,0,0,0.07)',
                 color: 'black', bgcolor: '#fff',opacity:.8,px:3,py:'6px',
                ':hover': { bgcolor: '#fff', opacity: 1, } 
            }} color='success'
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
