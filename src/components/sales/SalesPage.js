import { CloseOutlined } from '@mui/icons-material';
import { IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { queryInstance } from '../../api';
import SalesTablePage from './SalesTablePage';
// import {useInfiniteQuery, useQuery} from '@tanstack/react-query'
// import { format } from 'date-fns';
const SalesPage = () => {
    const [rowCount, setrowCount] = useState(0);
    const [loading, setloading] = useState(false);
    const [sales, setsales] = useState([]);
    const [errorMessage, seterrorMessage] = useState('');

    const [selectedDate, setselectedDate] = useState('');
    const [pageSize, setpageSize] = useState(20);
    const [page, setpage] = useState(0);

    // const {isLoading, isSuccess, data, } = useQuery({
    //     queryFn: () => queryInstance.get(`/sales?page=${page}&pageSize=${pageSize}&saleDate=${selectedDate}`).then(res =>res?.data),
    //     queryKey: ['sales', page, pageSize],
    //     keepPreviousData: false, 
    //     notifyOnChangeProps: (props) => [...props, selectedDate],
    // })
    //  if (isSuccess) {
    //     console.log(data);
    //  }
    useEffect(() => {
        const fetchSales = async () => {
            setloading(true)
            seterrorMessage('')
            await queryInstance.get(`/sales?page=${page}&&pageSize=${pageSize}&&saleDate=${selectedDate}`)
                .then(res => {
                    console.log(res);
                    setrowCount(res?.data?.totalSales)
                    setsales(res?.data?.sales)
                    // settotalPages(res?.data?.totalPages)
                }).catch(err => {
                    console.log(err);
                }).finally(() => { setloading(false) })
        }
        fetchSales()
        return () => {

        };
    }, [selectedDate, page, pageSize]);
    useEffect(() => {
        setrowCount(prevValue => loading ? rowCount : prevValue)
    }, [rowCount, loading]);
    
    const handleDateChange = (e) => {
        setselectedDate(e.target.value)
        setpage(0)

    }
    return (
        <>
            <Box sx={{
                width: '200px', inset: 0, position: 'relative',
                my: 2, mb:'40px', mr: 0, ml: { xl: '30%', lg: '35%', md: '20%', sm: 1, xs: 1 }
            }} >
                <Typography sx={{
                    fontSize: '1.1rem', d: 'block',
                    mr: 'auto', ml: 0, float: 'left'
                }}
                >Select date</Typography>
                <TextField type={'date'} sx={{ width: '100%' }}
                    value={selectedDate} onChange={handleDateChange}
                />
                {selectedDate?.length ? <IconButton onClick={() => setselectedDate('')}
                    sx={{
                        float: 'right', position: 'absolute',
                        marginBottom: 0, mt: 'auto'
                    }}><CloseOutlined /> </IconButton> : null}
            </Box>
            {

                <SalesTablePage sales={sales}
                    rowCount={rowCount}
                    page={page} setpage={setpage}
                    pageSize={pageSize} setpageSize={setpageSize}
                    loading={loading}
                />
            }


        </>
    );
}

export default SalesPage;
