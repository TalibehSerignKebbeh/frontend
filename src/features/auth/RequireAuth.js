import { useLocation, Navigate, Outlet, useState } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { queryInstance } from "../../api";
import ExpiredComponent from "../../components/Auth/ExpiredComponent";

const RequireAuth = ({ alloweRoles }) => {
    console.log("require auth");
    const location = useLocation()
    const { roles } = useAuth()
    const [expiredToken, setexpiredToken] = useState(false);
    queryInstance.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err?.response?.status === 403) {
                    console.log(err?.response?.status);
                    setexpiredToken(true)
                }
            }
        )
    const  content = (
        expiredToken? <ExpiredComponent /> :
        roles.some(role => alloweRoles.includes(role))
            ? <Outlet />
            : <Navigate to={'/'} state={{from: location}} replace />
    )

    return content
}

export default RequireAuth