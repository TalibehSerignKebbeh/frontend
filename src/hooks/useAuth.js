import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

let yourToken;
const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    yourToken = token;
    let isManager = false
    let isAdmin = false
    let isSeller = false
    let status = "seller"

    if (token) {
        const decoded = jwtDecode(token)
        const { user, roles } = decoded.UserData

        isManager = roles?.includes('manager')
        isAdmin = roles?.includes('admin')
        isSeller = roles?.includes('seller')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { token,username: user, roles, status, isManager, isAdmin, isSeller }
    }

    return { token,username: '', roles: [],status, isManager, isAdmin,isSeller }
}
export {yourToken};
export default useAuth