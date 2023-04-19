import jwtDecode from 'jwt-decode'
import { useContextHook } from '../context/AuthContext';

let yourToken;
const useAuth = () => {
    const {authToken} = useContextHook()
    yourToken = authToken;
    let isManager = false
    let isAdmin = false
    let isSeller = false
    let status = "seller"

    if (authToken) {
        const decoded = jwtDecode(authToken)
        const { user, roles } = decoded.UserData

        isManager = roles?.includes('manager')
        isAdmin = roles?.includes('admin')
        isSeller = roles?.includes('seller')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { token:authToken,username: user, roles, status, isManager, isAdmin, isSeller }
    }

    return { token:authToken,username: '', roles: [],status, isManager, isAdmin,isSeller }
}
export {yourToken};
export default useAuth