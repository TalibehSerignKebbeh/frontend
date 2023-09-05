import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { definedRoles } from "../config/allowedRoles";
import useAuth from "../hooks/useAuth";


const ProtectedRoutes = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles, token } = useAuth()
    const rootRoute = roles?.includes(definedRoles.admin)? '/dashboard' : '/sales'
    if (!token)
        return <Navigate to={'/'} state={{ from: location }} replace />
    if (roles?.some(role => allowedRoles?.includes(role)))
        return <Outlet />
    return <Navigate to={rootRoute} state={{ from: location }} replace />

}
export default ProtectedRoutes;
