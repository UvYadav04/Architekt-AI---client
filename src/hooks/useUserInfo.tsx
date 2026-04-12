import { useGetUserInfoQuery } from '../redux/services/userApiSlice'

function useUserInfo() {
    const { data, isLoading } = useGetUserInfoQuery()
    const { userInfo } = data || {}
    return {userInfo,isLoading}
}

export default useUserInfo
