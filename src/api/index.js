import axios from 'axios'
// import useAuth from '../hooks/useAuth'
import { yourToken } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
    // store?.getState?.auth?.token
// console.log(token);


export const serverUrl = `http://localhost:4500`

export const queryInstance = axios.create({baseURL: serverUrl})

queryInstance.interceptors.request.use(
    function (req) {
        // const {token} = useAuth()
        
        req.headers['authorization'] = `Bearer ${yourToken}`
        return req;
    },
    function (err) {
        return Promise.reject(err)
    }
)
queryInstance.interceptors.response.use(
    function (req) {
        return req;
    },
    function (err) {
        if (err?.response?.status === (401 || 403)) {
            console.log(err?.response?.status);
            <Navigate to={'/login'} replace />
            return err;
        }
        return err;
    }
)



export const LoginFunc = (user) => {
    return queryInstance.post('/auth', {...user})
}
export const fetchProducts = () => {
    return queryInstance.get(`/products`).then(res=>res?.data)
}
export const fetchSales = ({page, pageSize,selectedDate}) => {
    return queryInstance.get(`/sales?page=${page}&&pageSize=${pageSize}&&saleDate=${selectedDate}`, { params: { page: page, pageSize: pageSize, saleDate: selectedDate } }).then(res => {
        const hasNext = page * 2 <= res?.data?.totalSales
        return {
            nextPage: hasNext ? page + 1 : undefined,
            previousPage: page > 1 ? page - 1 : undefined,
            sales: res?.data?.sales,
        }
    })
}
export const fetchSalesStats = () => {
    return queryInstance.get(`/sales/stats`).then(res=>res?.data)
}
export const fetchProductsStats = () => {
    return queryInstance.get(`/products/stats`).then(res=>res?.data)
}
export const fetchSalesToday = () => {
    return queryInstance.get(`/sales?saleDate=${new Date().toUTCString()}`).then(res => {
        console.log(res);
        return res?.data
    })
}

export const fetchStocks = () => {
    return queryInstance.get(`/stocks`).then(res=>res?.data)
}
export const fetchUsers = () => {
    return queryInstance.get(`/users`).then(res=>res?.data)
}
export const UpdateUser = (user) => {
    let id = user?._id;
    return queryInstance.put(`/users/${id}`).then(res => {
        console.log(res);
        return res?.data
    })
}
