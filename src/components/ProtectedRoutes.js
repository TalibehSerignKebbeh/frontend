import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { allowedRoles } from "../config/allowedRoles";
import useAuth from "../hooks/useAuth";


const ProtectedRoutes = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles, token } = useAuth()
    if (!token)
        return <Navigate to={'/'} state={{ from: location }} replace />
    if (roles?.some(role => allowedRoles?.includes(role)))
        return <Outlet />
    return <Navigate to={'/unauthorized'} state={{ from: location }} replace />

}
export default ProtectedRoutes;
