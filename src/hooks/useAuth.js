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
        const { user, roles, id } = decoded.UserData

        isManager = roles?.includes('manager')
        isAdmin = roles?.includes('admin')
        isSeller = roles?.includes('seller')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { token,id,username: user, roles, status, isManager, isAdmin, isSeller }
    }

    return { token,id:'',username: '', roles: [], isManager, isAdmin,isSeller, status }
}
export {yourToken};
export default useAuth